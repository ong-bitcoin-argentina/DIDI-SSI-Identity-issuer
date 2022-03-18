const IssuerService = require('./IssuerService');

const {
  missingData,
  missingDid,
  missingTemplateId,
  missingId,
} = require('../constants/serviceErrors');

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

  const body = formatBody(data, did, templateId);

  return IssuerService.createCredential(body);
};

const emmitCredential = async (id) => {
  if (!id) throw missingId;

  return IssuerService.emmitCredential(id);
};

module.exports = { createCredential, emmitCredential };
