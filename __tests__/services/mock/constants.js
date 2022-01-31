const successBodyDocumentImage = {
  imageDocument: {
    code: 937,
    message: 'Add document image success',
  },
};

const successBodyAddFront = {
  image: {
    code: 0,
    message: 'Add front success',
    detectedCountry: 'pais',
    detectedCountryId: 1,
    detectedDocumentCountryId: 1,
    detectedDocumentCountry: 'Pais',
    addBackRequired: true,
    addDocumentPictureRequired: true,
    documentPictureDetected: true,
    containsBarcode: true,
    barcodeDetected: true,
  },
};

module.exports = {
  successRespDocumentImage: {
    json: () => successBodyDocumentImage,
  },
  successRespAddFront: {
    json: () => successBodyAddFront,
  },
};
