const fetchMock = require('fetch-mock');
const { addDocumentImage } = require('../../../src/services/vusService');
const {
  missingOperationId,
  missingUserName,
  missingFile,
} = require('../../../src/constants/serviceErrors');
const { VUS_URLS } = require('../../../src/constants/Constants');

describe('services/vus/addDocumentImage.test.js', () => {
  it('expect addDocumentImage OK', async () => {
    expect.assertions(0);
    fetchMock.post(VUS_URLS.addDocumentImage, {
      imageDocument: {
        code: 937,
        message: 'Add document image success',
      },
    });
    fetchMock.reset();
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
