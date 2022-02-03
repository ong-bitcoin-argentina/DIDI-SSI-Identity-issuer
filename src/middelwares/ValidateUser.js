const fetch = require('node-fetch');
const redis = require('redis');
const didJWT = require('did-jwt');

const { USER } = require('../constants/Messages');
const { DIDI_SERVER, REDIS_URI } = require('../constants/Constants');
const { sendErrWithStatus } = require('../utils/ResponseHandler');

const url = `${DIDI_SERVER}/user/verifyToken`;
const client = redis.createClient(REDIS_URI);

(async () => {
  await client.connect();
})();

// Middelware para verificar que un usuario exista en Didi Server
const validateUser = async (req, res, next) => {
  const jwt = req.header('Authorization');
  try {
    const { iss } = await didJWT.decodeJWT(jwt).payload;
    const searchTerm = `verificacion-usuario-${iss}`;

    const userInCache = await client.get(searchTerm);
    if (!userInCache) {
      const user = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jwt }),
      });
      const { data } = await user.json();

      if (!data) throw USER.ERR.VALIDATE;
      await client.setEx(searchTerm, 864000, data.did);
    }
    next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    sendErrWithStatus(res, e, 401);
  }
};

module.exports = {
  validateUser,
};
