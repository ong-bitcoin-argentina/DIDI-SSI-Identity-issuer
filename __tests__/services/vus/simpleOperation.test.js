jest.mock('node-fetch');
const fetch = require('node-fetch');

const { simpleOperation } = require('../../../src/services/vusService');

const { simpleOperationParams } = require('./constants');
const {
  missingOperationId,
  missingUserName,
} = require('../../../src/constants/serviceErrors');
const {
  successRespCancelOperation,
  failResponse,
} = require('../mock/constants');

describe('services/vus/simpleOperation.test.js', () => {
  // CASOS SIMPLES EXITOSOS
  it('expect cancelOperation OK', async () => {
    expect.assertions(1);
    fetch.mockReturnValue(Promise.resolve(successRespCancelOperation));
    const response = await simpleOperation(simpleOperationParams, 'cancel');
    expect(response).toStrictEqual(successRespCancelOperation.json());
  });

  // CASOS SIMPLES NO EXITOSOS
  it('expect cancelOperation FAIL', async () => {
    expect.assertions(0);
    fetch.mockReturnValue(Promise.resolve(failResponse));
    try {
      await simpleOperation(simpleOperationParams, 'cancel');
    } catch (error) {
      expect(error).toBe(failResponse);
    }
  });
  it('expect simpleOperation to throw missing operationId', async () => {
    expect.assertions(1);
    simpleOperationParams.operationId = undefined;
    await expect(simpleOperation(simpleOperationParams, 'finish')).rejects.toBe(
      missingOperationId,
    );
  });
  it('expect simpleOperation to throw missing userName', async () => {
    expect.assertions(1);
    simpleOperationParams.operationId = 'operationId';
    simpleOperationParams.userName = undefined;
    await expect(simpleOperation(simpleOperationParams, 'finish')).rejects.toBe(
      missingUserName,
    );
  });
});
