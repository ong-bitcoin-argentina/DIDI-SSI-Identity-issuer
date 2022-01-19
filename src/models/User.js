const mongoose = require('mongoose');

// Registra la informacion correspondiente a un usuario de didi
const UserSchema = new mongoose.Schema({
  did: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
