const mongoose = require('mongoose');
const AuthRequest = require('../../../src/models/AuthRequest');

const { afterAllHook } = require('../../services/authRequest/utils');
const { authRequestData } = require('../../services/authRequest/constants');
const {
  missingOperationId,
  missingDid,
} = require('../../../src/constants/serviceErrors');
const { MONGO_URI } = require('../../../src/constants/Constants');

describe('models/AuthRequest/generate', () => {
  beforeAll(async () => {
    mongoose.connect(MONGO_URI);
  });
  afterAll(afterAllHook);
  const { did, operationId } = authRequestData;

  it('expect generate to generate', async () => {
    expect.assertions(3);
    const result = await AuthRequest.generate(operationId, did);
    expect(result.operationId).toBe(operationId);
    expect(result.did).toBe(did);
    expect(result.status).toBe('In Progress');
  });

  it('expect generate to throw missing operationId', async () => {
    expect.assertions(2);
    try {
      await AuthRequest.generate(undefined, did);
    } catch (error) {
      expect(error.code).toBe(missingOperationId.code);
      expect(error.message).toBe(missingOperationId.message);
    }
  });

  it('expect generate to throw missing did', async () => {
    expect.assertions(2);
    try {
      await AuthRequest.generate(operationId, undefined);
    } catch (error) {
      expect(error.code).toBe(missingDid.code);
      expect(error.message).toBe(missingDid.message);
    }
  });
});
