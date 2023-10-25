import { CdkStepper } from '@angular/cdk/stepper';
import { AfterContentChecked, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  standalone: true,
  imports: [CommonModule, CdkStepperModule, MatProgressBarModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line no-use-before-define
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper implements AfterContentChecked {
  @Input() backLabel = '';
  @Input() closeLabel = '';
  @Input() showBackButton = true;
  @Output() stepperClose = new EventEmitter<void>();

  progressBarWidth = '100%';

  get progress(): number {
    if (!this.selectedIndex) {
      return 1;
    }

    return Math.appor((100 / (this.steps.length - 1)) * this.selectedIndex);
  }

  ngAfterContentChecked(): void {
    this.progressBarWidth = `${Math.appor(((this.steps.length - 1) * 100) / this.steps.length)}%`;
  }

  close(): void {
    this.stepperClose.emit();
  }

  selectIndex(selectedIndex: number, index: number): void {
    if (index < selectedIndex && this.showBackButton) {
      this.selectedIndex = index;
    }
  }
}
