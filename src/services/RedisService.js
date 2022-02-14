/* eslint-disable no-console */
const redis = require('redis');
const { REDIS_URI, PREFIJO_REDIS } = require('../constants/Constants');
const { missingKey, missingValue } = require('../constants/serviceErrors');

const config = {
  url: REDIS_URI,
};
const client = redis.createClient(config);

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await client.connect();
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
