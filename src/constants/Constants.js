const assert = require('assert');
require('dotenv').config();

const {
  PORT,
  ENVIRONMENT,
  NAME,
  VERSION,
  DEBUG,
  DIDI_SERVER,
  MONGO_URI,
  REDIS_URI,
  PREFIJO_REDIS,
  VUS_URL,
  VUS_API_KEY,
  VUS_API_KEY_PRIVATE,
  APP_INSIGTHS_IKEY,
  ISSUER_URL,
  ISSUER_AUTH_TOKEN,
  ISSUER_SERVER_PRIVATE_KEY,
  ISSUER_USER,
  ISSUER_PASSWORD,
} = process.env;

// Microsoft App Insigths
const DISABLE_TELEMETRY_CLIENT =
  process.env.DISABLE_TELEMETRY_CLIENT === 'true';

assert.ok(PORT, 'No esta definida la varibale PORT');
assert.ok(ENVIRONMENT, 'No esta definida la varibale ENVIRONMENT');
assert.ok(NAME, 'No esta definida la varibale NAME');
assert.ok(VERSION, 'No esta definida la varibale VERSION');

assert.ok(VUS_URL, 'No esta definida la variable VUS_URL');
assert.ok(VUS_API_KEY, 'No esta definida la variable API_KEY');
assert.ok(VUS_API_KEY_PRIVATE, 'No esta definida la variable API_KEY_PRIVATE');

assert.ok(PREFIJO_REDIS, 'No esta definida la variable PREFIJO_REDIS');
assert.ok(DIDI_SERVER, 'No esta definida la variable DIDI_SERVER');
assert.ok(ISSUER_URL, 'No esta definida la variable ISSUER_URL');
assert.ok(ISSUER_AUTH_TOKEN, 'No esta definida la variable ISSUER_AUTH_TOKEN');
assert.ok(
  ISSUER_SERVER_PRIVATE_KEY,
  'No esta definida la variable ISSUER_AUTH_TOKEN',
);
assert.ok(MONGO_URI, 'No esta definida la variable MONGO_URI');

module.exports = {
  PORT,
  ENVIRONMENT,
  NAME,
  VERSION,
  DEBUG: DEBUG || false,
  DIDI_SERVER,
  MONGO_URI,
  REDIS_URI,
  PREFIJO_REDIS,
  VUS_URLS: {
    NEW_OPERATION: `${VUS_URL}/newOperation`,
    CANCEL_OPERATION: `${VUS_URL}/cancelOperation`,
    ADD_FRONT: `${VUS_URL}/addFront`,
    ADD_DOCUMENT_IMAGE: `${VUS_URL}/addDocumentImage`,
    ADD_BACK: `${VUS_URL}/addBack`,
    ADD_SELFIE: `${VUS_URL}/register`,
    END_OPERATION: `${VUS_URL}/endOperation`,
    GET_STATUS: `${VUS_URL}/statusOperation`,
    GET_DOCUMENT_INFORMATION: `${VUS_URL}/getDocumentInformation`,
  },
  ISSUER_URLS: {
    CREATE_CREDENTIAL: `${ISSUER_URL}/cert`,
    EMMIT_CREDENTIAL: (id) => `${ISSUER_URL}/cert/${id}/emmit`,
    LOGIN: `${ISSUER_URL}/user/login`,
  },
  ISSUER_AUTH_TOKEN,
  ISSUER_SERVER_PRIVATE_KEY,
  ISSUER_USER,
  ISSUER_PASSWORD,
  // // RSK
  // PERSONAL_TEMPLATE_ID: '623b2a6144c9913fc4e9cfc5',
  // LOCATION_TEMPLATE_ID: '623b2a7244c9913fc4e9cfc6',
  // // Lacchain
  // // PERSONAL_TEMPLATE_ID: '62262ce12248912bdc580a36',
  // // LOCATION_TEMPLATE_ID: '6226536d2248912bdc580a37',
  VUS_API_KEY,
  VUS_API_KEY_PRIVATE,
  AUTHENTICATION_REQUEST: {
    IN_PROGRESS: 'In Progress',
    SUCCESSFUL: 'Successful',
    FAILED: 'Failed',
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

  DISABLE_TELEMETRY_CLIENT,
  APP_INSIGTHS_IKEY,
};
