const mongoose = require('mongoose');

const ValidatedDataSchema = new mongoose.Schema({
  did: {
    type: String,
    required: true,
  },
  personalData: {
    type: Map,
    require: true,
  },
  locationData: {
    type: Map,
    require: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  attemps: {
    type: Number,
    default: 0,
  },
  emmitionErrors: {
    type: Array,
  },
});

ValidatedDataSchema.methods.addAttempt = async function addAttempt(error) {
  try {
    if (this.attemps > 5) this.status = 'Failed';
    this.attemps += 1;
    this.emmitionErrors = [...this.emmitionErrors, error];
    await this.save();
    return this;
  } catch (err) {
    return err;
  }
};

const ValidatedData = mongoose.model('ValidatedData', ValidatedDataSchema);
module.exports = ValidatedData;
