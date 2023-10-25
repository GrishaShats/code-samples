import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@shared/interfaces';
import { elementsSettingsListActions } from '@core/state/actions';

@Component({
  selector: 'app-elements',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsComponent {
  constructor(private store: Store<IAppState>) {
    this.store.dispatch(elementsSettingsListActions.loadElementsSettingsList());
  }
}
