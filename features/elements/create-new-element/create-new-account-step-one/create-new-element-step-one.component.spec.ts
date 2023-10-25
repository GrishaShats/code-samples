import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectDescriptionComponent } from '@shared/components/select-description/select-description/select-description.component';
import { CreateNewElementStepOneComponent } from './create-new-element-step-one.component';
import { mockElementProduct } from '@shared/constants';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@shared/interfaces';

describe('CreateNewElementStepOneComponent', () => {
  let component: CreateNewElementStepOneComponent;
  let fixture: ComponentFixture<CreateNewElementStepOneComponent>;
  const initialState: Partial<IAppState> = {
    elementProduct: {
      elementProduct: mockElementProduct,
      errorMessage: '',
    },
  };
  const formBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewElementStepOneComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: FormBuilder, useValue: formBuilder },
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => SelectDescriptionComponent),
        },
      ],
      imports: [
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewElementStepOneComponent);
    component = fixture.componentInstance;

    component.createNewElementForm = formBuilder.group({
      elementName: [null, [Validators.required]],
      description: [null, Validators.required],
      termsAndConditions: [null, Validators.requiredTrue],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
