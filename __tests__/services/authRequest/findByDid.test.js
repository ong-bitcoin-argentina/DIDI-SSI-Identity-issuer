const { findByDid } = require('../../../src/services/AuthRequestService');

const { beforeAllHook, afterAllHook } = require('./utils');

const { missingDid } = require('../../../src/constants/serviceErrors');
const { authRequestData } = require('./constants');

describe('services/AuthRequest/findByDid.test.js', () => {
  beforeAll(beforeAllHook);
  afterAll(afterAllHook);
  it('expect findByDid to throw on missing did', async () => {
    expect.assertions(1);
    try {
      await findByDid({ did: undefined });
    } catch (e) {
      expect(e.code).toBe(missingDid.code);
    }
  });

  it('expect findByDid to find', async () => {
    expect.assertions(1);
    const result = JSON.parse(await findByDid({ did: authRequestData.did }));
    expect(result.operationId).toBe(authRequestData.operationId);
  });
});

describe('services/AuthRequest/findByDid fail', () => {
  it('expect findByDid to fail', async () => {
    expect.assertions(1);
    try {
      await findByDid({ did: authRequestData.did });
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });
});
