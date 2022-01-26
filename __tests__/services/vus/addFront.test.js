const { addFront } = require('../../../src/services/vusService');
const {
  missingOperationId,
  missingUserName,
  missingFile,
} = require('../../../src/constants/serviceErrors');

describe('services/vus/addFront.test.js', () => {
  it('expect cancelOperation to throw missing OperationId', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addFront(undefined, 'userName', 'file')),
    ).rejects.toBe(missingOperationId);
  });
  it('expect cancelOperation to throw missing userName', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addFront('operationId', undefined, 'file')),
    ).rejects.toBe(missingUserName);
  });
  it('expect cancelOperation to throw missing File', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addFront('operationId', 'userName', undefined)),
    ).rejects.toBe(missingFile);
  });
});
