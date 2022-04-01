const {
  getByOperationId,
} = require('../../../src/services/AuthRequestService');

const { beforeAllHook, afterAllHook } = require('./utils');

const { missingOperationId } = require('../../../src/constants/serviceErrors');
const { authRequestData } = require('./constants');
const Messages = require('../../../src/constants/Messages');

describe('services/AuthRequest/getByOperationId.test.js', () => {
  beforeAll(beforeAllHook);
  afterAll(afterAllHook);
  it('expect getByOperationId to throw on missing operationId', async () => {
    expect.assertions(1);
    try {
      await getByOperationId({ operationId: undefined });
    } catch (e) {
      expect(e.code).toBe(missingOperationId.code);
    }
  });

  it('expect getByOperationId to throw cannot get', async () => {
    expect.assertions(1);
    const result = await getByOperationId({ operationId: 'hola' });
    expect(result).toBe(Messages.VUS.GET);
  });

  it('expect getByOperationId to get', async () => {
    expect.assertions(3);
    authRequestData.status = 'In Progress';
    const result = await getByOperationId({
      operationId: authRequestData.operationId,
    });
    expect(result.did).toBe(authRequestData.did);
    expect(result.operationId).toBe(authRequestData.operationId);
    expect(result.status).toBe(authRequestData.status);
  });
});

describe('services/AuthRequest/getByOperationId fail', () => {
  it('expect getByOperationId to fail', async () => {
    expect.assertions(1);
    try {
      await getByOperationId({
        operationId: authRequestData.operationId,
      });
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });
});
