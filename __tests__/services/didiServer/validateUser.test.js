jest.mock('node-fetch');

const fetch = require('node-fetch');
const { verifyToken } = require('../../../src/services/DidiServerService');

const { token, invalidToken } = require('./constants');
const {
  successVerifyToken,
  failVerifyToken,
  invalidJWT,
} = require('../mock/constants');
const { missingToken } = require('../../../src/constants/serviceErrors');

describe('services/didiServer/validateUser.test.js', () => {
  it('expect verifyToken OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successVerifyToken));
    const response = await verifyToken(token);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(true);
  });
  it('expect verifyToken to return false on incorrect format of Token', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(invalidJWT));
    const response = await verifyToken('asd');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(response).toBe(false);
  });
  it('expect verifyToken to return false on invalid Token', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(failVerifyToken));
    const response = await verifyToken(invalidToken);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(response).toBe(false);
  });
  it('expect verifyToken to throw on missing token', async () => {
    expect.assertions(1);
    try {
      await verifyToken(undefined);
    } catch (e) {
      expect(e).toBe(missingToken);
    }
  });
});
