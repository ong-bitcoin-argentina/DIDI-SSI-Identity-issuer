const { get, set } = require('../../services/RedisService');
const AuthRequestService = require('../../services/AuthRequestService');
const ResponseHandler = require('../../utils/ResponseHandler');

const getStatus = async (req, res) => {
  const { did } = req.params;
  try {
    const searchTerm = `getStatus-${did}`;
    // BUSCO EN LA CACHE
    let authRequest = JSON.parse(await get(searchTerm));
    if (!authRequest) {
      authRequest = await AuthRequestService.findByDid({
        did,
      });
      await set(searchTerm, JSON.stringify(authRequest));
    }
    return ResponseHandler.sendRes(res, {
      status: authRequest.status,
      operationId: authRequest.operationId,
      did,
    });
  } catch (err) {
    return ResponseHandler.sendErr(res, err);
  }
};

module.exports = { getStatus };
