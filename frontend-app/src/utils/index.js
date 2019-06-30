export const createArrayFromObject = object => (object == null ? [] : values(object, Object.keys(object)));

const values = (object, keys) => (keys == null ? [] : keys.map(key => object[key]));
