const fetch = require('node-fetch');

const { ISSUER_URLS, ISSUER_AUTH_TOKEN } = require('../constants/Constants');
const {
  missingData,
  missingDid,
  missingTemplateId,
  missingId,
} = require('../constants/serviceErrors');

const { CREATE_CREDENTIAL, EMMIT_CREDENTIAL } = ISSUER_URLS;

const formatBody = (data, did, templateId) => {
  const dataArray = [];
  data.forEach((key, value) => {
    dataArray.push({
      name: value,
      value: key,
    });
  });

  const certData = {
    cert: dataArray.map((item) => {
      return {
        name: item.name,
        value: item.value,
      };
    }),
    participant: [
      [
        {
          name: 'DID',
          value: did,
        },
      ],
    ],
    others: [],
  };

  return JSON.stringify({
    templateId,
    split: false,
    microCredentials: [],
    data: JSON.stringify(certData),
  });
};

const createCredential = async (data, did, templateId) => {
  if (!data) throw missingData;
  if (!did) throw missingDid;
  if (!templateId) throw missingTemplateId;

  const response = await fetch(CREATE_CREDENTIAL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: ISSUER_AUTH_TOKEN,
    },
    body: formatBody(data, did, templateId),
    url: CREATE_CREDENTIAL,
  });
  const jsronResp = await response.json();
  return jsronResp;
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
  const jsronResp = await response.json();
  return jsronResp;
};

module.exports = { createCredential, emmitCredential };
