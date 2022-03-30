const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');

const ResponseHandler = require('../../utils/ResponseHandler');

const Constants = require('../../constants/Constants');

const finishOperation = async (req, res) => {
  const params = req.body;
  params.operationId = req.params.operationId;
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
    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = { finishOperation };
