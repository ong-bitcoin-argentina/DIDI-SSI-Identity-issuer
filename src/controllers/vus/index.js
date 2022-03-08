const { createVerification } = require('./createVerification');
const { cancelVerification } = require('./cancelVerification');
const { addDocumentImage } = require('./addDocumentImage');
const { finishOperation } = require('./finishOperation');
const { getStatus } = require('./getStatus');

module.exports = {
  createVerification,
  cancelVerification,
  addDocumentImage,
  finishOperation,
  getStatus,
};
