const { createVerification } = require('./createVerification');
const { cancelVerification } = require('./cancelVerification');
const { addDocumentImage } = require('./addDocumentImage');
const { finishOperation } = require('./finishOperation');
const { getStatus } = require('./getStatus');
const { getInformation } = require('./getInformation');

module.exports = {
  createVerification,
  cancelVerification,
  addDocumentImage,
  finishOperation,
  getStatus,
  getInformation,
};
