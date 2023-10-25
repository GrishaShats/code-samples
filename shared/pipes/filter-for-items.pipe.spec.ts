import { FilterForItemsPipe } from './filter-for-items.pipe';

describe('FilterForItemsPipe', () => {
  const pipe = new FilterForItemsPipe();
  const items = ['aa', 'bb', 'cc', 'dd'];
  const exclude = ['bb', 'dd'];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('pipe should return an array of filtered items', () => {
    const result = pipe.transform(items, exclude);
    expect(result).toEqual(['aa', 'cc']);
  });
  it('pipe should return unchanged items if no exclude items provided', () => {
    const result = pipe.transform(items, undefined);
    expect(result).toEqual(items);
  });
  it('pipe should return empty array if no items provided', () => {
    const result = pipe.transform(undefined, exclude);
    expect(result).toEqual([]);
  });
});
