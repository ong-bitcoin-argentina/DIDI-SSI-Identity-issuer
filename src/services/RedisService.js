const redis = require('redis');
const { REDIS_URI } = require('../constants/Constants');

const client = redis.createClient(REDIS_URI);

(async () => {
  await client.connect();
})();

const get = async (key) => {
  const value = await client.get(key);
  return value;
};

const set = async (key, value) => {
  const response = await client.setEx(key, 864000, value);
  return response;
};

const del = async (key) => {
  const response = await client.del(key);
  return response;
};

const disconnect = () => {
  return client.disconnect();
};

module.exports = {
  get,
  set,
  del,
  disconnect,
};
