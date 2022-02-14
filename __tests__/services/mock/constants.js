const successBodyNewOPeration = {
  code: 901,
  message: 'New operation created',
  operationId: 1,
  operationGuid: 'b888c80c-5b95-433b-85e5-f2bf6fbd94c6',
};

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

const successBodyAddBack = {
  imgage: {
    code: 912,
    message: 'Add back success',
    containsBarcode: true,
    barcodeDetected: true,
  },
};

const successBodyCancelOperation = {
  imgage: {
    code: 906,
    message: 'Cancel operation success',
  },
};

module.exports = {
  successRespDocumentImage: {
    json: () => successBodyDocumentImage,
  },
  successRespAddFront: {
    json: () => successBodyAddFront,
  },
  successRespAddBack: {
    json: () => successBodyAddBack,
  },
  successRespCancelOperation: {
    json: () => successBodyCancelOperation,
  },
  successRespNewOperation: {
    json: () => successBodyNewOPeration,
  },
};
