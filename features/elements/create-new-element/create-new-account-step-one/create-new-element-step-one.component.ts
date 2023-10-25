import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { LOADING } from '@core/providers';
import { IAppState, IDescription } from '@shared/interfaces';
import { AutoUnsubscribe } from '@shared/abstracts';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICreateElementForm } from 'src/app/shared/interfaces/element.interface';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectElementProduct } from '@core/state/selectors/element-product/element-product.selectors';
import { filterNilWithCallback } from '@shared/utils';
import { elementProductActions } from '@core/state/actions/element-product.actions';

@Component({
  selector: 'app-create-new-element-step-one',
  templateUrl: './create-new-element-step-one.component.html',
  styleUrls: ['./create-new-element-step-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewElementStepOneComponent extends AutoUnsubscribe implements OnInit {
  @Input() createNewElementForm!: FormGroup;
  @Output() saveElement = new EventEmitter<ICreateElementForm>();

  descriptions!: IDescription[];
  mostUse!: IDescription[];
  termAndConditionsUrl: string | undefined;
  termAndConditionsName: string | undefined;

  constructor(
    @Inject(LOADING) public loading$: Observable<boolean>,
    private store: Store<IAppState>,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  get name(): AbstractControl<string> {
    return this.createNewElementForm?.get('elementName') as AbstractControl<string>;
  }

  get description(): AbstractControl<string> {
    return this.createNewElementForm?.get('description') as AbstractControl<string>;
  }

  ngOnInit(): void {
    this.getElementProductData();
    this.descriptionValueChanges();
  }

  next(): void {
    this.saveElement.emit(this.createNewElementForm.value);
  }

  private descriptionValueChanges(): void {
    this.createNewElementForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.cdr.detectChanges());
  }

  private getElementProductData(): void {
    this.store
      .select(selectElementProduct)
      .pipe(filterNilWithCallback(() => this.store.dispatch(elementProductActions.load())))
      .subscribe(({ allowed_descriptions, document }) => {
        this.descriptions = allowed_descriptions;
        this.removeDuplicates(this.descriptions);
        this.termAndConditionsUrl = document.document_html.url;
        this.termAndConditionsName = document.displayed_name;
        this.cdr.detectChanges();
      });
  }

  private removeDuplicates(descriptions: IDescription[] = []): void {
    this.descriptions = descriptions.filter(
      (itemFilter: IDescription) => !this.mostUse.find((itemFind) => itemFind.code === itemFilter.code)
    );
  }
}
