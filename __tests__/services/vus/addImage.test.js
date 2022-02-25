jest.mock('node-fetch');

const fetch = require('node-fetch');
const { addImage } = require('../../../src/services/vusService');
const {
  missingOperationId,
  missingUserName,
  missingFile,
  missingSide,
} = require('../../../src/constants/serviceErrors');
const {
  successRespAddBack,
  successRespAddFront,
} = require('../mock/constants');

const { addBackParams, addFrontParams } = require('./constants');

describe('services/vus/addImage.test.js', () => {
  it('expect addBack OK', async () => {
    expect.assertions(1);
    fetch.mockReturnValue(Promise.resolve(successRespAddBack));
    const response = await addImage(addBackParams);
    expect(response).toStrictEqual(successRespAddBack.json());
  });
  it('expect addFront OK', async () => {
    expect.assertions(1);
    fetch.mockReturnValue(Promise.resolve(successRespAddFront));
    const response = await addImage(addFrontParams);
    expect(response).toStrictEqual(successRespAddFront.json());
  });
  it('expect addImage to throw missing OperationId', async () => {
    expect.assertions(1);
    addBackParams.operationId = undefined;
    await expect(addImage(addBackParams)).rejects.toBe(missingOperationId);
  });
  it('expect addImage to throw missing userName', async () => {
    expect.assertions(1);
    addBackParams.operationId = 'operationId';
    addBackParams.userName = undefined;
    await expect(addImage(addBackParams)).rejects.toBe(missingUserName);
  });
  it('expect addImage to throw missing File', async () => {
    expect.assertions(1);
    addBackParams.userName = 'userName';
    addBackParams.file = undefined;
    await expect(addImage(addBackParams)).rejects.toBe(missingFile);
  });
  it('expect addImage to throw missing Side', async () => {
    expect.assertions(1);
    addBackParams.file = 'file';
    addBackParams.side = undefined;
    await expect(addImage(addBackParams)).rejects.toBe(missingSide);
  });
});
