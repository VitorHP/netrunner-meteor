import { assoc } from "./assoc.js"
import R from 'ramda'

export const lensProp = R.curry(function lensProp(prop) {
  return R.lens(R.prop(prop), assoc(prop))
})
