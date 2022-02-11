/* eslint-disable no-console */
const redis = require('redis');
const { REDIS_URI, PREFIJO_REDIS } = require('../constants/Constants');
const { missingKey, missingValue } = require('../constants/serviceErrors');

let client;
(async () => {
  try {
    const config = {
      url: REDIS_URI,
      password: process.env.REDIS_PASSWORD,
    };
    client = await redis.createClient(config);

    client.on('connect', () => console.log('Redis Client connect'));
    client.on('ready', () => console.log('Redis Client ready'));
    client.on('end', () => console.log('Redis Client end'));
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.on('reconnecting', () => console.log('Redis Client reconnecting'));

    await client.connect();
  } catch (e) {
    console.log(e);
  }
})();

const get = async (key) => {
  if (!key) throw missingKey;
  return client.get(`${PREFIJO_REDIS}-${key}`);
};

const set = async (key, value) => {
  if (!key) throw missingKey;
  if (!value) throw missingValue;
  return client.setEx(`${PREFIJO_REDIS}-${key}`, 864000, value);
};

const del = async (key) => {
  if (!key) throw missingKey;
  return client.del(`${PREFIJO_REDIS}-${key}`);
};

const disconnect = () => {
  return client.quit();
};

module.exports = {
  get,
  set,
  del,
  disconnect,
  client,
};
