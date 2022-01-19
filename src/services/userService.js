// eslint-disable-next-line import/no-unresolved
const User = require('../models/User');
const Messages = require('../constants/Messages');

const { missingDid } = require('../constants/serviceErrors');

/**
 * Obtener usuario a partir de un did
 */
const getByDID = async function getByDID(did) {
  if (!did) throw missingDid;
  try {
    const user = await User.getByDID(did);
    return Promise.resolve(user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(Messages.COMMUNICATION_ERROR);
  }
};
module.exports.getByDID = getByDID;
