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
  const credentialData = {
    cert: dataArray,
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
    data: JSON.stringify(credentialData),
  });
};

const createCredential = async (params) => {
  if (!params.data) throw missingData;
  if (!params.did) throw missingDid;
  if (!params.templateId) throw missingTemplateId;
  const { data, did, templateId } = params;

  const body = formatBody(data, did, templateId);

  return IssuerService.createCredential(body);
};

const emmitCredential = async (params) => {
  if (!params.id) throw missingId;

  return IssuerService.emmitCredential(params.id);
};

module.exports = { createCredential, emmitCredential };
