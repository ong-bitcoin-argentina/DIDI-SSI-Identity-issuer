/* eslint-disable no-console */
const Constants = require('../constants/Constants');

// loggear errores
const logError = (error) => {
  if (Constants.DEBUG) {
    console.log(new Date().toLocaleString('es-AR'));
    console.log(error);
  }
};

module.exports = {
  logError,
};
