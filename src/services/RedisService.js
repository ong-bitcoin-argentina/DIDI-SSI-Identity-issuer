const redis = require('redis');
const { REDIS_URI, PREFIJO_REDIS } = require('../constants/Constants');
const { missingKey, missingValue } = require('../constants/serviceErrors');

let client;
(async () => {
  client = await redis.createClient({ url: REDIS_URI });

  // eslint-disable-next-line no-console
  client.on('error', (err) => console.log('Redis Client Error', err));

  // Disable client's AUTH command.
  client.auth = null;

  await client.connect();
})();

const get = async (key) => {
  if (!key) throw missingKey;
  try {
    const value = await client.get(`${PREFIJO_REDIS}-${key}`);
    return value;
  } catch (err) {
    return err;
  }
};

const set = async (key, value) => {
  if (!key) throw missingKey;
  if (!value) throw missingValue;
  try {
    const response = await client.setEx(
      `${PREFIJO_REDIS}-${key}`,
      864000,
      value,
    );
    return response;
  } catch (err) {
    return err;
  }
};

const del = async (key) => {
  if (!key) throw missingKey;
  try {
    const response = await client.del(`${PREFIJO_REDIS}-${key}`);
    return response;
  } catch (err) {
    return err;
  }
};

const disconnect = () => {
  return client.disconnect();
};

module.exports = {
  get,
  set,
  del,
  disconnect,
  client,
};
