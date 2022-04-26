const mongoose = require('mongoose');
const { get, del } = require('../services/RedisService');

const Constants = require('../constants/Constants');
const {
  missingOperationId,
  missingDid,
} = require('../constants/serviceErrors');

const { IN_PROGRESS, SUCCESSFUL, FAILED, CANCELLED } =
  Constants.AUTHENTICATION_REQUEST;

const statuses = [IN_PROGRESS, SUCCESSFUL, FAILED, CANCELLED];

// Registra la informacion de un pedido de validacion de identidad contra VU Security
const AuthRequestSchema = new mongoose.Schema({
  operationId: {
    type: String,
    required: true,
  },
  did: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: statuses,
    required: true,
  },
  errorMessage: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

AuthRequestSchema.index({ operationId: 1 });

// actualizar estado del pedido
AuthRequestSchema.methods.update = async function update(status, errorMessage) {
  try {
    this.status = status;
    if (errorMessage) this.errorMessage = errorMessage;
    await this.save();
    // BUSCO SI ESTA ALMACENADO EN CACHE
    const searchTerm = `getStatus-${this.did}`;
    const term = JSON.parse(await get(searchTerm));
    if (term) await del(searchTerm);
    return this;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw err;
  }
};

// retorna el did del usuario a validar
AuthRequestSchema.methods.getDid = async function getDid() {
  return this.did;
};

const AuthRequest = mongoose.model('AuthRequest', AuthRequestSchema);
module.exports = AuthRequest;

// inicailizar registro de un pedido nuevo
AuthRequest.generate = async function generate(operationId, did) {
  if (!operationId) throw missingOperationId;
  if (!did) throw missingDid;
  try {
    let request = new AuthRequest();
    request.operationId = operationId;
    request.did = did;
    request.status = IN_PROGRESS;
    request.createdOn = new Date();

    request = await request.save();
    return request;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw err;
  }
};

// retorna el pedido buscandolo por 'operationId'
AuthRequest.findByOperationId = async function findByOperationId(operationId) {
  if (!operationId) throw missingOperationId;
  try {
    return AuthRequest.findOne({ operationId });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw err;
  }
};

// retorna el pedido buscandolo por 'did' y successful
AuthRequest.findByDid = async function findByDid(did) {
  if (!did) throw missingDid;
  try {
    return await AuthRequest.findOne({ did });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};
