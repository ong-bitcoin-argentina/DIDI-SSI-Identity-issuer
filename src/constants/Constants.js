const assert = require('assert');

const {
  PORT,
  ENVIRONMENT,
  NAME,
  VERSION,
  DB_URI,
  VUS_URL,
  VUS_APP_VERS,
  VUS_API_KEY,
  VUS_API,
} = process.env;

assert.ok(PORT, 'No esta definida la varibale PORT');
assert.ok(ENVIRONMENT, 'No esta definida la varibale ENVIRONMENT');
assert.ok(NAME, 'No esta definida la varibale NAME');
assert.ok(VERSION, 'No esta definida la varibale VERSION');
assert.ok(DB_URI, 'No esta definida la variable DB_URI');
assert.ok(VUS_URL, 'No esta definida la variable VUS_URL');
assert.ok(VUS_APP_VERS, 'No esta definida la variable VUS_APP_VERS');
assert.ok(VUS_API_KEY, 'No esta definida la variable API_KEY');
assert.ok(VUS_API, 'No esta definida la variable VUS_API');

module.exports = {
  PORT,
  ENVIRONMENT,
  NAME,
  VERSION,
  DB_URI,
  VUS_URLS: {
    NEW_OPERATION: `${VUS_URL}/newOperation`,
  },
  VUS_API_KEY,
  VUS_API,
};
