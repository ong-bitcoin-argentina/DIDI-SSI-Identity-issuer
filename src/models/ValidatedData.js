const mongoose = require('mongoose');

const ValidatedDataSchema = new mongoose.Schema({
  did: {
    type: String,
    required: true,
  },
  userData: {
    type: Object,
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
  error: {
    type: Object,
  },
});

ValidatedDataSchema.methods.addAttempt = async (error) => {
  const update =
    this.attempts > 5
      ? { $set: { status: 'Failed', error } }
      : { $inc: { attempts: 1 } };
  return this.updateOne(update);
};

const ValidatedData = mongoose.model('ValidatedData', ValidatedDataSchema);
module.exports = ValidatedData;
