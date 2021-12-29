const assert = require('assert');

const { PORT, ENVIRONMENT, NAME, VERSION } = process.env;

assert.ok(PORT, 'No esta definida la varibale PORT');
assert.ok(ENVIRONMENT, 'No esta definida la varibale ENVIRONMENT');
assert.ok(NAME, 'No esta definida la varibale NAME');
assert.ok(VERSION, 'No esta definida la varibale VERSION');

module.exports = {
  PORT,
  ENVIRONMENT,
  NAME,
  VERSION,
};
