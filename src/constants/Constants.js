const assert = require('assert');
require('dotenv').config();

const {
  PORT,
  ENVIRONMENT,
  NAME,
  VERSION,
  MONGO_URI,
  VUS_URL,
  VUS_APP_VERS,
  VUS_API_KEY,
  VUS_API,
  IP_ADDRESS,
  VERSION_APP,
} = process.env;

// assert.ok(PORT, 'No esta definida la varibale PORT');
// assert.ok(ENVIRONMENT, 'No esta definida la varibale ENVIRONMENT');
// assert.ok(NAME, 'No esta definida la varibale NAME');
// assert.ok(VERSION, 'No esta definida la varibale VERSION');
// assert.ok(DB_URI, 'No esta definida la variable DB_URI');
assert.ok(VUS_URL, 'No esta definida la variable VUS_URL');
// assert.ok(VUS_APP_VERS, 'No esta definida la variable VUS_APP_VERS');
assert.ok(VUS_API_KEY, 'No esta definida la variable API_KEY');
assert.ok(VUS_API, 'No esta definida la variable VUS_API');
// assert.ok(IP_ADDRESS, 'No esta definida la variable IP_ADDRESS');
// assert.ok(VERSION_APP, 'No esta definida la variable VERSION_APP');

module.exports = {
  PORT,
  ENVIRONMENT,
  NAME,
  VERSION,
  MONGO_URI,
  VUS_URLS: {
    NEW_OPERATION: `${VUS_URL}/newOperation`,
    CANCEL_OPERATION: `${VUS_URL}/cancelOperation`,
  },
  VUS_API_KEY,
  VUS_API,
  VUS_APP_VERS,
  AUTHENTICATION_REQUEST: {
    IN_PROGRESS: 'In Progress',
    SUCCESSFUL: 'Successful',
    FALIED: 'Falied',
    CANCELLED: 'Cancelled',
  },

  VALIDATION_TYPES: {
    IS_AUTH_TOKEN: 'IsAuthToken',
    IS_MOBILE_PHONE: 'isMobilePhone',
    IS_EMAIL: 'isEmail',
    IS_STRING: 'isString',
    IS_DATE_TIME: 'isDateTime',
    IS_BOOLEAN: 'isBoolean',
    IS_PASSWORD: 'isPassword',
    IS_BASE_64_IMAGE: 'isBase64Image',
    IS_FINGER_PRINT: 'isFingerPrint',
    IS_NUMBER: 'isNumber',
    IS_DNI: 'isDni',
    IS_IP: 'isIp',
    MAX_MB: 3,
  },

  VERSION_APP,
  IP_ADDRESS,
};
