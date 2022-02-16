const { set, get, disconnect } = require('../../../src/services/RedisService');

const { missingKey } = require('../../../src/constants/serviceErrors');

const key = 'key';
const value = 'value';

describe('services/RedisService/get.test.js', () => {
  beforeAll(async () => {
    await set(key, value);
  });
  afterAll(async () => {
    await disconnect();
  });
  it('expect get to throw missing key', async () => {
    expect.assertions(1);
    try {
      await get(undefined);
    } catch (e) {
      expect(e).toBe(missingKey);
    }
  });
  it('expect get to throw success', async () => {
    expect.assertions(1);
    const response = await get(key);
    expect(response).toBe(value);
  });
});
