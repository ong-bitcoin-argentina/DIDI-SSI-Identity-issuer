const mongoose = require('mongoose');

const { ObjectId } = mongoose;

const AdminSchema = new mongoose.Schema({
  // jwt del authorization token del usuario admin del issuer
  jwt: {
    type: String,
  },
  // id del template de domicilio legal
  locationTemplateId: {
    type: ObjectId,
  },
  // id del template de datos Pesonales
  personalTemplateId: {
    type: ObjectId,
  },
});

const Admin = mongoose.model('Admin', AdminSchema);

Admin.getLocationTemplateId = async function getLocationTemplateId() {
  const { locationTemplateId } = await Admin.findOne();
  return locationTemplateId;
};

Admin.getPesonalTemplateId = async function getPesonalTemplateId() {
  const { personalTemplateId } = await Admin.findOne();
  return personalTemplateId;
};

Admin.getToken = async function getToken() {
  return this.jwt;
};

Admin.updateToken = async function updateToken(jwt) {
  this.jwt = jwt;
  await this.save();
};

module.exports = Admin;
