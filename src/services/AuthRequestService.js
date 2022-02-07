const Messages = require('../constants/Messages');
const AuthRequest = require('../models/AuthRequest');
const {
  missingOperationId,
  missingStatus,
} = require('../constants/serviceErrors');

/**
 *  Crea y guarda pedido de validación de identidad
 */
module.exports.create = async function create(operationId) {
  if (!operationId) throw missingOperationId;
  try {
    const authRequest = await AuthRequest.generate(operationId);
    if (!authRequest) return Messages.VUS.CREATE;
    return authRequest;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Messages.COMMUNICATION_ERROR;
  }
};

/**
 *  Obtiene el pedido de validación a partir del código de operación
 */
module.exports.getByOperationId = async function getByOperationId(operationId) {
  if (!operationId) throw missingOperationId;
  try {
    const authRequest = await AuthRequest.findByOperationId(operationId);
    if (!authRequest) return Messages.VUS.GET;
    return authRequest;
  } catch (err) {
    throw Messages.COMMUNICATION_ERROR;
  }
};

/**
 *  Actualiza el pedido de validación
 */
module.exports.update = async function update(
  status,
  errorMessage,
  operationId,
) {
  if (!status) throw missingStatus;
  try {
    let authRequest = await AuthRequest.findByOperationId(operationId);
    if (!authRequest) return Messages.VUS.GET;
    authRequest = await authRequest.update(status, errorMessage);
    if (!authRequest) return Messages.VUS.UPDATE;
    return authRequest;
  } catch (err) {
    throw Messages.COMMUNICATION_ERROR;
  }
};
