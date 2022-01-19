const mongoose = require('mongoose');

// Registra la informacion correspondiente a un usuario de didi
// eslint-disable-next-line no-unused-vars
const UserSchema = new mongoose.Schema({
  did: {
    type: String,
    required: true,
    unique: true,
  },
});
