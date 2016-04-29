import { assoc } from './assoc.js';
import R from 'ramda';

export const lensProp = R.curry((prop) =>
  R.lens(R.prop(prop), assoc(prop))
);
