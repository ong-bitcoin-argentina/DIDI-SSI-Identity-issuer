const mongoose = require('mongoose');
const AuthRequestModel = require('../../../src/models/AuthRequest');

const { verifyStatus } = require('../../../src/services/AuthRequestService');
const {
  missingStatus,
  missingOperationId,
} = require('../../../src/constants/serviceErrors');

const { MONGO_URI } = require('../../../src/constants/Constants');
const { authRequestData } = require('./constants');

describe('services/AuthRequest/verifyStatus.test.js', () => {
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

  it('expect verifyStatus to throw on missing operationId', async () => {
    expect.assertions(1);
    try {
      await verifyStatus(undefined, 'status');
    } catch (e) {
      expect(e.code).toMatch(missingOperationId.code);
    }
  });

  it('expect verifyStatus to throw on missing status', async () => {
    expect.assertions(1);
    try {
      await verifyStatus('operationId', undefined);
    } catch (e) {
      expect(e.code).toMatch(missingStatus.code);
    }
  });
  it('expect verifyStatus to be false', async () => {
    expect.assertions(1);
    const result = await verifyStatus(
      authRequestData.operationId,
      authRequestData.status,
    );
    expect(result).toBe(false);
  });
  it('expect verifyStatus to be true', async () => {
    expect.assertions(1);
    const result = await verifyStatus(
      authRequestData.operationId,
      'In Progress',
    );
    expect(result).toBe(true);
  });
});
