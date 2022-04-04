const fetch = require('node-fetch');

const { logError } = require('./logToConsole');

const { ISSUER_URLS, ISSUER_AUTH_TOKEN } = require('../constants/Constants');
const { missingBody, missingId } = require('../constants/serviceErrors');

const { CREATE_CREDENTIAL, EMMIT_CREDENTIAL } = ISSUER_URLS;

const createCredential = async (body) => {
  if (!body) throw missingBody;
  try {
    const response = await fetch(CREATE_CREDENTIAL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: ISSUER_AUTH_TOKEN,
      },
      body,
    });
    return response.json();
  } catch (error) {
    logError(error);
    throw error;
  }
};

const emmitCredential = async (id) => {
  if (!id) throw missingId;
  try {
    const response = await fetch(EMMIT_CREDENTIAL(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: ISSUER_AUTH_TOKEN,
      },
    });
    return response.json();
  } catch (error) {
    logError(error);
    throw error;
  }
};

module.exports = {
  createCredential,
  emmitCredential,
};
