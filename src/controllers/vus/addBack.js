const vusService = require('../../services/vusService');

const backImage = async (req, res) => {
  const { operationId, userName, file } = req.body;

  // eslint-disable-next-line no-console
  console.log(`${operationId} adding dni back data`);

  try {
    const image = await vusService.addBack(
      operationId,
      userName,
      true,
      true,
      file,
    );
    return res.status(200).json({ image });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  backImage,
};
