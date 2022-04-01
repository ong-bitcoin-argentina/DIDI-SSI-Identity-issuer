const {
  createCredential,
  emmitCredential,
} = require('../services/CredentialService');

const {
  PERSONAL_TEMPLATE_ID,
  LOCATION_TEMPLATE_ID,
} = require('../constants/Constants');

const { formatLocationData, formatPeronalData } = require('./utils');

const emmitIdentityCredential = async (did, credData, templateId) => {
  // Creación de credencial
  const { data } = await createCredential({ credData, did, templateId });
  const { _id: id } = data[0];

  // Emisión de credencial
  const credential = await emmitCredential({ id });

  if (credential.status === 'error') {
    const { data: error } = credential;
    throw error;
  }

  return credential;
};

const createAndEmmitCredentials = async (did, ocr) => {
  const additional = JSON.parse(ocr.extra.additional);

  const splitAddress = additional.Address.split([' - ']);

  // Se da formato a la información personal
  const personalData = formatPeronalData({
    idNumber: ocr.number,
    names: ocr.names,
    lastNames: ocr.lastNames,
    nationality: additional.Nationality,
  });
  // Se crea y emite credencial con info personal
  const personalCredential = await emmitIdentityCredential(
    did,
    personalData,
    PERSONAL_TEMPLATE_ID,
  );

  // Se da formato a la informacion de domicilio
  const locationData = formatLocationData({
    address: splitAddress[0],
    city: splitAddress[1],
    municipality: splitAddress[2],
    province: splitAddress[3],
    country: additional.DETECTED_DOCUMENT_COUNTRY,
  });
  // Se crea y emite credencial con info de domicilio
  const locationCredential = await emmitIdentityCredential(
    did,
    locationData,
    LOCATION_TEMPLATE_ID,
  );

  return [personalCredential, locationCredential];
};

module.exports = { createAndEmmitCredentials };
