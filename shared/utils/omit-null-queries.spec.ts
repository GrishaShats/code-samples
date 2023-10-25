import { omitNullQueries } from './omit-null-queries';

describe('OmitNullQueriesUtil', () => {
  const withNullQueriesMock: any = {
    test1: null,
    test2: '',
    test3: undefined,
    data: 'test',
  };
  const resultObj = {
    data: 'test',
  };
  it('should omit queries with null, undefined and empty value', () => {
    expect(omitNullQueries(withNullQueriesMock)).toEqual(resultObj);
  });
  it('should ignore empty query object', () => {
    expect(omitNullQueries(null)).toEqual({});
  });
});
