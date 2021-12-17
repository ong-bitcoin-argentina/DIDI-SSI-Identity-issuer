const assert = require('assert');

const PORT = 8089;

assert.ok(PORT, 'No esta definida la varibale PORT');

module.exports = {
  PORT,
};