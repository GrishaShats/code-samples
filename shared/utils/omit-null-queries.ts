/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-expressions */
/* eslint-disable */
export const omitNullQueries = (payload: { [key: string]: any | null | undefined }) => {
  const params: { [key: string]: any } = {};
  if (payload) {
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== null && payload[key] !== '' && typeof payload[key] !== 'undefined') {
        params[key] = payload[key];
      }

      return true;
    });
  }

  return params;
};
