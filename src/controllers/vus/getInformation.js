const vusService = require('../../services/vusService');

const ResponseHandler = require('../../utils/ResponseHandler');

const getInformation = async (req, res) => {
  const params = req.body;
  try {
    params.operation = 'getInformation';
    const information = await vusService.simpleOperation(params);

    return ResponseHandler.sendRes(res, information);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = {
  getInformation,
};
