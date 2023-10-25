import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsComponent } from './elements.component';
import { elementDetailsResolver } from './resolvers/element-details.resolver';
import { ElementsListComponent } from '@features/main-wrapper/elements/elements-list/elements-list.component';
import { accessRightsGuard } from '@core/guards';
import { AccessRights } from '@shared/enum';

const routes: Routes = [
  {
    path: '',
    component: ElementsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ElementsListComponent,
      },
      {
        path: 'create-element',
        loadChildren: () => import('./create-new-element/create-element.module').then((m) => m.CreateNewElementModule),
        canActivate: [accessRightsGuard(AccessRights.ELEMENTS_OPEN_NEW_ELEMENTS)],
        data: {
          accessRight: AccessRights.ELEMENTS_OPEN_NEW_ELEMENTS,
        },
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./element-details/element-details.module').then((m) => m.ElementDetailsModule),
        resolve: {
          element: elementDetailsResolver,
        },
        canActivate: [accessRightsGuard({ accessRight: AccessRights.ELEMENTS_VIEW_ELEMENTS, paramCheck: 'id' })],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementsRoutingModule {}
