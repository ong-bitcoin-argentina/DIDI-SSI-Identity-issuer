const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');
const { get, set } = require('../../services/RedisService');

const ResponseHandler = require('../../utils/ResponseHandler');

const createVerification = async (req, res) => {
  const params = req.body;
  try {
    const searchTerm = `create-verification-${params.did}`;
    let response = JSON.parse(await get(searchTerm));

    if (!response) {
      // Iniciar pedido de validación de identidad con vu security endpoint New Operation
      response = await vusService.newOperation(params);

      // Guardar estado como "en progreso y retornar"
      await AuthRequestService.create(response.operationId, params.did);
      await set(searchTerm, JSON.stringify(response));
    }

    return ResponseHandler.sendRes(res, response);
  } catch (error) {
    return ResponseHandler.sendErrWithStatus(res, error);
  }
};

module.exports = {
  createVerification,
};
