/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const vusService = require('../../services/vusService');
const UserService = require('../../services/userService');
const AuthRequestService = require('../../services/AuthRequestService');
const Messages = require('../../constants/Messages');
const Constants = require('../../constants/Constants');
const { missingUserName } = require('../../constants/serviceErrors');

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
    return res.status(200).send('Creado Satisfactoriamente');
    // eslint-disable-next-line prefer-template
  } catch (err) {
    return err;
  }
};

const cancelVerification = async (req, res) => {
  const { operationId } = req.body;
  const { userName } = req.body;
  let authRequest;
  let cancelRequest;
  try {
    // verificar si la operacion esta pendiente
    authRequest = await AuthRequestService.getByOperationId(operationId);
    if (authRequest.status === 'In Progress') {
      cancelRequest = await vusService.cancelOperation(userName, operationId);
      authRequest = await AuthRequestService.update(
        Constants.AUTHENTICATION_REQUEST.CANCELLED,
        Messages.VUS.CANCEL_OPERATION,
      );
    }
    return res.status(200).send(Messages.VUS.CANCEL_OPERATION);
  } catch (error) {
    return error;
  }
};

module.exports = {
  createVerification,
  cancelVerification,
};
