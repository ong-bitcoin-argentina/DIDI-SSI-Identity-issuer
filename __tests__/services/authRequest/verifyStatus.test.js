const { verifyStatus } = require('../../../src/services/AuthRequestService');

const { beforeAllHook, afterAllHook } = require('./utils');

const {
  missingStatus,
  missingOperationId,
} = require('../../../src/constants/serviceErrors');
const { authRequestData } = require('./constants');

describe('services/AuthRequest/verifyStatus.test.js', () => {
  beforeAll(beforeAllHook);
  afterAll(afterAllHook);

  it('expect verifyStatus to throw on missing operationId', async () => {
    expect.assertions(1);
    try {
      await verifyStatus({ operationId: undefined, status: 'status' });
    } catch (e) {
      expect(e.code).toMatch(missingOperationId.code);
    }
  });

  it('expect verifyStatus to throw on missing status', async () => {
    expect.assertions(1);
    try {
      await verifyStatus({ operationId: 'operationId', status: undefined });
    } catch (e) {
      expect(e.code).toMatch(missingStatus.code);
    }
  });
  it('expect verifyStatus to be false', async () => {
    expect.assertions(1);
    const result = await verifyStatus(authRequestData);
    expect(result).toBe(false);
  });
  it('expect verifyStatus to be true', async () => {
    expect.assertions(1);
    const result = await verifyStatus({
      operationId: authRequestData.operationId,
      status: 'In Progress',
    });
    expect(result).toBe(true);
  });
});
