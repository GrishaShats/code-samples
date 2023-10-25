import { TestScheduler } from 'rxjs/testing';
import { filterNil } from './rxjs-operators';

describe('Custom RxJS operators', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('filterNil', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const stream$ = cold('a-b-c-d', { a: null, b: 2, c: '', d: false });
      const expected = '--b--';

      expectObservable(stream$.pipe(filterNil())).toBe(expected, { b: 2 });
    });
  });
});
