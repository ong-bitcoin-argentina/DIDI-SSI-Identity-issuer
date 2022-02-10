const vusService = require('../../services/vusService');
const Messages = require('../../constants/Messages');

const addDocumentImage = async (req, res) => {
  const { operationId, userName, file, side } = req.body;

  if (side === 'selfie') {
    // eslint-disable-next-line no-console
    console.log(`${operationId} adding selfie`);

    try {
      const image = await vusService.addSelfie(operationId, userName, file);
      return res.status(200).json(image);
    } catch (error) {
      return res.status(500).json(Messages.VUS.ADD_SELFIE);
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(`${operationId} adding ${side} identification data`);

    try {
      const image = await vusService.addImage(
        operationId,
        userName,
        file,
        side,
      );
      return res.status(200).json(image);
    } catch (error) {
      return res.status(500).json(Messages.VUS.ADD_IMAGE);
    }
  }
};

module.exports = {
  addDocumentImage,
};
