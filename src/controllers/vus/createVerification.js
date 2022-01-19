const vusService = require('../../services/vusService');
const UserService = require('../../services/userService');
const AuthRequestService = require('../../services/AuthRequestService');

const createVerification = async (req, res) => {
  const { did } = req.body;

  const { userName } = req.body;
  const { ipAddress } = req.body;
  const { deviceHash } = req.body;
  const { rooted } = req.body;
  const { applicationVersion } = req.body;
  const { operativeSystem } = req.body;
  const { operativeSystemVersion } = req.body;
  const { deviceManufacturer } = req.body;
  const { deviceName } = req.body;

  let operationId;
  let user;
  let authRequest;
  try {
    // Iniciar pedido de validación de identidad con vu security endpoint New Operation
    operationId = await vusService.newOperation(
      userName,
      ipAddress,
      deviceHash,
      rooted,
      applicationVersion,
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

    // eslint-disable-next-line prefer-template
    return res.status(200).send('New operation successfuly');
  } catch (err) {
    return err;
  }
};

module.exports = {
  createVerification,
};
