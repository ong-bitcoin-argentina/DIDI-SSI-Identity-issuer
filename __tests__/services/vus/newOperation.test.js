jest.mock('node-fetch');
const fetch = require('node-fetch');

const { newOperation } = require('../../../src/services/vusService');

const { newOperationParams } = require('./constants');
const { successRespNewOperation } = require('../mock/constants');
const {
  missingUserName,
  missingDeviceHash,
  missingOperativeSystem,
  missingOperativeSystemVersion,
  missingDeviceManufacturer,
  missingDeviceName,
} = require('../../../src/constants/serviceErrors');

describe('services/vus/newOperation.test.js', () => {
  it('expect newOperation OK', async () => {
    expect.assertions(1);
    fetch.mockReturnValue(Promise.resolve(successRespNewOperation));
    const response = await newOperation(newOperationParams);
    expect(response).toStrictEqual(successRespNewOperation.json());
  });
  it('expect newOperation to throw on missing userName', async () => {
    expect.assertions(1);
    newOperationParams.userName = undefined;
    await expect(newOperation(newOperationParams)).rejects.toBe(
      missingUserName,
    );
  });
  it('expect newOperation to throw on missing deviceHash', async () => {
    expect.assertions(1);
    newOperationParams.userName = 'userName';
    newOperationParams.deviceHash = undefined;
    await expect(newOperation(newOperationParams)).rejects.toBe(
      missingDeviceHash,
    );
  });
  it('expect newOperation to throw on missing operativeSystem', async () => {
    expect.assertions(1);
    newOperationParams.deviceHash = 'hash';
    newOperationParams.operativeSystem = undefined;
    await expect(newOperation(newOperationParams)).rejects.toBe(
      missingOperativeSystem,
    );
  });
  it('expect newOperation to throw on missing operativeSystemVersion', async () => {
    expect.assertions(1);
    newOperationParams.operativeSystem = 'operativeSystem';
    newOperationParams.operativeSystemVersion = undefined;
    await expect(newOperation(newOperationParams)).rejects.toBe(
      missingOperativeSystemVersion,
    );
  });
  it('expect newOperation to throw on missing deviceManufacturer', async () => {
    expect.assertions(1);
    newOperationParams.operativeSystemVersion = 'operativeSystemVersion';
    newOperationParams.deviceManufacturer = undefined;
    await expect(newOperation(newOperationParams)).rejects.toBe(
      missingDeviceManufacturer,
    );
  });
  it('expect newOperation to throw on missing deviceName', async () => {
    expect.assertions(1);
    newOperationParams.deviceManufacturer = 'deviceManufacturer';
    newOperationParams.deviceName = undefined;
    await expect(newOperation(newOperationParams)).rejects.toBe(
      missingDeviceName,
    );
  });
});
