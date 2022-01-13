/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
// const Hashing = require('./utils/Hashing');
// const Encrypt = require('./utils/Encryption');
// const EncryptedData = require('./dataTypes/EncryptedData');
// const HashedData = require('./dataTypes/HashedData');
// const { getImageUrl } = require('../utils/Helpers');

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

    // mail: EncryptedData,
    // oldEmails: [EncryptedData],

    // phoneNumber: EncryptedData,
    // oldPhoneNumbers: [EncryptedData],

    imageId: {
      type: String,
    },

    // seed: EncryptedData,

    backupHash: {
      type: String,
    },
    firebaseId: {
      type: String,
    },
    // password: HashedData,
    deleted: {
      type: Boolean,
      default: false,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    modifiedOn: {
      type: Date,
      default: Date.now(),
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

UserSchema.index(
  { did: 1, deleted: 1 },
  {
    unique: true,
  },
);

UserSchema.index(
  { 'mail.encrypted': 1, deleted: 1 },
  {
    unique: true,
  },
);

// Devuelve al url donde esta guardada la imagen de ususuario segun imageID
// UserSchema.virtual('imageUrl').get(function imageUrl() {
//   return getImageUrl(this.imageId);
// });
/*
// retorna clave privada del usuario
UserSchema.methods.getSeed = async function getSeed() {
  try {
    const result = await Encrypt.decript(this.seed.encrypted);
    return Promise.resolve(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(err);
  }
};

// compara los campos hasheados
UserSchema.methods.compareField = async function compareField(name, candidate) {
  try {
    /const result = await Hashing.validateHash(candidate, this[name]);
    return Promise.resolve(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(err);
  }
};

// actualiza la contraseña del usuario
UserSchema.methods.updatePassword = async function updatePassword(password) {
  // hashear clave
  const hashData = await Hashing.saltedHash(password);

  // actualizar clave
  const updateQuery = { _id: this._id };
  const updateAction = {
    $set: { password: hashData, modifiedOn: new Date() },
  };

  try {
    await User.findOneAndUpdate(updateQuery, updateAction);
    this.password = hashData;
    return Promise.resolve(this);
  } catch (err) {
    return Promise.reject(err);
  }
};

// actualiza el numero de telefono asociado al usuario
UserSchema.methods.updatePhoneNumber = async function updatePhoneNumber(
  newPhoneNumber,
  firebaseId,
) {
  const oldPhone = {
    encrypted: this.phoneNumber.encrypted,
    // salt: this.phoneNumber.salt,
    hash: this.phoneNumber.hash,
  };

  // encriptar numero
  await Encrypt.setEncryptedData(this, 'phoneNumber', newPhoneNumber);
  // si no hay cambio, retornar
  if (oldPhone.hash === this.phoneNumber.hash) return Promise.resolve(this);

  // actualizar numero
  const updateQuery = { _id: this._id };
  const updateAction = {
    $set: { phoneNumber: this.phoneNumber, firebaseId, modifiedOn: new Date() },
    $push: { oldPhoneNumbers: oldPhone },
  };

  try {
    await User.findOneAndUpdate(updateQuery, updateAction);
    this.oldPhoneNumbers.push(this.phoneNumber);
    return Promise.resolve(this);
  } catch (err) {
    return Promise.reject(err);
  }
};

// actualiza el id de firebase
UserSchema.methods.updateFirebaseId = async function updateFirebaseId(
  firebaseId,
) {
  // actualizar firebaseId
  const updateQuery = { _id: this._id };
  const updateAction = {
    $set: { firebaseId, modifiedOn: new Date() },
  };

  try {
    await User.findOneAndUpdate(updateQuery, updateAction);
    this.firebaseId = firebaseId;
    return Promise.resolve(this);
  } catch (err) {
    return Promise.reject(err);
  }
};

// actualiza el mail asociado al usuario
UserSchema.methods.updateEmail = async function updateEmail(newEmail) {
  const oldMail = {
    encrypted: this.mail.encrypted,
    // salt: this.mail.salt,
    hash: this.mail.hash,
  };

  // encriptar mail
  await Encrypt.setEncryptedData(this, 'mail', newEmail);
  // si no hay cambio, retornar
  if (oldMail.hash === this.mail.hash) return Promise.resolve(this);

  // actualizar mail
  const updateQuery = { _id: this._id };
  const updateAction = {
    $set: { mail: this.mail, modifiedOn: new Date() },
    $push: { oldEmails: oldMail },
  };

  try {
    await User.findOneAndUpdate(updateQuery, updateAction);
    this.oldEmails.push(oldMail);
    return Promise.resolve(this);
  } catch (err) {
    return Promise.reject(err);
  }
};

// actualiza el hash de backup (swarm)
UserSchema.methods.updateHash = async function updateHash(hash) {
  const updateQuery = { _id: this._id };
  const updateAction = {
    $set: { backupHash: hash, modifiedOn: new Date() },
  };

  try {
    await User.findOneAndUpdate(updateQuery, updateAction);
    this.backupHash = hash;
    return Promise.resolve(this);
  } catch (err) {
    return Promise.reject(err);
  }
};

// retornar mail asociado al usuario
UserSchema.methods.getMail = async function getMail() {
  return Encrypt.getEncryptedData(this, 'mail');
};

// retornar numero de telefono asociado al usuario
UserSchema.methods.getPhoneNumber = async function getPhoneNumber() {
  return Encrypt.getEncryptedData(this, 'phoneNumber');
};

// retornar did asociado al usuario
UserSchema.methods.getDid = async function getDid() {
  return this.did;
};

// actualiza su foto de perfil
UserSchema.methods.updateImage = async function updateImage(imageId) {
  const updateQuery = { _id: this._id };
  const updateAction = {
    $set: { imageId },
  };

  try {
    await User.findOneAndUpdate(updateQuery, updateAction);
    this.imageId = imageId;
    return Promise.resolve(this);
  } catch (err) {
    return Promise.reject(err);
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

User.emailTaken = async function emailTaken(mail, exceptionDid) {
  try {
    const hashData = await Hashing.hash(mail);
    const repeatedMailQuery = {
      $or: [
        { 'mail.hash': hashData.hash },
        { 'oldEmails.hash': hashData.hash },
      ],
    };
    if (exceptionDid) repeatedMailQuery.did = { $ne: exceptionDid };

    const sameMailUser = await User.find(repeatedMailQuery);
    return Promise.resolve(sameMailUser.length > 0);
  } catch (err) {
    return Promise.reject(err);
  }
};

// verificar si el teléfono está en uso
User.telTaken = async function telTaken(tel, exceptionDid) {
  try {
    const hashData = await Hashing.hash(tel);
    const repeatedPhoneQuery = {
      $or: [
        { 'phoneNumber.hash': hashData.hash },
        { 'oldPhoneNumbers.hash': hashData.hash },
      ],
    };
    if (exceptionDid) repeatedPhoneQuery.did = { $ne: exceptionDid };

    const samePhoneUser = await User.find(repeatedPhoneQuery);
    return Promise.resolve(samePhoneUser.length > 0);
  } catch (err) {
    return Promise.reject(err);
  }
};

// crear nuevo usuario
User.generate = async function generate(
  did,
  seed,
  mail,
  phoneNumber,
  pass,
  firebaseId,
  name,
  lastname,
) {
  try {
    let user = new User();
    user.oldEmails = [];
    user.oldPhoneNumbers = [];
    user.createdOn = new Date();
    user.modifiedOn = new Date();
    user.deleted = false;
    user.did = did;
    user.firebaseId = firebaseId;
    user.name = name;
    user.lastname = lastname;
    await Encrypt.setEncryptedData(user, 'phoneNumber', phoneNumber);
    await Encrypt.setEncryptedData(user, 'mail', mail);
    await Encrypt.setEncryptedData(user, 'seed', seed);
    user.password = await Hashing.saltedHash(pass);

    user = await user.save();
    return Promise.resolve(user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(err);
  }
};

// obtener usuario a partir del did
User.getByDID = async function getByDID(did) {
  try {
    const query = { did, deleted: false };
    const user = await User.findOne(query);
    return Promise.resolve(user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(err);
  }
};

// obtener usuario a partir del mail
User.getByEmail = async function getByEmail(email) {
  try {
    const hashData = await Hashing.hash(email);
    const query = { 'mail.hash': hashData.hash, deleted: false };
    const user = await User.findOne(query);
    return Promise.resolve(user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(err);
  }
};

// obtener usuario a partir del numero de telefono
User.getByTel = async function getByTel(phoneNumber) {
  try {
    const hashData = await Hashing.hash(phoneNumber);
    const query = { 'phoneNumber.hash': hashData.hash, deleted: false };
    const user = await User.findOne(query);
    return Promise.resolve(user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return Promise.reject(err);
  }
};

// obtener usuario a partir del did y actualizarlo
User.findByDidAndUpdate = async (did, data) => {
  const query = { did };
  const action = { $set: data };
  const options = { new: true };
  return User.findOneAndUpdate(query, action, options);
};
*/
