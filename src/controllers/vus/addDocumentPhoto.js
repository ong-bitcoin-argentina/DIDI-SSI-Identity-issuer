const vusService = require('../../services/vusService');

const addDocumentPhoto = async (req, res) => {
  const { operationId, userName, file } = req.body;

  // eslint-disable-next-line no-console
  console.log(`${operationId} adding photo from identification data`);

  try {
    const imageDocument = await vusService.addDocumentImage(
      operationId,
      userName,
      file,
    );
    return res.status(200).json(imageDocument);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addDocumentPhoto,
};
