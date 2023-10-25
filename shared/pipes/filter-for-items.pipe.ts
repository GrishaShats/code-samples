import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterForItems',
})
export class FilterForItemsPipe implements PipeTransform {
  transform(items: string[], itemsToExclude: string[]): string[] {
    if (!items) {
      return [];
    }
    if (!itemsToExclude) {
      return items;
    }

    return items.filter((i) => !itemsToExclude.includes(i));
  }
}
