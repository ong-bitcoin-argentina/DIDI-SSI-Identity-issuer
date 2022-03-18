const fetch = require('node-fetch');

const { ISSUER_URLS, ISSUER_AUTH_TOKEN } = require('../constants/Constants');
const {
  missingData,
  missingDid,
  missingTemplateId,
  missingId,
} = require('../constants/serviceErrors');

const { CREATE_CERT, EMMIT_CERT } = ISSUER_URLS;

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

const createCert = async (data, did, templateId) => {
  if (!data) throw missingData;
  if (!did) throw missingDid;
  if (!templateId) throw missingTemplateId;

  try {
    const response = await fetch(CREATE_CERT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: ISSUER_AUTH_TOKEN,
      },
      body: formatBody(data, did, templateId),
      url: CREATE_CERT,
    });
    const jsronResp = await response.json();
    return jsronResp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

const emmitCert = async (id) => {
  if (!id) throw missingId;

  try {
    const response = await fetch(EMMIT_CERT(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: ISSUER_AUTH_TOKEN,
      },
      url: EMMIT_CERT(id),
    });
    const jsronResp = await response.json();
    return jsronResp;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

module.exports = { createCert, emmitCert };