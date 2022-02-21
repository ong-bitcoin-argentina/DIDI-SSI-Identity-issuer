const { createVerification } = require('./createVerification');
const { cancelVerification } = require('./cancelVerification');
const { addDocumentImage } = require('./addDocumentImage');
const { finishOperation } = require('./finishOperation');

module.exports = {
  createVerification,
  cancelVerification,
  addDocumentImage,
  finishOperation,
};
