jest.mock('node-fetch');

const fetch = require('node-fetch');
const {
  missingOperationId,
  missingUserName,
} = require('../../../src/constants/serviceErrors');
const {
  successRespCancelOperation,
  failResponse,
} = require('../mock/constants');
const { simpleOperation } = require('../../../src/services/vusService');
const { simpleOperationParams } = require('./constants');
const { VUS_URLS } = require('../../../src/constants/Constants');

describe('services/vus/cancelOperation.test.js', () => {
  it('expect cancelOperation OK', async () => {
    expect.assertions(1);
    fetch.mockReturnValue(Promise.resolve(successRespCancelOperation));
    const response = await simpleOperation(
      simpleOperationParams,
      VUS_URLS.CANCEL_OPERATION,
    );
    expect(response).toStrictEqual(successRespCancelOperation.json());
  });
  it('expect cancelOperation FAIL', async () => {
    expect.assertions(0);
    fetch.mockReturnValue(Promise.resolve(failResponse));
    try {
      await simpleOperation(simpleOperationParams, VUS_URLS.CANCEL_OPERATION);
    } catch (error) {
      expect(error).toBe(failResponse);
    }
  });
  it('expect simpleOperation to throw missing operationId', async () => {
    expect.assertions(1);
    simpleOperationParams.operationId = undefined;
    await expect(
      simpleOperation(simpleOperationParams, VUS_URLS.END_OPERATION),
    ).rejects.toBe(missingOperationId);
  });
  it('expect simpleOperation to throw missing userName', async () => {
    expect.assertions(1);
    simpleOperationParams.operationId = 'operationId';
    simpleOperationParams.userName = undefined;
    await expect(
      simpleOperation(simpleOperationParams, VUS_URLS.END_OPERATION),
    ).rejects.toBe(missingUserName);
  });
});
