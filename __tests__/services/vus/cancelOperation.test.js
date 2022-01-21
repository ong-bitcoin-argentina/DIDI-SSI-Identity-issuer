const {
  missingOperationId,
  missingUserName,
} = require('../../../src/constants/serviceErrors');
const { cancelOperation } = require('../../../src/services/vusService');

describe('services/vus/newOperation.test.js', () => {
  it('expect cancelOperation to throw missing userName', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(cancelOperation(undefined, 'operationId')),
    ).rejects.toBe(missingUserName);
  });
  it('expect cancelOperation to throw missing operationId', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(cancelOperation('userName', undefined)),
    ).rejects.toBe(missingOperationId);
  });
});
