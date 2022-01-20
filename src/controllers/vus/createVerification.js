const vusService = require('../../services/vusService');
const UserService = require('../../services/userService');
const AuthRequestService = require('../../services/AuthRequestService');
const Constants = require('../../constants/Constants');

const createVerification = async (req, res) => {
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

  let operationId;
  let user;
  let authRequest;

  try {
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

    // Obtener usuario a partir de un did
    user = await UserService.getByDID(did);

    // Guardar estado como "en progreso y retornar"
    // eslint-disable-next-line no-unused-vars
    authRequest = await AuthRequestService.create(operationId, user);
    return res.status(200).json({ userName, operationId });
  } catch (err) {
    return err;
  }
};

module.exports = {
  createVerification,
};
