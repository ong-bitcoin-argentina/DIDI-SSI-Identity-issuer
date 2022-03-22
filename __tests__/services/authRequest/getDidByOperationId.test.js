const {
  getDidByOperationId,
} = require('../../../src/services/AuthRequestService');

const { beforeAllHook, afterAllHook } = require('./utils');

const { missingOperationId } = require('../../../src/constants/serviceErrors');
const { authRequestData } = require('./constants');

describe('services/AuthRequest/getDidByOperationId.test.js', () => {
  beforeAll(beforeAllHook);
  afterAll(afterAllHook);
  it('expect getDidByOperationId to throw on missing operationId', async () => {
    expect.assertions(1);
    try {
      await getDidByOperationId({ operationId: undefined });
    } catch (e) {
      expect(e.code).toMatch(missingOperationId.code);
    }
  });

  it('expect getDidByOperationId to get', async () => {
    expect.assertions(1);
    const result = await getDidByOperationId({
      operationId: authRequestData.operationId,
    });
    expect(result).toMatch(authRequestData.did);
  });
});
