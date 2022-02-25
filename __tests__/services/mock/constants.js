const successBodyNewOPeration = {
  code: 901,
  message: 'New operation created',
  operationId: 1,
  userName: 'userName',
};

const successBodyDocumentImage = {
  imageDocument: {
    code: 937,
    message: 'Add document image success',
  },
};

const successBodyAddFront = {
  imgage: {
    code: 912,
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

const successBodyEndOperation = {
  code: 0,
  message: 'End operation success',
  confidence: 0,
  confidenceDocument: 0,
  confidenceTotal: 0,
  anomalies: {
    areaValidations: '{"INFO":"0"}',
    textValidationsOcr: '{"INFO":"0"}',
    textValidationsMrz: '{"INDO":"0"}',
    textValidationsDocumentData: '{"INFO":"0"}',
    areaValidationsDocumentAnomalies: '{"INFO":"0"}',
    textValidationsDocument: '{"INFO":"0"}',
    textValidationsTotal: '{"INFO":"0"}',
  },
  ocr: {
    extra: {
      additional: '{"INFO":"00"}',
      mrz: '{"INFO":"00"}',
    },
    number: 'XXXXXXXX',
    gender: 'X',
    lastNames: ' XXXXX ',
    names: 'NAME',
    birthdate: '1111-11-11',
  },
  identical: true,
};

const badRequest = {
  status: 400,
  statusText: 'Bad Request',
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
  successRespEndOperation: {
    json: () => successBodyEndOperation,
  },
  failResponse: {
    json: () => badRequest,
  },
};
