/* eslint-disable jest/no-hooks */
const { set, get, del } = require('../../../src/services/RedisService');

const { missingKey } = require('../../../src/constants/serviceErrors');

const key = 'key';
const value = 'value';

describe('services/RedisService/del.test.js', () => {
  beforeAll(async () => {
    await set(key, value);
  });
  it('expect del to throw missing key', async () => {
    expect.assertions(1);
    await expect(Promise.resolve(del(undefined))).rejects.toBe(missingKey);
  });
  it('expect del to throw success', async () => {
    expect.assertions(2);
    const response = await del(key);
    const getResponse = await get(key);
    expect(response).toBe(1);
    expect(getResponse).toBeNull();
  });
});
