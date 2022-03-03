const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');

const ResponseHandler = require('../../utils/ResponseHandler');
const Constants = require('../../constants/Constants');
const Messages = require('../../constants/Messages');

const addDocumentImage = async (req, res) => {
  const params = req.body;

  // eslint-disable-next-line no-console
  console.log(`${params.operationId} adding ${params.side}`);
  try {
    const addImageMethod =
      params.side === 'selfie' ? vusService.addSelfie : vusService.addImage;
    const response = await addImageMethod(params);

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    await AuthRequestService.update(
      Constants.AUTHENTICATION_REQUEST.FAILED,
      Messages.VUS.ADD_IMAGE.message,
      params.operationId,
    );
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = {
  addDocumentImage,
};
