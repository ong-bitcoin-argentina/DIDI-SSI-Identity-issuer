const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');

const ResponseHandler = require('../../utils/ResponseHandler');

const Constants = require('../../constants/Constants');
const ValidatedData = require('../../models/ValidatedData');
const { formatLocationData, formatPeronalData } = require('./utils');

const formatData = (ocr) => {
  const additional = JSON.parse(ocr.extra.additional);
  const splitAddress = additional.Address.split([' - ']);

  // Se da formato a la información personal
  const personalData = formatPeronalData({
    idNumber: ocr.number,
    names: ocr.names,
    lastNames: ocr.lastNames,
    nationality: additional.Nationality,
  });

  // Se da formato a la informacion de domicilio
  const locationData = formatLocationData({
    address: splitAddress[0],
    city: splitAddress[1],
    municipality: splitAddress[2],
    province: splitAddress[3],
    country: additional.DETECTED_DOCUMENT_COUNTRY,
  });

  return {
    personalData,
    locationData,
  };
};

const finishOperation = async (req, res) => {
  const params = req.body;
  params.operationId = req.params.operationId;
  try {
    params.operation = 'finish';
    const response = await vusService.simpleOperation(params);

    // identical true si el confidenceTotal calculado es mayor o igual al umbral definido en el backend. Caso SUCCESSFUL
    const { did } = await AuthRequestService.update({
      status: response.identical
        ? Constants.AUTHENTICATION_REQUEST.SUCCESSFUL
        : Constants.AUTHENTICATION_REQUEST.FAILED,
      message: response.message,
      operationId: params.operationId,
    });

    // Retorna si la validación no fue exitosa
    if (!response.identical) return ResponseHandler.sendRes(res, response);

    const { ocr } = response;
    const { personalData, locationData } = formatData(ocr);

    // Se guardan datos para emisión de credenciales
    await ValidatedData.create({ did, personalData });
    await ValidatedData.create({ did, locationData });

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = { finishOperation };
