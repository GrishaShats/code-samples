import { NgModule } from '@angular/core';
import { ConfirmationModule } from '@shared/components/confirmation/confirmation.module';
import { NoDataFoundModule } from '@shared/components/no-data-found/no-data-found.module';
import { SelectCurrencyModule } from '@shared/components/select-currency/select-currency.module';
import { TableFilterModule } from '@shared/components/table-filter/table-filter.module';
import { TermsConditionsModule } from '@shared/components/terms-conditions/terms-conditions.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateElementRoutingModule } from './create-element-routing.module';
import { CreateElementComponent } from './create-element.component';
import { CreateNewElementStepOneComponent } from './create-new-element-step-one/create-new-element-step-one.component';
import { StepperModule } from '@shared/components';

@NgModule({
  declarations: [CreateElementComponent, CreateNewElementStepOneComponent],
  imports: [
    CreateElementRoutingModule,
    SharedModule,
    NoDataFoundModule,
    TableFilterModule,
    ConfirmationModule,
    SelectCurrencyModule,
    TermsConditionsModule,
    StepperModule,
  ],
})
export class CreateNewElementModule {}
