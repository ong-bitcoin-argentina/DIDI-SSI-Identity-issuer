const vusService = require('../../services/vusService');

const finishOperation = async (req, res) => {
  const params = req.body;
  try {
    const endOperation = await vusService.endOperation(params);
    return res.status(200).json(endOperation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { finishOperation };
