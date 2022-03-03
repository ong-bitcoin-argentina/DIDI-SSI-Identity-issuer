const vusService = require('../../services/vusService');
const ResponseHandler = require('../../utils/ResponseHandler');
const Messages = require('../../constants/Messages');

const addDocumentImage = async (req, res) => {
  const params = req.body;

  // eslint-disable-next-line no-console
  console.log(`${params.operationId} adding ${params.side}`);
  try {
    const addImageMethod =
      params.side === 'selfie' ? vusService.addSelfie : vusService.addImage;
    const addImage = await addImageMethod(params);
    return ResponseHandler.sendRes(res, addImage);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, Messages.VUS.ADD_IMAGE);
  }
};

module.exports = {
  addDocumentImage,
};
