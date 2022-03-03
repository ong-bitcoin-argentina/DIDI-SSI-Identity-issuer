const AuthRequestService = require('../../services/AuthRequestService');
const vusService = require('../../services/vusService');

const Messages = require('../../constants/Messages');
const Constants = require('../../constants/Constants');
const ResponseHandler = require('../../utils/ResponseHandler');

const cancelVerification = async (req, res) => {
  const params = req.body;
  try {
    // obtengo el did asociado al operationId
    const did = await AuthRequestService.getDidByOperationId(
      params.operationId,
    );
    if (!did) throw Messages.VUS.GET_DID;

    const response = await vusService.simpleOperation(
      params,
      Constants.VUS_URLS.CANCEL_OPERATION,
    );

    // verifico si la operacion esta pendiente
    if (
      await AuthRequestService.verifyStatus(params.operationId, 'In Progress')
    ) {
      await AuthRequestService.update(
        Constants.AUTHENTICATION_REQUEST.CANCELLED,
        Messages.VUS.CANCEL_OPERATION.message,
        params.operationId,
      );
    }

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = {
  cancelVerification,
};
