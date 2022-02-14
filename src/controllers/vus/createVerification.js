const vusService = require('../../services/vusService');
const AuthRequestService = require('../../services/AuthRequestService');

const createVerification = async (req, res) => {
  const params = req.body;
  try {
    // Iniciar pedido de validación de identidad con vu security endpoint New Operation
    const response = await vusService.newOperation(params);

    // Guardar estado como "en progreso y retornar"
    await AuthRequestService.create(response.operationId, params.did);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createVerification,
};
