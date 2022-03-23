const AuthRequest = require('../../../src/models/AuthRequest');

const {
  beforeAllHook,
  afterAllHook,
} = require('../../services/authRequest/utils');
const { authRequestData } = require('../../services/authRequest/constants');
const { missingOperationId } = require('../../../src/constants/serviceErrors');

describe('models/AuthRequest/findByOperationId', () => {
  beforeAll(beforeAllHook);
  afterAll(afterAllHook);
  const { did, operationId } = authRequestData;

  it('expect findByOperationId to find', async () => {
    expect.assertions(3);
    const result = await AuthRequest.findByOperationId(operationId);
    expect(result.operationId).toBe(operationId);
    expect(result.did).toBe(did);
    expect(result.status).toBe('In Progress');
  });

  it('expect findByOperationId to throw missing operationId', async () => {
    expect.assertions(2);
    try {
      await AuthRequest.findByOperationId(undefined);
    } catch (error) {
      expect(error.code).toBe(missingOperationId.code);
      expect(error.message).toBe(missingOperationId.message);
    }
  });
});
