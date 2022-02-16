jest.mock('node-fetch');

const fetch = require('node-fetch');
const {
  missingOperationId,
  missingUserName,
} = require('../../../src/constants/serviceErrors');
const { successRespCancelOperation } = require('../mock/constants');
const { cancelOperation } = require('../../../src/services/vusService');
const { cancelOperationParams } = require('./constants');

describe('services/vus/cancelOperation.test.js', () => {
  it('expect cancelOperation OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successRespCancelOperation));
    const response = await cancelOperation(cancelOperationParams);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(successRespCancelOperation.json());
  });
  it('expect cancelOperation to throw missing userName', async () => {
    expect.assertions(1);
    cancelOperationParams.userName = undefined;
    await expect(cancelOperation(cancelOperationParams)).rejects.toBe(
      missingUserName,
    );
  });
  it('expect cancelOperation to throw missing operationId', async () => {
    expect.assertions(1);
    cancelOperationParams.userName = 'userName';
    cancelOperationParams.operationId = undefined;
    await expect(cancelOperation(cancelOperationParams)).rejects.toBe(
      missingOperationId,
    );
  });
});
