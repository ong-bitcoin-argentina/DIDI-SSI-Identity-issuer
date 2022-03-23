const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');
const {
  createCredential,
  emmitCredential,
} = require('../../services/CredentialService');

const ResponseHandler = require('../../utils/ResponseHandler');
const { formatLocationData, formatPeronalData } = require('./utils');

const Constants = require('../../constants/Constants');

const personalDataTempId = '623b2a6144c9913fc4e9cfc5';
const locationDataTempId = '623b2a7244c9913fc4e9cfc6';

const emmitIdentityCredential = async (did, credData, templateId) => {
  // Creación de credencial
  const { data } = await createCredential(credData, did, templateId);
  const { _id } = data[0];

  // Emisión de credencial
  const credential = await emmitCredential(_id);

  if (credential.status === 'error') {
    const { data: error } = credential;
    throw error;
  }

  return credential;
};

const createAndEmmitCredentials = async (ocr, did) => {
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
    personalDataTempId,
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
    locationDataTempId,
  );

  return [personalCredential, locationCredential];
};

const finishOperation = async (req, res) => {
  const params = req.body;
  try {
    params.operation = 'finish';
    const response = await vusService.simpleOperation(params);

    // identical true si el confidenceTotal calculado es mayor o igual al umbral definido en el backend. Caso SUCCESSFUL
    const { did } = await AuthRequestService.update(
      response.identical
        ? Constants.AUTHENTICATION_REQUEST.SUCCESSFUL
        : Constants.AUTHENTICATION_REQUEST.FAILED,
      response.message,
      params.operationId,
    );

    // Retorna si la validación no fue exitosa
    if (!response.identical) return ResponseHandler.sendRes(res, response);

    // En caso de validación exitosa se realiza el proceso de emisión de credenciales
    const { ocr } = response;
    response.credentials = await createAndEmmitCredentials(ocr, did);

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = { finishOperation };
