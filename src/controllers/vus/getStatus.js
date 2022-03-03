const vuService = require('../../services/vusService');
const { get, set } = require('../../services/RedisService');

const ResponseHandler = require('../../utils/ResponseHandler');

const Constants = require('../../constants/Constants');

const getStatus = async (req, res) => {
  const params = req.body;
  try {
    const searchTerm = `status-${params.operationId}`;
    let result = JSON.parse(await get(searchTerm));

    if (!result) {
      result = await vuService.simpleOperation(
        params,
        Constants.VUS_URLS.GET_STATUS,
      );
      await set(searchTerm, JSON.stringify(result));
    }

    return ResponseHandler.sendRes(res, result);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = { getStatus };
