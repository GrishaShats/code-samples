import { TestBed } from '@angular/core/testing';
import { InformationPopupService } from '@core/services/information-popup.service';
import { defaultConfirmationPopupData } from '@shared/constants';
import { PopupAnswer } from '@shared/enum';
import { Observable, of } from 'rxjs';
import { IComponentCanDeactivate } from './can-leave.guard';

describe('CanLeaveGuard', () => {
  let guard: CanLeaveGuard;
  const fakeInformationPopupService = jasmine.createSpyObj('fakeInformationPopupService', {
    openConfirmationPopup: { afterClosed: () => of({ answer: PopupAnswer.yes }) },
  });
  const fakeComponent: IComponentCanDeactivate = {
    canDeactivate: () => true,
    popupData: undefined,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: InformationPopupService,
          useValue: fakeInformationPopupService,
        },
      ],
    });
    guard = TestBed.inject(CanLeaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should route if property canDeactivate of component is true', () => {
    fakeComponent.canDeactivate = () => true;
    expect(guard.canDeactivate(fakeComponent)).toBe(true);
  });

  describe('confirm method return', () => {
    beforeEach(() => {
      fakeComponent.canDeactivate = () => false;
    });
    it('true and guard should route', (done) => {
      spyOn<any>(guard, 'confirm').and.returnValue(of(true));
      (guard.canDeactivate(fakeComponent) as Observable<boolean>).subscribe((result) => {
        expect(result).toEqual(true);
        done();
      });
    });
    it('false and guard should NOT route', (done) => {
      spyOn<any>(guard, 'confirm').and.returnValue(of(false));
      fakeComponent.canDeactivate = () => false;
      (guard.canDeactivate(fakeComponent) as Observable<boolean>).subscribe((result) => {
        expect(result).toEqual(false);
        done();
      });
    });
  });

  it('confirm should call openConfirmationPopup with defaultPopupData param', () => {
    guard['confirm']();
    expect(fakeInformationPopupService.openConfirmationPopup).toHaveBeenCalledWith(defaultConfirmationPopupData);
  });

  it('confirm return observable with true value if answer is yes', (done) => {
    fakeInformationPopupService.openConfirmationPopup = jasmine
      .createSpy()
      .and.returnValue({ afterClosed: () => of({ answer: PopupAnswer.yes }) });
    (guard['confirm']() as Observable<boolean>).subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('confirm return observable with false value if answer is no', (done) => {
    fakeInformationPopupService.openConfirmationPopup = jasmine
      .createSpy()
      .and.returnValue({ afterClosed: () => of({ answer: PopupAnswer.no }) });
    (guard['confirm']() as Observable<boolean>).subscribe((result) => {
      expect(result).toEqual(false);
      done();
    });
  });
});
