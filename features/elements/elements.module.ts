import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ElementsRoutingModule } from './elements-routing.module';
import { ElementsComponent } from './elements.component';
import { ElementsListComponent } from '@features/main-wrapper/elements/elements-list/elements-list.component';
import { HeaderModule } from '@shared/components/header/header.module';
import { NoDataFoundModule } from '@shared/components/no-data-found/no-data-found.module';
import { ConfirmationModule } from '@shared/components/confirmation/confirmation.module';
import { MatListModule } from '@angular/material/list';
import { CopyContentComponent } from '@shared/components/copy-content/copy-content.component';

@NgModule({
  declarations: [ElementsComponent, ElementsListComponent],
  imports: [
    SharedModule,
    ElementsRoutingModule,
    HeaderModule,
    ConfirmationModule,
    NoDataFoundModule,
    MatListModule,
    CopyContentComponent,
  ],
})
export class ElementsModule {}
