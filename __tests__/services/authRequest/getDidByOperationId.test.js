const mongoose = require('mongoose');
const AuthRequestModel = require('../../../src/models/AuthRequest');

const {
  getDidByOperationId,
} = require('../../../src/services/AuthRequestService');

const { missingOperationId } = require('../../../src/constants/serviceErrors');

const { MONGO_URI } = require('../../../src/constants/Constants');
const { authRequestData } = require('./constants');

describe('services/AuthRequest/getDidByOperationId.test.js', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await AuthRequestModel.generate(
      authRequestData.operationId,
      authRequestData.did,
    );
  });
  afterAll(async () => {
    await AuthRequestModel.deleteOne({ did: authRequestData.did });
    await mongoose.connection.close();
  });

  it('expect getDidByOperationId to throw on missing operationId', async () => {
    expect.assertions(1);
    try {
      await getDidByOperationId(undefined);
    } catch (e) {
      expect(e.code).toMatch(missingOperationId.code);
    }
  });

  it('expect getDidByOperationId to get', async () => {
    expect.assertions(1);
    const result = await getDidByOperationId(authRequestData.operationId);
    expect(result).toMatch(authRequestData.did);
  });
});
