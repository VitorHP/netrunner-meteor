import R from 'ramda';

function method(label, subject) {
  return R.find(R.propEq('label', label), subject);
}

function requirement(label, subject, params) {
  return method(label, subject).requirement(params);
}

function perform(label, subject, params) {
  return method(label, subject).perform(params);
}

export {
  requirement,
  perform,
};
