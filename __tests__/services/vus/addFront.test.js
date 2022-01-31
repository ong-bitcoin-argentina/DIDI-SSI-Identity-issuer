jest.mock('node-fetch');

const fetch = require('node-fetch');
const { addFront } = require('../../../src/services/vusService');
const {
  missingOperationId,
  missingUserName,
  missingFile,
} = require('../../../src/constants/serviceErrors');
const { successRespAddFront } = require('../mock/constants');

describe('services/vus/addFront.test.js', () => {
  it('expect addFront OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successRespAddFront));
    const response = await addFront(
      'operationId',
      'userName',
      true,
      true,
      'file',
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(successRespAddFront.json());
  });
  it('expect addFront to throw missing OperationId', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addFront(undefined, 'userName', true, true, 'file')),
    ).rejects.toBe(missingOperationId);
  });
  it('expect addFront to throw missing userName', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addFront('operationId', undefined, true, true, 'file')),
    ).rejects.toBe(missingUserName);
  });
  it('expect addFront to throw missing File', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        addFront('operationId', 'userName', true, true, undefined),
      ),
    ).rejects.toBe(missingFile);
  });
});
