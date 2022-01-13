const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  did: {
    type: String,
    unique: true,
    required: true,
  },
  jwt: {
    // for cache
    type: String,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

const Admin = mongoose.model('Admin', AdminSchema);

Admin.getByDID = async function getByDID(did) {
  return Admin.findOne({ did });
};

module.exports = Admin;
