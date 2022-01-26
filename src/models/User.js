const mongoose = require('mongoose');

// Registra la informacion correspondiente a un usuario de didi
const UserSchema = new mongoose.Schema({
  did: {
    type: String,
    required: true,
    unique: true,
  },
  operationId: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);

// retornar did asociado al usuario
UserSchema.methods.getDid = async function getDid() {
  return this.did;
};

// obtener usuario a partir del did
User.getByDID = async function getByDID(did) {
  try {
    const user = await User.findOne({ did });
    return Promise.resolve(user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(err);
  }
};

// crear nuevo usuario
User.generate = async function generate(did, name, lastname) {
  try {
    let user = new User();
    user.did = did;
    user.name = name;
    user.lastname = lastname;

    user = await user.save();
    return Promise.resolve(user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(err);
  }
};

module.exports = User;
