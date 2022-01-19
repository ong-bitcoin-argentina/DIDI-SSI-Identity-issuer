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
