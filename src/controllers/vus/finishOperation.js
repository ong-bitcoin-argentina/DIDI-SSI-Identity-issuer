const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');
const { get, set } = require('../../services/RedisService');
const Constants = require('../../constants/Constants');
const Messages = require('../../constants/Messages');
const ResponseHandler = require('../../utils/ResponseHandler');

const finishOperation = async (req, res) => {
  const params = req.body;
  try {
    // obtengo did asociado a operationId
    const did = await AuthRequestService.getDidByOperationId(
      params.operationId,
    );
    if (!did) throw Messages.VUS.GET_DID;

    // verifico existencia en cache
    const searchTerm = `finish-operation-${did}`;
    let response = JSON.parse(await get(searchTerm));

    // si no existe en cache, realizo la operacion
    if (!response) {
      response = await vusService.simpleOperation(
        params,
        Constants.VUS_URLS.END_OPERATION,
      );
      await set(searchTerm, JSON.stringify(response));
    }
    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = { finishOperation };
