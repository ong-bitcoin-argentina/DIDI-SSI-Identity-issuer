const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');
const Constants = require('../../constants/Constants');

const createVerification = async (req, res) => {
  let operationId;
  let authRequest;

  try {
    const {
      did,
      userName,
      deviceHash,
      rooted,
      operativeSystem,
      operativeSystemVersion,
      deviceManufacturer,
      deviceName,
    } = req.body;
    // Iniciar pedido de validación de identidad con vu security endpoint New Operation
    operationId = await vusService.newOperation(
      userName,
      Constants.IP_ADDRESS,
      deviceHash,
      rooted,
      Constants.VERSION_APP,
      operativeSystem,
      operativeSystemVersion,
      deviceManufacturer,
      deviceName,
    );

    // Guardar estado como "en progreso y retornar"
    // eslint-disable-next-line no-unused-vars
    authRequest = await AuthRequestService.create(operationId, did);
    return res.status(200).json({ userName, operationId });
  } catch (err) {
    return err;
  }
};

module.exports = {
  createVerification,
};
