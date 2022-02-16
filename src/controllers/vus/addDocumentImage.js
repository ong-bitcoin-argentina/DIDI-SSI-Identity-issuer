const vusService = require('../../services/vusService');

const addDocumentImage = async (req, res) => {
  const params = req.body;

  // eslint-disable-next-line no-console
  console.log(`${params.operationId} adding ${params.side}`);
  try {
    const addImageMethod =
      params.side === 'selfie' ? vusService.addSelfie : vusService.addImage;
    const image = await addImageMethod(params);
    return res.status(200).json(image);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addDocumentImage,
};
