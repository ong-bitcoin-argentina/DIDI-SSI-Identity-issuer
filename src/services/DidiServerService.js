const fetch = require('node-fetch');

const { DIDI_SERVER } = require('../constants/Constants');
const { USER } = require('../constants/Messages');
const { missingToken } = require('../constants/serviceErrors');

/**
 * Verifica si el token de usuario existe en Didi Server
 */
const verifyToken = async (token) => {
  if (!token) throw missingToken;
  const response = await fetch(`${DIDI_SERVER}/user/verifyToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jwt: token }),
  });

  if (!response) throw USER.ERR.VALIDATE;

  const { status } = await response.json();
  return status === 'success';
};

module.exports = {
  verifyToken,
};
