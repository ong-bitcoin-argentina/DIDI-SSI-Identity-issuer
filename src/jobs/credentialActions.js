const {
  createCredential,
  emmitCredential,
} = require('../services/CredentialService');

const createAndEmmitCredential = async (did, credData, templateId, token) => {
  // Creación de credencial
  const { data } = await createCredential({
    data: credData,
    did,
    templateId,
    token,
  });
  const { _id: id } = data[0];

  // Emisión de credencial
  const credential = await emmitCredential({ id, token });

  if (credential.status === 'error') {
    const { data: error } = credential;
    throw error;
  }

  return credential;
};

module.exports = { createAndEmmitCredential };
