import { FilterByPropsPipe } from './filter-by-name.pipe';

describe('FilterForItemsPipe', () => {
  const pipe = new FilterByPropsPipe();
  const items = [
    {
      name: 'Vlad',
    },
    {
      name: 'Oleh',
    },
    {
      age: '20',
    },
  ];
  const text = 'Vlad';
  const props = ['name'];
  const expectedResult = [{ name: 'Vlad' }];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('pipe should return an empty array if no items provided', () => {
    const result = pipe.transform(undefined, text, props);
    expect(result).toEqual([]);
  });
  it('pipe should return an unchanged items if no text provided', () => {
    const result = pipe.transform(items, undefined, props);
    expect(result).toEqual(items);
  });
  it('pipe should return an array of filtered items', () => {
    const result = pipe.transform(items, text, props);
    expect(result).toEqual(expectedResult);
  });
});
