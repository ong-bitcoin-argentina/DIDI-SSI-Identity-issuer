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
    if (authRequest.status === 'In Progress') {
      authRequest.status = 'Cancelled';
      authRequest = await AuthRequestService.update(
        Constants.AUTHENTICATION_REQUEST.CANCELLED,
        Messages.VUS.CANCEL_OPERATION.message,
        operationId,
      );
      // eslint-disable-next-line no-unused-vars
      cancelRequest = await vusService.cancelOperation(userName, operationId);
    }
    return res.status(200).send('Operacion cancelada exitosamente');
  } catch (error) {
    return error;
  }
};

module.exports = {
  cancelVerification,
};
