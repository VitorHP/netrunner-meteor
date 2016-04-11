import R from 'ramda';

function method(alias, subject) {
  return R.find(R.propEq('alias', alias), subject);
}

function requirement(alias, subject, params) {
  return method(alias, subject).requirement(params);
}

function perform(alias, subject, params) {
  return method(alias, subject).perform(params);
}

export {
  requirement,
  perform,
};
