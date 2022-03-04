const didJWT = require('did-jwt');

const { get, set } = require('../services/RedisService');
const { verifyToken } = require('../services/DidiServerService');

const { sendErrWithStatus } = require('../utils/ResponseHandler');
const { USER } = require('../constants/Messages');

// Middelware para verificar que un usuario exista en Didi Server
const validateUser = async (req, res, next) => {
  const jwt = req.header('Authorization');
  try {
    const { iss } = await didJWT.decodeJWT(jwt).payload;
    const searchTerm = `verificacion-usuario-${iss}`;
    const userInCache = await get(searchTerm);
    if (!userInCache) {
      const verified = await verifyToken(jwt);
      if (!verified) throw USER.ERR.NOT_FOUND;
      await set(searchTerm, iss);
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
