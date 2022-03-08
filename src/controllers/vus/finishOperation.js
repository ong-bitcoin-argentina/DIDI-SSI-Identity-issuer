const vusService = require('../../services/vusService');

const ResponseHandler = require('../../utils/ResponseHandler');

const Constants = require('../../constants/Constants');
const Messages = require('../../constants/Messages');

const finishOperation = async (req, res) => {
  const params = req.body;
  try {
    params.url = Constants.VUS_URLS.END_OPERATION;
    const endOperation = await vusService.simpleOperation(params);
    return ResponseHandler.sendRes(res, endOperation);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, Messages.VUS.END_OPERATION);
  }
};

module.exports = { finishOperation };
