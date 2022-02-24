const vusService = require('../../services/vusService');

const Constants = require('../../constants/Constants');
const Messages = require('../../constants/Messages');

const finishOperation = async (req, res) => {
  const params = req.body;
  try {
    const endOperation = await vusService.simpleOperation(
      params,
      Constants.VUS_URLS.END_OPERATION,
    );
    return res.status(200).json(endOperation);
  } catch (error) {
    return res.status(500).json(Messages.VUS.END_OPERATION);
  }
};

module.exports = { finishOperation };
