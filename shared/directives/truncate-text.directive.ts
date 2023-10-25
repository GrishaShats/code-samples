import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[matTooltip][appTruncateText]',
})
export class TruncateTextDirective implements AfterViewInit {
  @Input() appTruncateText!: number;

  constructor(private matTooltip: MatTooltip, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;

    if (element.innerText.length > this.appTruncateText) {
      this.elementRef.nativeElement.innerText = `${element.innerText.slice(0, this.appTruncateText)}...`;
      this.matTooltip.tooltipClass = 'truncate-tooltip';
    } else {
      this.matTooltip.disabled = true;
    }
  }
}
