// Create a duplicate of all objects to any zero-indexed depth.
_.deepClone = function(obj, depth) {
  if (!obj || (typeof obj !== 'object')) return obj;  // by value
  else if (_.isString(obj)) return String.prototype.slice.call(obj);
  else if (_.isDate(obj)) return new Date(obj.valueOf());
  else if (_.isFunction(obj.clone)) return obj.clone();
  var clone;
  if (_.isArray(obj)) clone = Array.prototype.slice.call(obj);
  else if (obj.constructor!=={}.constructor) return obj; // by reference
  else clone = _.extend({}, obj);
  if (!_.isUndefined(depth) && (depth > 0)) {
    for (var key in clone) {
      clone[key] = _.deepClone(clone[key], depth-1);
    }
  }
  return clone;
};
