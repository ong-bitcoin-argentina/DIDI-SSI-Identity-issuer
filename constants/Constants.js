const assert = require('assert');

const PORT = 8089;
const ENVIRONMENT = 'dev';
const NAME = 'VUS';
const VERSION = '1';

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
