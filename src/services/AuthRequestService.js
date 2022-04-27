const AuthRequest = require('../models/AuthRequest');

const { logError } = require('./logToConsole');

const Messages = require('../constants/Messages');
const {
  missingOperationId,
  missingStatus,
  missingDid,
} = require('../constants/serviceErrors');

/**
 *  Crea y guarda pedido de validación de identidad
 */
module.exports.create = async function create({ operationId, did }) {
  if (!operationId) throw missingOperationId;
  try {
    const authRequest = await AuthRequest.generate(operationId, did);
    if (!authRequest) throw Messages.VUS.CREATE;
    return authRequest;
  } catch (error) {
    logError(error);
    throw Messages.COMMUNICATION_ERROR;
  }
};

/**
 *  Obtiene el pedido de validación a partir del código de operación
 */
module.exports.getByOperationId = async function getByOperationId({
  operationId,
}) {
  if (!operationId) throw missingOperationId;
  try {
    const authRequest = await AuthRequest.findByOperationId(operationId);
    if (!authRequest) return Messages.VUS.GET;
    return authRequest;
  } catch (error) {
    logError(error);
    throw Messages.COMMUNICATION_ERROR;
  }
};

/**
 *  Actualiza el pedido de validación
 */
module.exports.update = async function update({
  status,
  errorMessage,
  operationId,
}) {
  if (!status) throw missingStatus;
  try {
    let authRequest = await AuthRequest.findByOperationId(operationId);
    if (!authRequest) return Messages.VUS.GET;
    authRequest = await authRequest.update(status, errorMessage);
    if (!authRequest) throw Messages.VUS.UPDATE;
    return authRequest;
  } catch (error) {
    logError(error);
    throw error;
  }
};

module.exports.findByDid = async function findByDid({ did }) {
  if (!did) throw missingDid;
  try {
    const response = await AuthRequest.findByDid(did);
    if (!response) throw Messages.VUS.FIND_BY_ID;
    return response;
  } catch (error) {
    logError(error);
    throw error;
  }
};

module.exports.verifyStatus = async function verifyStatus({
  operationId,
  status,
}) {
  if (!operationId) throw missingOperationId;
  if (!status) throw missingStatus;
  try {
    const authRequest = await AuthRequest.findByOperationId(operationId);
    if (!authRequest) throw Messages.VUS.FIND_BY_ID;
    if (authRequest.status === status) return true;
    return false;
  } catch (error) {
    logError(error);
    throw error;
  }
};

module.exports.getDidByOperationId = async function getDidByOperationId({
  operationId,
}) {
  if (!operationId) throw missingOperationId;
  try {
    const authRequest = await AuthRequest.findByOperationId(operationId);
    if (!authRequest) throw Messages.VUS.FIND_BY_ID;
    return authRequest.did;
  } catch (error) {
    logError(error);
    throw error;
  }
};
