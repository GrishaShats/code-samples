import { Directive } from '@angular/core';
import { IApprovalResult, IConfirmationPopup } from '@shared/interfaces';
import { ConfirmationResult } from '@shared/enum';
import { cancelApprovalConfirmPopupData, defaultConfirmationPopupData } from '@shared/constants';
import { IComponentCanDeactivate } from '@core/guards';
import { AutoUnsubscribe } from './auto-unsubscribe';

@Directive()
/* eslint-disable  @angular-eslint/directive-class-suffix */
export abstract class ComponentCanDeactivate extends AutoUnsubscribe implements IComponentCanDeactivate {
  popupData: IConfirmationPopup = defaultConfirmationPopupData;

  protected canLeavePage = false;

  protected constructor() {
    super();
  }

  abstract canDeactivate(): boolean;

  handleResult({ result }: IApprovalResult): void {
    this.canLeavePage = result !== ConfirmationResult.PENDING;

    if (!this.canLeavePage) {
      this.popupData = cancelApprovalConfirmPopupData;
    }
  }
}
