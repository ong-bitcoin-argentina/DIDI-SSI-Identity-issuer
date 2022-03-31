const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');

const ResponseHandler = require('../../utils/ResponseHandler');

const createVerification = async (req, res) => {
  const params = req.body;
  try {
    // Iniciar pedido de validación de identidad con vu security endpoint New Operation
    const response = await vusService.newOperation(params);

    // Guardar estado como "en progreso y retornar"
    await AuthRequestService.create({
      operationId: response.operationId,
      did: params.did,
    });

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = {
  createVerification,
};
