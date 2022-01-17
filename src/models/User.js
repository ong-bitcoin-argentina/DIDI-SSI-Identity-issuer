const mongoose = require('mongoose');

// Registra la informacion correspondiente a un usuario de didi
const UserSchema = new mongoose.Schema(
  {
    did: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

const User = mongoose.model('User', UserSchema);
module.exports = User;

// crear nuevo usuario
User.generate = async function generate(did, name, lastname) {
  try {
    let user = new User();
    user.did = did;
    user.name = name;
    user.lastname = lastname;

    user = await user.save();
    return user;
  } catch (err) {
    // eslint-disable-next-line no-console
    return err;
  }
};

// obtener usuario a partir del did
User.getByDID = async function getByDID(did) {
  try {
    const query = { did };
    const user = await User.findOne(query);
    return user;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return err;
  }
};
