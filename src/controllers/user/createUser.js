const UserService = require('../../services/userService');

// eslint-disable-next-line no-unused-vars
const createUser = async (req, res) => {
  const { did } = req.body;

  try {
    // Crear usuario
    await UserService.create(did);
    return res.status(200).json({ did });
  } catch (err) {
    return err;
  }
};

module.exports = {
  createUser,
};
