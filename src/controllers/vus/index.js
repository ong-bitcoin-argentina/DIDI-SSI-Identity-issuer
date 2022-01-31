const { createVerification } = require('./createVerification');
const { cancelVerification } = require('./cancelVerification');
const { frontImage } = require('./addFront');
const { addDocumentImage } = require('./addDocumentImage');
const { backImage } = require('./addBack');

module.exports = {
  createVerification,
  cancelVerification,
  frontImage,
  addDocumentImage,
  backImage,
};
