const vusService = require('../../services/vusService');

const ResponseHandler = require('../../utils/ResponseHandler');

const addDocumentImage = async (req, res) => {
  const params = req.body;
  params.operationId = req.params.operationId;

  // eslint-disable-next-line no-console
  console.log(`${params.operationId} adding ${params.side}`);
  try {
    const addImageMethod =
      params.side === 'selfie' ? vusService.addSelfie : vusService.addImage;
    const response = await addImageMethod(params);

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = {
  addDocumentImage,
};
