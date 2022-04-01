const mongoose = require('mongoose');
const AuthRequestModel = require('../../../src/models/AuthRequest');

const AuthRequestService = require('../../../src/services/AuthRequestService');

const { authRequestData } = require('./constants');
const { MONGO_URI } = require('../../../src/constants/Constants');

const beforeAllHook = async () => {
  mongoose.connect(MONGO_URI);
  await AuthRequestService.create(authRequestData);
};

const afterAllHook = async () => {
  await AuthRequestModel.deleteOne({ did: authRequestData.did });
  await mongoose.connection.close();
};

module.exports = {
  beforeAllHook,
  afterAllHook,
};
