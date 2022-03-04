const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');

const ResponseHandler = require('../../utils/ResponseHandler');

const Constants = require('../../constants/Constants');
const Messages = require('../../constants/Messages');

const finishOperation = async (req, res) => {
  const params = req.body;
  try {
    const response = await vusService.simpleOperation(
      params,
      Constants.VUS_URLS.END_OPERATION,
    );
    await AuthRequestService.update(
      Constants.AUTHENTICATION_REQUEST.SUCCESSFUL,
      response.message,
      params.operationId,
    );
    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    await AuthRequestService.update(
      Constants.AUTHENTICATION_REQUEST.FAILED,
      Messages.VUS.END_OPERATION.message,
      params.operationId,
    );
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = { finishOperation };
