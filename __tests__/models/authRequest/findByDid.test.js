const AuthRequest = require('../../../src/models/AuthRequest');

const {
  beforeAllHook,
  afterAllHook,
} = require('../../services/authRequest/utils');
const { authRequestData } = require('../../services/authRequest/constants');
const { missingDid } = require('../../../src/constants/serviceErrors');

describe('models/AuthRequest/create', () => {
  beforeAll(beforeAllHook);
  afterAll(afterAllHook);
  const { did, operationId } = authRequestData;

  it('expect findByDid to find', async () => {
    expect.assertions(2);
    const result = await AuthRequest.findByDid(did);
    expect(result.operationId).toBe(operationId);
    expect(result.status).toBe('In Progress');
  });

  it('expect findByDid to throw missing did', async () => {
    expect.assertions(2);
    try {
      await AuthRequest.findByDid(undefined);
    } catch (error) {
      expect(error.code).toBe(missingDid.code);
      expect(error.message).toBe(missingDid.message);
    }
  });
});
