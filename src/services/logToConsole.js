/* eslint-disable no-console */
const Constants = require('../constants/Constants');

// loggear errores
const logError = (error) => {
  if (Constants.DEBUGG) {
    console.log(error);
  }
};

module.exports = {
  logError,
};
