import R from 'ramda';

export const assoc = R.curry((prop, val, obj) => {
  const result = Object.create(Object.getPrototypeOf(obj));
  let i;

  const properties = Object.getOwnPropertyNames(obj);

  for (i = 0; i < properties.length; i += 1) {
    result[properties[i]] = obj[properties[i]];
  }

  result[prop] = val;

  return result;
});

