const fetch = require('node-fetch');

const { USER } = require('../constants/Messages');
const { DIDI_SERVER } = require('../constants/Constants');
const { sendErrWithStatus } = require('../utils/ResponseHandler');

const url = `${DIDI_SERVER}/user/verifyToken`;

const validateUser = async (req, res, next) => {
  try {
    const jwt = req.header('Authorization');

    const user = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jwt }),
    });
    const userResp = await user.json();

    if (!userResp) throw USER.ERR.VALIDATE;
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
