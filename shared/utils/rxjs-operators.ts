import { isNil } from 'lodash';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export function filterNil() {
  return function <T>(source: Observable<T>) {
    return source.pipe(
      filter(
        (value) =>
          !isNil(value) &&
          !(typeof value === 'string' && value === '') &&
          !(typeof value === 'boolean' && value === false)
      )
    );
  };
}

export function filterNilWithCallback(callback: () => void) {
  return function <T>(source: Observable<T>) {
    return source.pipe(
      tap((v) => {
        if (!v) {
          callback();
        }
      }),
      filterNil()
    );
  };
}
