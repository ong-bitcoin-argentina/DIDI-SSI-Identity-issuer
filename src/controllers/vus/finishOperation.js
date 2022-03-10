const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');

const ResponseHandler = require('../../utils/ResponseHandler');

const Constants = require('../../constants/Constants');

const finishOperation = async (req, res) => {
  const params = req.body;
  try {
    params.operation = 'finish';
    const response = await vusService.simpleOperation(params);
    if (response.identical)
      // identical true si el confidenceTotal calculado es mayor o igual al umbral definido en el backend. Caso SUCCESSFUL
      await AuthRequestService.update(
        Constants.AUTHENTICATION_REQUEST.SUCCESSFUL,
        response.message,
        params.operationId,
      );
    else {
      // identical false implica un caso FAILED
      await AuthRequestService.update(
        Constants.AUTHENTICATION_REQUEST.FAILED,
        response.message,
        params.operationId,
      );
    }

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = { finishOperation };
