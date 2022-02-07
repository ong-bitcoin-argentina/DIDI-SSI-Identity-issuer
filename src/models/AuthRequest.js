const mongoose = require('mongoose');
const Constants = require('../constants/Constants');

const { IN_PROGRESS, SUCCESSFUL, FALIED, CANCELLED } =
  Constants.AUTHENTICATION_REQUEST;

const statuses = [IN_PROGRESS, SUCCESSFUL, FALIED, CANCELLED];

// Registra la informacion de un pedido de validacion de identidad contra VU Security
const AuthRequestSchema = new mongoose.Schema({
  operationId: {
    type: String,
    required: true,
  },
  did: {
    type: String,
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
    return this;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return err;
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
    return err;
  }
};

// retorna el pedido buscandolo por 'operationId'
AuthRequest.findByOperationId = async function findByOperationId(operationId) {
  try {
    const query = { operationId };
    const request = await AuthRequest.findOne(query);
    return request;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return err;
  }
};

// retorna el pedido buscandolo por 'did' y successful
AuthRequest.findByDid = async function findByDid(did) {
  const query = { did, status: 'Successful' };
  const request = await AuthRequest.findOne(query);
  return request;
};
