assoc = R.curry(function assoc(prop, val, obj) {
  var result = Object.create(Object.getPrototypeOf(obj))
  var properties = Object.getOwnPropertyNames(obj)

  for (var i = 0; i < properties.length; i += 1) {
    result[properties[i]] = obj[properties[i]]
  }

  result[prop] = val;

  return result;
});

