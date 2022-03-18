const fetch = require('node-fetch');

const { ISSUER_URLS, ISSUER_AUTH_TOKEN } = require('../constants/Constants');
const { missingBody, missingId } = require('../constants/serviceErrors');

const { CREATE_CREDENTIAL, EMMIT_CREDENTIAL } = ISSUER_URLS;

const createCredential = async (body) => {
  if (!body) throw missingBody;
  const response = await fetch(CREATE_CREDENTIAL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: ISSUER_AUTH_TOKEN,
    },
    body,
    url: CREATE_CREDENTIAL,
  });
  return response.json();
};

const emmitCredential = async (id) => {
  if (!id) throw missingId;
  const response = await fetch(EMMIT_CREDENTIAL(id), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: ISSUER_AUTH_TOKEN,
    },
    url: EMMIT_CREDENTIAL(id),
  });
  return response.json();
};

module.exports = {
  createCredential,
  emmitCredential,
};
