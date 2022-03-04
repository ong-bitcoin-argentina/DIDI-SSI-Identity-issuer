jest.mock('node-fetch');
const fetch = require('node-fetch');

const { addImage } = require('../../../src/services/vusService');

const { addImageParams } = require('./constants');
const {
  successRespAddBack,
  successRespAddFront,
} = require('../mock/constants');
const {
  missingOperationId,
  missingUserName,
  missingFile,
  missingSide,
} = require('../../../src/constants/serviceErrors');

describe('services/vus/addImage.test.js', () => {
  it('expect addBack OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successRespAddBack));
    const response = await addImage(addImageParams);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(successRespAddBack.json());
  });
  it('expect addFront OK', async () => {
    expect.assertions(2);
    addImageParams.side = 'front';
    fetch.mockReturnValue(Promise.resolve(successRespAddFront));
    const response = await addImage(addImageParams);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(successRespAddFront.json());
  });
  it('expect addImage to throw missing OperationId', async () => {
    expect.assertions(1);
    addImageParams.operationId = undefined;
    await expect(addImage(addImageParams)).rejects.toBe(missingOperationId);
  });
  it('expect addImage to throw missing userName', async () => {
    expect.assertions(1);
    addImageParams.operationId = 'operationId';
    addImageParams.userName = undefined;
    await expect(addImage(addImageParams)).rejects.toBe(missingUserName);
  });
  it('expect addImage to throw missing File', async () => {
    expect.assertions(1);
    addImageParams.userName = 'userName';
    addImageParams.file = undefined;
    await expect(addImage(addImageParams)).rejects.toBe(missingFile);
  });
  it('expect addImage to throw missing Side', async () => {
    expect.assertions(1);
    addImageParams.file = 'file';
    addImageParams.side = undefined;
    await expect(addImage(addImageParams)).rejects.toBe(missingSide);
  });
});
