const fetch = require('node-fetch');

const didJWT = require('did-jwt');

const { USER } = require('../constants/Messages');
const { DIDI_SERVER } = require('../constants/Constants');
const { sendErrWithStatus } = require('../utils/ResponseHandler');
const { get, set } = require('../services/RedisService');

const url = `${DIDI_SERVER}/user/verifyToken`;

// Middelware para verificar que un usuario exista en Didi Server
const validateUser = async (req, res, next) => {
  const jwt = req.header('Authorization');
  try {
    const { iss } = await didJWT.decodeJWT(jwt).payload;
    const searchTerm = `verificacion-usuario-${iss}`;
    const userInCache = await get(searchTerm);
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
      await set(searchTerm, data.did);
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
