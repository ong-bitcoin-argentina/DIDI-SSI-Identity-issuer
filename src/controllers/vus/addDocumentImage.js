const vusService = require('../../services/vusService');

const addDocumentImage = async (req, res) => {
  const { operationId, userName, file } = req.body;

  // eslint-disable-next-line no-console
  console.log(`${operationId} adding image dni front data`);

  try {
    const imageDocument = await vusService.addDocumentImage(
      operationId,
      userName,
      file,
    );
    return res.status(200).send(imageDocument);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  addDocumentImage,
};
