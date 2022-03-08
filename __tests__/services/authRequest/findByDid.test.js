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
      await findByDid(undefined);
    } catch (e) {
      expect(e.code).toMatch(missingDid.code);
    }
  });

  it('expect findByDid to find', async () => {
    expect.assertions(1);
    const res = JSON.parse(await findByDid(authRequestData.did));
    expect(res.operationId).toBe(authRequestData.operationId);
  });
});
