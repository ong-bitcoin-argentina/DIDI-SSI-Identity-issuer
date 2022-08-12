const fetch = require('node-fetch');

const { logError } = require('./logToConsole');

const { ISSUER_URLS } = require('../constants/Constants');
const { missingBody, missingId } = require('../constants/serviceErrors');

const { CREATE_CREDENTIAL, EMMIT_CREDENTIAL, LOGIN } = ISSUER_URLS;

const createCredential = async (body, token) => {
  if (!body) throw missingBody;
  try {
    const response = await fetch(CREATE_CREDENTIAL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body,
    });
    return response.json();
  } catch (error) {
    logError(error);
    throw error;
  }
};

const emmitCredential = async (id, token) => {
  if (!id) throw missingId;
  try {
    const response = await fetch(EMMIT_CREDENTIAL(id, token), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });
    return response.json();
  } catch (error) {
    logError(error);
    throw error;
  }
};

const login = async (name, password) => {
  const body = { name, password };
  try {
    const response = await fetch(LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const jsonResp = await response.json();
    if (jsonResp.status === 'error') throw jsonResp;
    const { token } = jsonResp.data;
    return token;
  } catch (error) {
    logError(error);
    throw error;
  }
};

module.exports = {
  createCredential,
  emmitCredential,
  login,
};
