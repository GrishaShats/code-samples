import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { toastActions } from '@core/state/actions';
import { ToastType } from '@shared/enum';
import { IAppState } from '@shared/interfaces';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { IconHoverDirective } from '@shared/directives/icon-hover.directive';

@Component({
  selector: 'app-copy-content',
  templateUrl: './copy-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .skip-height {
        margin-bottom: -28px;
        margin-top: -28px;
      }
    `,
  ],
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, TranslateModule, ClipboardModule, IconHoverDirective],
})
export class CopyContentComponent {
  @Input() copiedMessage = '';
  @Input() copiedContent = '';
  @Input() shownContent = '';

  constructor(private store: Store<IAppState>) {}

  copyContent(): void {
    this.store.dispatch(toastActions.show({ message: this.copiedMessage, toastType: ToastType.SUCCESS }));
  }
}
