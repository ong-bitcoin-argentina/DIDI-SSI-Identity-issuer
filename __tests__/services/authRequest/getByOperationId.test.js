const mongoose = require('mongoose');
const AuthRequestModel = require('../../../src/models/AuthRequest');

const {
  getByOperationId,
} = require('../../../src/services/AuthRequestService');
const { missingOperationId } = require('../../../src/constants/serviceErrors');

const { MONGO_URI } = require('../../../src/constants/Constants');
const { authRequestData } = require('./constants');

describe('services/AuthRequest/getByOperationId.test.js', () => {
  beforeAll(async () => {
    mongoose.connect(MONGO_URI);
    await AuthRequestModel.generate(
      authRequestData.operationId,
      authRequestData.did,
    );
  });
  afterAll(async () => {
    await AuthRequestModel.deleteOne({ did: authRequestData.did });
    await mongoose.connection.close();
  });

  it('expect getByOperationId to throw on missing operationId', async () => {
    expect.assertions(1);
    try {
      await getByOperationId(undefined);
    } catch (e) {
      expect(e.code).toMatch(missingOperationId.code);
    }
  });

  it('expect getByOperationId to get', async () => {
    expect.assertions(3);
    authRequestData.status = 'In Progress';
    const result = await getByOperationId(authRequestData.operationId);
    expect(result.did).toMatch(authRequestData.did);
    expect(result.operationId).toMatch(authRequestData.operationId);
    expect(result.status).toMatch(authRequestData.status);
  });
});
