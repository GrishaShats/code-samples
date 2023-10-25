export const searchByPropsHelper = <T>(items: T[], searchText: string, propNames: (keyof T)[]): T[] =>
  items.filter((item) => {
    const allPropValues = propNames.map((prop) => (item[prop] as unknown as string)?.toLowerCase());

    return allPropValues.some((value) => value?.includes(searchText.toLowerCase()));
  });
