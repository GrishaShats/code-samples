import { NgModule } from '@angular/core';
import { StepperComponent } from './stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperFooterComponent } from './stepper-footer/stepper-footer.component';

@NgModule({
  declarations: [StepperComponent, StepperFooterComponent],
 
  exports: [StepperComponent, CdkStepperModule, StepperFooterComponent],
})
export class StepperModule {}
