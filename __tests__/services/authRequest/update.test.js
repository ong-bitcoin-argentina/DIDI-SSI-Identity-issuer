const { update } = require('../../../src/services/AuthRequestService');

const { beforeAllHook, afterAllHook } = require('./utils');

const { missingStatus } = require('../../../src/constants/serviceErrors');
const { authRequestData } = require('./constants');
const Messages = require('../../../src/constants/Messages');
const Constants = require('../../../src/constants/Constants');

describe('services/AuthRequest/update.test.js', () => {
  beforeAll(beforeAllHook);
  afterAll(afterAllHook);
  it('expect update to throw on missing status', async () => {
    expect.assertions(2);
    try {
      await update({ status: undefined });
    } catch (error) {
      expect(error.code).toBe(missingStatus.code);
      expect(error.message).toBe(missingStatus.message);
    }
  });

  it('expect update to update', async () => {
    expect.assertions(3);
    const { did, operationId, status } = await update({
      status: Constants.AUTHENTICATION_REQUEST.CANCELLED,
      errorMessage: Messages.VUS.CANCEL_OPERATION.message,
      operationId: authRequestData.operationId,
    });
    expect(did).toBe(authRequestData.did);
    expect(operationId).toBe(authRequestData.operationId);
    expect(status).toBe('Cancelled');
  });
});

describe('services/AuthRequest/update fail', () => {
  it('expect update to throw on missing status', async () => {
    expect.assertions(1);
    try {
      await update({
        status: Constants.AUTHENTICATION_REQUEST.CANCELLED,
        errorMessage: Messages.VUS.CANCEL_OPERATION.message,
        operationId: authRequestData.operationId,
      });
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });
});
