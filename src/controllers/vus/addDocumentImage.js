const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');
const { get, set } = require('../../services/RedisService');

const ResponseHandler = require('../../utils/ResponseHandler');
const Messages = require('../../constants/Messages');

const addDocumentImage = async (req, res) => {
  const params = req.body;

  // eslint-disable-next-line no-console
  console.log(`${params.operationId} adding ${params.side}`);
  try {
    // obtengo did asociado al operationId
    const did = await AuthRequestService.getDidByOperationId(
      params.operationId,
    );
    if (!did) throw Messages.VUS.GET_DID;

    // verifico existencia en cache
    const searchTerm = `add-${params.side}-${did}`;
    let response = JSON.parse(await get(searchTerm));
    // si no existe en cache, realizo la operacion
    if (!response) {
      const addImageMethod =
        params.side === 'selfie' ? vusService.addSelfie : vusService.addImage;
      response = await addImageMethod(params);
      // guardo en cache
      await set(searchTerm, JSON.stringify(response));
    }
    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = {
  addDocumentImage,
};
