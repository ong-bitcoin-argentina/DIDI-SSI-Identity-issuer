const fetchMock = require('fetch-mock');
const { addFront } = require('../../../src/services/vusService');
const {
  missingOperationId,
  missingUserName,
  missingFile,
} = require('../../../src/constants/serviceErrors');
const { VUS_URLS } = require('../../../src/constants/Constants');

describe('services/vus/addFront.test.js', () => {
  it('expect addFront OK', async () => {
    expect.assertions(0);
    fetchMock.post(VUS_URLS.addFront, {
      image: {
        code: 0,
        message: 'Add front success',
        detectedCountry: 'pais',
        detectedCountryId: 1,
        detectedDocumentCountryId: 1,
        detectedDocumentCountry: 'Pais',
        addBackRequired: true,
        addDocumentPictureRequired: true,
        documentPictureDetected: true,
        containsBarcode: true,
        barcodeDetected: true,
      },
    });
    fetchMock.reset();
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
