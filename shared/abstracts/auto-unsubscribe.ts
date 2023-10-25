import { Subject } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';

@Directive()
/* eslint-disable  @angular-eslint/directive-class-suffix */
export abstract class AutoUnsubscribe implements OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  protected unsubscribe(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
