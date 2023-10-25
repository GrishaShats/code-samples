import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState, IElement } from '@shared/interfaces';
import { ElementsService } from '@core/services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { elementListActions } from '@core/state/actions';

export const elementDetailsResolver: ResolveFn<IElement> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  elementsService: ElementsService = inject(ElementsService),
  store: Store<IAppState> = inject(Store<IAppState>)
): Observable<IElement> =>
  elementsService
    .getElementById(route.paramMap.get('id'))
    .pipe(tap((element) => store.dispatch(elementListActions.setActiveElementForDetailsView({ element }))));
