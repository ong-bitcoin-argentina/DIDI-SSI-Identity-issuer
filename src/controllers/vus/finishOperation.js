const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');
// const { createCredential } = require('../../services/CertService');

const ResponseHandler = require('../../utils/ResponseHandler');

const Constants = require('../../constants/Constants');

// const createCredentialificates = async (data, operationId) => {
//   const { did } = await AuthRequestService.getByOperationId(operationId);
//   const { names, lastNames, number, nacionality, expDate } = data;

//   const personalData = new Map();
//   personalData.set('Credencial', 'Datos Personales');
//   personalData.set('Nombre(s)', names);
//   personalData.set('Apellidos(s)', lastNames);
//   personalData.set('Numero de Identidad', number);
//   personalData.set('Expiración', expDate);
//   personalData.set('Nacionalidad', nacionality);

//   // const locationData = {
//   //   calle: 'calle',
//   // };

//   const { _id: personalCertId } = await createCredential(personalData, did, templateId);
//   //  const personalCert = await emmitCredential(personalCertId);

//   // const { _id: locationCertId } = await createCredential(locationData, did, templateId);
//   // const locationCert = await emmitCredential(locationCertId);

//   return [personalCertId];
// };

const finishOperation = async (req, res) => {
  const params = req.body;
  try {
    params.operation = 'finish';
    const response = await vusService.simpleOperation(params);

    // identical true si el confidenceTotal calculado es mayor o igual al umbral definido en el backend. Caso SUCCESSFUL
    await AuthRequestService.update(
      response.identical
        ? Constants.AUTHENTICATION_REQUEST.SUCCESSFUL
        : Constants.AUTHENTICATION_REQUEST.FAILED,
      response.message,
      params.operationId,
    );

    // const certs = await createCredentialificates(
    //   response.data.orc,
    //   params.operationId,
    // );

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = { finishOperation };
