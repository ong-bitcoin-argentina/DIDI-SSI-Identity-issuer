const Messages = require('../../constants/Messages');
const Constants = require('../../constants/Constants');
const AuthRequestService = require('../../services/AuthRequestService');
const vusService = require('../../services/vusService');

const cancelVerification = async (req, res) => {
  const { operationId, userName } = req.body;
  let authRequest;
  let cancelRequest;
  try {
    // verificar si la operacion esta pendiente
    authRequest = await AuthRequestService.getByOperationId(operationId);
    if (await AuthRequestService.verifyStatus(operationId, 'In Progress')) {
      authRequest.status = 'Cancelled';
      await AuthRequestService.update(
        Constants.AUTHENTICATION_REQUEST.CANCELLED,
        Messages.VUS.CANCEL_OPERATION.message,
        operationId,
      );
      // eslint-disable-next-line no-unused-vars
    }
    cancelRequest = await vusService.cancelOperation(userName, operationId);

    return res.status(200).json(cancelRequest);
  } catch (error) {
    return res.status(500).json(Messages.VUS.CANCEL_VERIFICATION);
  }
};

module.exports = {
  cancelVerification,
};
