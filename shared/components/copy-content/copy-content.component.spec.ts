import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CopyContentComponent } from './copy-content.component';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@shared/interfaces';

describe('CopyContentComponent', () => {
  let component: CopyContentComponent;
  let fixture: ComponentFixture<CopyContentComponent>;
  let store: MockStore<IAppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MatIconModule, CopyContentComponent],
      providers: [provideMockStore({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CopyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy content with success message', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.copyContent();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
