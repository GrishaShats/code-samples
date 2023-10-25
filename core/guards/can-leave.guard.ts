import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { InformationPopupService } from '@core/services/information-popup.service';
import { defaultConfirmationPopupData } from '@shared/constants';
import { PopupAnswer } from '@shared/enum';
import { IConfirmationPopup } from '@shared/interfaces';
import { map } from 'rxjs/operators';

export interface IComponentCanDeactivate {
  canDeactivate: () => boolean;
  popupData: IConfirmationPopup | undefined;
}

export const canLeaveGuard: CanDeactivateFn<IComponentCanDeactivate> = (component: IComponentCanDeactivate) => {
  const popupService = inject(InformationPopupService);

  const confirm = (data: IConfirmationPopup = defaultConfirmationPopupData) =>
    popupService
      .openConfirmationPopup(data)
      .afterClosed()
      .pipe(map((v) => v?.answer === PopupAnswer.yes));

  return component.canDeactivate() ? true : confirm(component.popupData);
};
