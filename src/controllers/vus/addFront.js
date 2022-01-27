const vusService = require('../../services/vusService');
const Messages = require('../../constants/Messages');
const Constants = require('../../constants/Constants');
const authRequest = require('../../services/AuthRequestService');

const frontImage = async (req, res) => {
  const { operationId, userName, file } = req.body;

  // eslint-disable-next-line no-console
  console.log(`${operationId} adding dni front data`);

  let image;
  try {
    image = await vusService.addFront(operationId, userName, true, true, file);
    if (image.message.includes('fail')) {
      authRequest.update(
        Constants.AUTHENTICATION_REQUEST.FALIED,
        Messages.VUS.WEAK_MATCH_FRONT.message,
        operationId,
      );
      return res.send(Messages.VUS.WEAK_MATCH_FRONT.message);
    }
    return res.status(200).json({ image });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  frontImage,
};
