const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const has = require('lodash/has');
const isEmpty = require('lodash/isEmpty');

/**
 * A helper function that accepts two required inputs, each of which is an array of strings denoting
 * a representative object's list of keys. The returned output is their set difference w.r.t. the first
 * input; that is, an array whose entries denote the keys missing from the second array argument.
 * @param  {array} arr1   The first input array
 * @param  {array} arr2   The second input array
 * @return {array}        An array of strings given to be the keys present in the first array
 *                        but absent from the second input array
 */
const difference = (arr1, arr2) => arr1.filter((key) => !arr2.includes(key));

/**
 * Another helper function that serves to 
 * @param  {object} obj   The input object
 * @return {object}       The compacted object
 */
const compact = (obj) => {
  const result = {};
  Object
    .keys(obj)
    .forEach((key) => {
      if (has(obj, key) && !isEmpty(obj[key])) result[key] = obj[key];
    });
  return result;
};

try {
  fs.accessSync(path.resolve(__dirname, '../.env'), fs.R_OK);
  fs.accessSync(path.resolve(__dirname, '../.env.example'), fs.R_OK);
} catch (evt) {
  throw new Error('Both .env and .env.example files must be present in the root of your project\'s working directory');
}

const vars = dotenv.parse(fs.readFileSync('.env'));
const exampleVars = dotenv.parse(fs.readFileSync('.env.example'));
const missing = difference(Object.keys(exampleVars), Object.keys(compact(vars)));

if (missing.length > 0) {
  throw new Error(`Missing environment variables:\t${missing.join(', ')}`);
}

module.exports = (additionalVars = {}) => {
  if (additionalVars !== Object(additionalVars)) additionalVars = {};

  const injectedVars = Object.assign({}, vars, additionalVars);

  return Object
    .keys(injectedVars)
    .reduce((previous, current) => {
      // If value is a string, `DefinePlugin` will use it as a code fragment, so we need to hack around this behaviour:
      previous[current] = JSON.stringify(injectedVars[current]);
      return previous;
    }, {});
};
