jest.mock('node-fetch');

const fetch = require('node-fetch');
const { addDocumentImage } = require('../../../src/services/vusService');
const {
  missingOperationId,
  missingUserName,
  missingFile,
} = require('../../../src/constants/serviceErrors');

const { successRespDocumentImage } = require('../mock/constants');

describe('services/vus/addDocumentImage.test.js', () => {
  it('expect addDocumentImage OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successRespDocumentImage));
    const response = await addDocumentImage('operationId', 'userName', 'file');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(successRespDocumentImage.json());
  });
  it('expect addDocumentImage to throw missing OperationId', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addDocumentImage(undefined, 'userName', 'file')),
    ).rejects.toBe(missingOperationId);
  });
  it('expect addDocumentImage to throw missing userName', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addDocumentImage('operationId', undefined, 'file')),
    ).rejects.toBe(missingUserName);
  });
  it('expect addDocumentImage to throw missing File', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addDocumentImage('operationId', 'userName', undefined)),
    ).rejects.toBe(missingFile);
  });
});
