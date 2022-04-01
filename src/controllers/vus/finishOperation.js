const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');

const ResponseHandler = require('../../utils/ResponseHandler');

const Constants = require('../../constants/Constants');
const ValidatedData = require('../../models/ValidatedData');

const finishOperation = async (req, res) => {
  const params = req.body;
  params.operationId = req.params.operationId;
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
    await ValidatedData.create({ did, userData: ocr });

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = { finishOperation };
