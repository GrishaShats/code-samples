import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { RejectedVerificationAction, SuccessVerificationAction } from '@shared/enum';
import { IElement, IApprovalData, IAppState, ICreateElementForm } from '@shared/interfaces';
import { filter, takeUntil } from 'rxjs/operators';
import { noWhitespaceValidator, specialCharactersValidator } from '@shared/form-validators/custom-validators';
import { StepperComponent } from '@shared/components/stepper/stepper.component';
import { ComponentCanDeactivate } from '@shared/abstracts/component-can-deactivate';
import { elementListActions } from '@core/state/actions';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-element',
  templateUrl: './create-element.component.html',
  styleUrls: ['./create-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateElementComponent extends ComponentCanDeactivate implements OnInit, OnDestroy {
  @Output() actionWithElement = new EventEmitter<SuccessVerificationAction | RejectedVerificationAction>();
  @Output() resizeDialog = new EventEmitter<void>();
  @ViewChild('stepper') stepper!: StepperComponent;

  readonly createNewElementForm = this.fb.group({
    elementName: [
      '',
      [Validators.required, Validators.maxLength(32), noWhitespaceValidator, specialCharactersValidator],
    ],
    description: ['', Validators.required],
  });

  newElement: IElement | ICreateElementForm | undefined;
  approvalData: IApprovalData | undefined;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<IAppState>,
    private router: Router,
    private actionsListener: ActionsSubject,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.actionsListener
      .pipe(
        ofType(elementListActions.createElementSuccess.type),
        filter(({ approvalData }: { approvalData: IApprovalData }) => !!approvalData),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ approvalData }) => {
        this.approvalData = approvalData;
        this.stepper.next();
        this.cdr.detectChanges();
      });
  }

  saveElement(element: ICreateElementForm): void {
    this.newElement = element;
    this.store.dispatch(elementListActions.createElement(element));
    this.cdr.detectChanges();
  }

  finishElementOpening(): void {
    this.router.navigate(['/elements']);
  }

  requestAnotherOne(): void {
    this.createNewElementForm.reset();
    this.approvalData = undefined;
    this.cdr.detectChanges();
    this.stepper.previous();
  }

  canDeactivate(): boolean {
    return this.canLeavePage || this.createNewElementForm.pristine;
  }

  ngOnDestroy(): void {
    this.store.dispatch(elementListActions.createElementSuccess({ approvalData: null }));
  }
}
