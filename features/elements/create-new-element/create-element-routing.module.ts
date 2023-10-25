import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canLeaveGuard } from '@core/guards/can-leave.guard';
import { CreateElementComponent } from './create-element.component';

const routes: Routes = [
  {
    path: '',
    component: CreateElementComponent,
    canDeactivate: [canLeaveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateElementRoutingModule {}
