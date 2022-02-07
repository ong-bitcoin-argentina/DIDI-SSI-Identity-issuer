const vusService = require('../../services/vusService');

const addImage = async (req, res) => {
  const { operationId, userName, file, side } = req.body;

  // eslint-disable-next-line no-console
  console.log(`${operationId} adding ${side} dni data`);

  try {
    const image = await vusService.addImage(operationId, userName, file, side);
    return res.status(200).json({ image });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  addImage,
};
