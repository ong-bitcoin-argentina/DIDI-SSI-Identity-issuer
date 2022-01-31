jest.mock('node-fetch');

const fetch = require('node-fetch');
const { addBack } = require('../../../src/services/vusService');
const {
  missingOperationId,
  missingUserName,
  missingFile,
} = require('../../../src/constants/serviceErrors');
const { successRespAddBack } = require('../mock/constants');

describe('services/vus/addBack.test.js', () => {
  it('expect addBack OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successRespAddBack));
    const response = await addBack(
      'operationId',
      'userName',
      true,
      true,
      'file',
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(successRespAddBack.json());
  });
  it('expect addBack to throw missing OperationId', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addBack(undefined, 'userName', true, true, 'file')),
    ).rejects.toBe(missingOperationId);
  });
  it('expect addBack to throw missing userName', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addBack('operationId', undefined, true, true, 'file')),
    ).rejects.toBe(missingUserName);
  });
  it('expect addBack to throw missing File', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        addBack('operationId', 'userName', true, true, undefined),
      ),
    ).rejects.toBe(missingFile);
  });
});
