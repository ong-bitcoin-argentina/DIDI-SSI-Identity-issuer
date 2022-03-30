const { get, set } = require('../../services/RedisService');
const AuthRequestService = require('../../services/AuthRequestService');
const ResponseHandler = require('../../utils/ResponseHandler');

const getStatus = async (req, res) => {
  const { operationId } = req.params;
  try {
    const searchTerm = `getStatus-${operationId}`;
    let authRequest = JSON.parse(await get(searchTerm));
    if (!authRequest) {
      authRequest = await AuthRequestService.getByOperationId(operationId);
      await set(searchTerm, JSON.stringify(authRequest));
    }
    return ResponseHandler.sendRes(res, {
      status: authRequest.status,
      operationId: authRequest.operationId,
      message: authRequest.errorMessage,
    });
  } catch (err) {
    return ResponseHandler.sendErr(res, err);
  }
};

module.exports = { getStatus };
