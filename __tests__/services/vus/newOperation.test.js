const { newOperation } = require('../../../src/services/vusService');
const {
  missingUserName,
  missingIpAddress,
  missingDeviceHash,
  missingApplicationVersion,
  missingOperativeSystem,
  missingOperativeSystemVersion,
  missingDeviceManufacturer,
  missingDeviceName,
} = require('../../../src/constants/serviceErrors');

describe('services/vus/newOperation.test.js', () => {
  it('expect newOperation to throw on missing userName', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        newOperation(
          undefined,
          'IpAddress',
          'deviceHash',
          'Rooted',
          'ApplicationVersion',
          'OperativeSystem',
          'OperativeSystemVersion',
          'DeviceManufacturer',
          'deviceName',
        ),
      ),
    ).rejects.toBe(missingUserName);
  });
  it('expect newOperation to throw on missing ipAddress', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        newOperation(
          'userName',
          undefined,
          'deviceHash',
          'Rooted',
          'ApplicationVersion',
          'OperativeSystem',
          'OperativeSystemVersion',
          'DeviceManufacturer',
          'deviceName',
        ),
      ),
    ).rejects.toBe(missingIpAddress);
  });
  it('expect newOperation to throw on missing deviceHash', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        newOperation(
          'userName',
          'ipAddress',
          undefined,
          'Rooted',
          'ApplicationVersion',
          'OperativeSystem',
          'OperativeSystemVersion',
          'DeviceManufacturer',
          'deviceName',
        ),
      ),
    ).rejects.toBe(missingDeviceHash);
  });
  it('expect newOperation to throw on missing ApplicationVersion', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        newOperation(
          'userName',
          'ipAddress',
          'deviceHash',
          'Rooted',
          undefined,
          'OperativeSystem',
          'OperativeSystemVersion',
          'DeviceManufacturer',
          'deviceName',
        ),
      ),
    ).rejects.toBe(missingApplicationVersion);
  });
  it('expect newOperation to throw on missing OperativeSystem', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        newOperation(
          'userName',
          'ipAddress',
          'deviceHash',
          'Rooted',
          'ApplicationVersion',
          undefined,
          'OperativeSystemVersion',
          'DeviceManufacturer',
          'deviceName',
        ),
      ),
    ).rejects.toBe(missingOperativeSystem);
  });
  it('expect newOperation to throw on missing OperativeSystemVersion', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        newOperation(
          'userName',
          'ipAddress',
          'deviceHash',
          'Rooted',
          'ApplicationVersion',
          'OperativeSystem',
          undefined,
          'DeviceManufacturer',
          'deviceName',
        ),
      ),
    ).rejects.toBe(missingOperativeSystemVersion);
  });
  it('expect newOperation to throw on missing DeviceManufacturer', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        newOperation(
          'userName',
          'ipAddress',
          'deviceHash',
          'Rooted',
          'ApplicationVersion',
          'OperativeSystem',
          'OperativeSystemVersion',
          undefined,
          'deviceName',
        ),
      ),
    ).rejects.toBe(missingDeviceManufacturer);
  });
  it('expect newOperation to throw on missing DeviceName', async () => {
    expect.assertions(1);
    await expect(
      Promise.resolve(
        newOperation(
          'userName',
          'ipAddress',
          'deviceHash',
          'Rooted',
          'ApplicationVersion',
          'OperativeSystem',
          'OperativeSystemVersion',
          'DeviceManufacturer',
          undefined,
        ),
      ),
    ).rejects.toBe(missingDeviceName);
  });
});
