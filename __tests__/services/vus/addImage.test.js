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

describe('services/vus/addImage.test.js', () => {
  it('expect addBack OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successRespAddBack));
    const response = await addImage('operationId', 'userName', 'file', 'back');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(successRespAddBack.json());
  });
  it('expect addFront OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successRespAddFront));
    const response = await addImage('operationId', 'userName', 'file', 'front');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(response).toBe(successRespAddFront.json());
  });
  it('expect addImage to throw missing OperationId', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addImage(undefined, 'userName', 'file', 'back')),
    ).rejects.toBe(missingOperationId);
  });
  it('expect addImage to throw missing userName', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addImage('operationId', undefined, 'file', 'back')),
    ).rejects.toBe(missingUserName);
  });
  it('expect addImage to throw missing File', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addImage('operationId', 'userName', undefined, 'side')),
    ).rejects.toBe(missingFile);
  });
  it('expect addImage to throw missing Side', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(addImage('operationId', 'userName', 'file', undefined)),
    ).rejects.toBe(missingSide);
  });
});
