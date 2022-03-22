const {
  getByOperationId,
} = require('../../../src/services/AuthRequestService');

const { beforeAllHook, afterAllHook } = require('./utils');

const { missingOperationId } = require('../../../src/constants/serviceErrors');
const { authRequestData } = require('./constants');

describe('services/AuthRequest/getByOperationId.test.js', () => {
  beforeAll(beforeAllHook);
  afterAll(afterAllHook);
  it('expect getByOperationId to throw on missing operationId', async () => {
    expect.assertions(1);
    try {
      await getByOperationId({ operationId: undefined });
    } catch (e) {
      expect(e.code).toMatch(missingOperationId.code);
    }
  });

  it('expect getByOperationId to get', async () => {
    expect.assertions(3);
    authRequestData.status = 'In Progress';
    const result = await getByOperationId({
      operationId: authRequestData.operationId,
    });
    expect(result.did).toMatch(authRequestData.did);
    expect(result.operationId).toMatch(authRequestData.operationId);
    expect(result.status).toMatch(authRequestData.status);
  });
});
