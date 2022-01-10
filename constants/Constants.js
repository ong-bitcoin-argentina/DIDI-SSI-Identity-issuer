const assert = require('assert');

const { PORT, ENVIRONMENT, NAME, VERSION, DB_URI } = process.env;

assert.ok(PORT, 'No esta definida la varibale PORT');
assert.ok(ENVIRONMENT, 'No esta definida la varibale ENVIRONMENT');
assert.ok(NAME, 'No esta definida la varibale NAME');
assert.ok(VERSION, 'No esta definida la varibale VERSION');
assert.ok(DB_URI, 'No esta definida la variable DB_URI');

module.exports = {
  PORT,
  ENVIRONMENT,
  NAME,
  VERSION,
  DB_URI,
};
