const Messages = require('../constants/Messages');
const AuthRequest = require('../models/AuthRequest');
const {
  missingOperationId,
  missingUserDID,
} = require('../constants/serviceErrors');

/**
 *  Crea y guarda pedido de validación de identidad
 */
module.exports.create = async function create(operationId, userDID) {
  if (!operationId) throw missingOperationId;
  if (!userDID) throw missingUserDID;
  try {
    const authRequest = await AuthRequest.generate(operationId, userDID);
    if (!authRequest) return Promise.reject(Messages.RENAPER.CREATE);
    return Promise.resolve(authRequest);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(Messages.COMMUNICATION_ERROR);
  }
};
