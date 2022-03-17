const fetch = require('node-fetch');

const { CREATE_CERT, ISSUER_AUTH_TOKEN } = require('../constants/Constants');
const {
  missingData,
  missingDid,
  missingTemplateId,
} = require('../constants/serviceErrors');

const createCert = async (data, did, templateId) => {
  if (!data) throw missingData;
  if (!did) throw missingDid;
  if (!templateId) throw missingTemplateId;

  const certData = {
    cert: data.map((item) => {
      return {
        name: item.name,
        value: item.value,
      };
    }),
    participant: [
      {
        name: 'DID',
        value: did,
      },
    ],
    others: [],
  };

  const body = JSON.stringify({
    templateId,
    split: false,
    microCredentials: [],
    data: JSON.stringify(certData),
  });

  try {
    const response = await fetch(CREATE_CERT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: ISSUER_AUTH_TOKEN,
      },
      body,
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

module.export = { createCert };
