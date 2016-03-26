lensProp = R.curry(function lensProp(prop) {
  return R.lens(R.prop(prop), assoc(prop))
})
