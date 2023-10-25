import { Pipe, PipeTransform } from '@angular/core';
import { searchByPropsHelper } from '@shared/utils';

@Pipe({
  name: 'filterByProps',
})
export class FilterByPropsPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(items: any[], searchText: string, propNames: string[]): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return searchByPropsHelper(items, searchText, propNames);
  }
}
