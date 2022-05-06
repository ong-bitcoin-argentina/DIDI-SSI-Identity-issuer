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

  it('expect findByDid to find the last register added', async () => {
    expect.assertions(2);
    await AuthRequest.generate('1', '1');
    await AuthRequest.generate('2', '1');
    await AuthRequest.generate('3', '1');
    const result = await AuthRequest.findByDid('1');
    expect(result.operationId).toBe('3');
    expect(result.did).toBe('1');
    await AuthRequest.deleteMany({ did: '1' });
  });
});
