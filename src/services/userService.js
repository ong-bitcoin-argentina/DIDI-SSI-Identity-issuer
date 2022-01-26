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
    return user;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Messages.COMMUNICATION_ERROR;
  }
};

module.exports = { getByDID };

/**
 * Crear un usuario, siempre que este no exista uno asociado al did
 */
module.exports.create = async function create(did) {
  if (!did) throw missingDid;
  try {
    // Verificar si ya existe un usuario asociado a ese did
    let user = await getByDID(did);
    if (user) return Messages.USER.ERR.USER_ALREADY_EXIST;

    // Crear usuario
    user = await User.generate(did);
    if (!user) return Messages.USER.ERR.CREATE;
    return user;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Messages.COMMUNICATION_ERROR;
  }
};
