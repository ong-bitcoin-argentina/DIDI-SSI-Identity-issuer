const {
  createCredential,
  emmitCredential,
} = require('../services/CredentialService');

const createAndEmmitCredential = async (did, credData, templateId) => {
  // Creación de credencial
  const { data } = await createCredential({ data: credData, did, templateId });
  const { _id: id } = data[0];

  // Emisión de credencial
  const credential = await emmitCredential({ id });

  if (credential.status === 'error') {
    const { data: error } = credential;
    throw error;
  }

  return credential;
};

module.exports = { createAndEmmitCredential };
