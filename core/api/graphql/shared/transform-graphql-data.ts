import { cloneDeep } from 'lodash';
/* eslint-disable */
export const omitDataAttributes = <T>(payload: { [key: string]: any }): T => {
  let newPayload = cloneDeep(payload);
  Object.keys(newPayload).forEach((key) => {
    if (typeof newPayload[key] === 'object' && !Array.isArray(newPayload[key]) && newPayload[key] !== null) {
      if (Array.isArray(newPayload[key].data)) {
        newPayload[key] = newPayload[key].data.map((item: any) => {
          if (item.id) {
            item.attributes = { id: item.id, ...item.attributes };
          }

          return omitDataAttributes<T>(item.attributes);
        });
      }
      if (
        typeof newPayload[key].data === 'object' &&
        !Array.isArray(newPayload[key].data) &&
        newPayload[key].data !== null
      ) {
        if (newPayload[key].data.id) {
          newPayload[key].data.attributes = { id: newPayload[key].data.id, ...newPayload[key].data.attributes };
        }
        newPayload[key] = omitDataAttributes<T>(newPayload[key].data.attributes);
      }
    }
  });

  return newPayload as T;
};
