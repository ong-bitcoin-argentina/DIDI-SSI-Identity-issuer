/* eslint-disable jest/no-hooks */
const { set, disconnect } = require('../../../src/services/RedisService');

const {
  missingKey,
  missingValue,
} = require('../../../src/constants/serviceErrors');

const key = 'key';
const value = 'value';

describe('services/RedisService/set.test.js', () => {
  afterAll(async () => {
    await disconnect();
  });
  it('expect get to throw missing key', async () => {
    expect.assertions(1);
    await expect(Promise.resolve(set(undefined, value))).rejects.toBe(
      missingKey,
    );
  });
  it('expect get to throw missing value', async () => {
    expect.assertions(1);
    await expect(Promise.resolve(set(key, undefined))).rejects.toBe(
      missingValue,
    );
  });
  it('expect get to throw success', async () => {
    expect.assertions(1);
    const response = await set(key, value);
    expect(response).toBe('OK');
  });
});
