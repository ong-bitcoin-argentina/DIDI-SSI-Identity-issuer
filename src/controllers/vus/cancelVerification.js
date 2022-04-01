const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');

const ResponseHandler = require('../../utils/ResponseHandler');

const Messages = require('../../constants/Messages');
const Constants = require('../../constants/Constants');

const cancelVerification = async (req, res) => {
  const params = req.body;
  try {
    params.operation = 'cancel';
    const cancelRequest = await vusService.simpleOperation(params);
    // verificar si la operacion esta pendiente
    if (
      await AuthRequestService.verifyStatus({
        operationId: params.operationId,
        status: 'In Progress',
      })
    ) {
      await AuthRequestService.update({
        status: Constants.AUTHENTICATION_REQUEST.CANCELLED,
        errorMessage: Messages.VUS.CANCEL_OPERATION.message,
        operationId: params.operationId,
      });
    }
    return ResponseHandler.sendRes(res, cancelRequest);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = {
  cancelVerification,
};
