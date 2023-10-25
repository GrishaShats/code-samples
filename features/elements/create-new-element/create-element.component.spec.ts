import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IElement, ICreateElementForm, IAppState } from '@shared/interfaces';
import { CreateElementComponent } from './create-element.component';
import { StepperComponent } from '@shared/components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('CreateElementComponent', () => {
  let component: CreateElementComponent;
  let fixture: ComponentFixture<CreateElementComponent>;
  let store: MockStore<IAppState>;

  const initialState = {};
  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        CdkStepperModule,
      ],
      declarations: [CreateElementComponent, StepperComponent],
      providers: [provideMockStore({ initialState }), { provide: Router, useValue: router }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateElementComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saveElement should dispatch store method', () => {
    const newElement = { elementName: 'Test', description: 'test' } as ICreateElementForm;
    component.newElement = { elementName: 'Test', description: 'test' } as IElement;
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
    component.saveElement(newElement);
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('finishElementOpening should navigate to /elements if popupModule false', () => {
    component.finishElementOpening();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('requestAnotherOne should reset form and move to previous step', () => {
    const spy = spyOn(component.createNewElementForm, 'reset');
    const stepperSpy = spyOn(component.stepper, 'previous');

    component.requestAnotherOne();

    expect(spy).toHaveBeenCalled();
    expect(stepperSpy).toHaveBeenCalled();
  });

  it('canDeactivate should', () => {
    expect(component.canDeactivate()).toEqual(true);
  });
});
