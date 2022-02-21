const Messages = require('../../constants/Messages');
const Constants = require('../../constants/Constants');
const AuthRequestService = require('../../services/AuthRequestService');
const vusService = require('../../services/vusService');

const cancelVerification = async (req, res) => {
  const params = req.body;
  try {
    const cancelRequest = await vusService.simpleOperation(
      params,
      Constants.VUS_URLS.CANCEL_OPERATION,
    );
    // verificar si la operacion esta pendiente
    if (
      await AuthRequestService.verifyStatus(params.operationId, 'In Progress')
    ) {
      await AuthRequestService.update(
        Constants.AUTHENTICATION_REQUEST.CANCELLED,
        Messages.VUS.CANCEL_OPERATION.message,
        params.operationId,
      );
    }
    return res.status(200).json(cancelRequest);
  } catch (error) {
    return res.status(500).json(Messages.VUS.CANCEL_OPERATION);
  }
};

module.exports = {
  cancelVerification,
};
