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

const successVerifyToken = {
  status: 'success',
  data: {
    mail: {
      encrypted:
        'TUuVNYQDL62HCVxLpTaioweV1nmGDGjVNjQhwHouz2DBlPCAlmqinjjiY7RH8yelQKoIVPA+pbUdK+qP+UAgwt+2+qvKLb/oftUX8vKhSpFblY6GoBivx+mwdHhGegVrTy+jC6qGT+YeYcagvpUHfNvztq/JnfVJlsIlNm05FkEh7YuKbV8dSXF+wowMPn9vXIVgbRmvBytE9wTjpZhvQq70MEdG7RLsT4vERv+j18nYtnOScMf+SD2iUf47Wb0Eh0WZ6R1CZ9MZEMPyoBpfW7KLC8atodmEMlcdmT23xr/7HZwA7IQIhMGgOu7EvqE35wCl0fAMdWpfIXmeiCbw==',
      hash: '$2b$10$R3ZBEFlWNny4P/wYF.kCd.htEE1myxccuXYC2R.PMZu9d5V1ADNjG',
    },
    phoneNumber: {
      encrypted:
        'bignHwZYzdkesav/xW8yYfis/fVlNg6v4u+S0nVOyQQmLaubtGfwyWKAcV96zz1MRcrJSkXF+r2w+CuvdsJ2sZTDS3fZnURkLNGFyW6p+zzCcl6ELpZ1qUMbUUYkd8AVHhK17ztfx1dqd9Fx4VGf07U/w8b6Rxunu2Jh61hiERCq21UxwO3yM1DhBmx2Qgu5QDIh+lk49cq0/BzokxtUz3it/tjY9hkcyB5pJPabbsAcv+vGsSKoPH5xwwsPmHpJ8CCCbHdtx8eoZRfWvN2VRFsREkT55VbQNq2w5TeXZbBrM1dQWuubr2I1jKAN2E9WMGUKRAhY61w4g9szFk+Mg==',
      hash: '$2b$10$R3ZBEFlWNny4P/wYF.kCd.zpc1eErazaX1HDkMgFQZA/TadvNd7eS',
    },
    seed: {
      encrypted:
        'NjnitueMNFqJ7qAJp0Apuco09WSxOspRPWvzeF2O5BNYOSGo31eFTk3RSVa3CriigaudSvfqxiQfIYW8hRI6Uotp/6AzBLxiQj1ZtWEovA+14n/Kq+O2ejFe+VvhwryJrJN/Yh2BkJgmx/t17jnpvLG5U+ChFn6GNnvI8TXaiNCG/LPyjbZYXyY8LWGULAe/dELbn3jl2FXkjowdSox4ltXqHRxdq4jaOJfvKW0YIiJZ0HP5OrpXZkPdaps0n+t0/fIU5t+sP4aaHZkrv/9oOOixS8RRWfW3gKbzI4oIJ48F28HAIGQYMWJxnthP39F6nzLGaxJg/wFP++mSDHpw==',
      hash: '$2b$10$R3ZBEFlWNny4P/wYF.kCd.ncRhkpr9nOQ9xUWdwrtG01bgsh7MJZe',
    },
    password: {
      salt: '$2b$11$NJjIZH/.DZfPfJ8EleBO',
      hash: '$2b$11$NJjIZH/.DZfPPgfJ8EleyL3syGpC.srI3cOq5SpatL9qt92Fk5G',
    },
    deleted: false,
    createdOn: '2021-11-23T12:54:03.380Z',
    modifiedOn: '2022-02-21T19:29:48.746Z',
    _id: '619ce46b71804b0015c91879',
    oldEmails: [],
    oldPhoneNumbers: [],
    did: 'did:ethr:0xf7e86a76695493d49ac7ea776bb45ce6bee57b25',
    firebaseId:
      'eS0cWPuos0E:APA91bGJU8yOOy56reGJSOlJMyeWuXWLjW4Ovvd8t4_OI-Irm7Ee2rTt-9N9j4VIXvebSayzuhUCxBrKOWSyvd7C45GFIeP1BwRAjU2A3ksD058ejWxnnUiObJxG-lYO_V0jGoZA_BD1',
    name: 'Name',
    lastname: 'LastName',
    __v: 0,
    imageId: '619fe3c3ef70010015bf207c',
    backupHash:
      'e9ad0e4490f5d2629017dbf85d87de65d1271118e502a5ac8e571412ed46ca47',
    imageUrl: 'https://api.qa.didi.org.ar/image/619fe3c3ef7001015bf207c',
    id: '619ce46b71804b0015c91879',
  },
};

const failVerifyToken = {
  status: 'error',
  errorCode: 'NOMATCH_USER_DID',
  message:
    'No se encontró ningún usuario con ese did, por favor verifique que sea correcto antes de volver a intentarlo.',
};

const invalidJWT = { status: 'error', message: 'Incorrect format JWT' };

const badRequest = {
  status: 400,
  statusText: 'Bad Request',
};

const createdCertResp = {
  status: 'success',
  data: [
    {
      data: [Object],
      split: false,
      deleted: false,
      createdOn: '2022-03-18T14:42:31.876Z',
      _id: '62349a57a0354898b85c1973',
      microCredentials: [],
      jwts: [],
      templateId: '62262ce12248912bdc580a36',
      __v: 0,
    },
  ],
};

const emmitedCertResp = {
  status: 'success',
  data: {
    data: { cert: [Array], participant: [Array], others: [] },
    _id: '62349a57a0354898b85c1973',
    split: false,
    deleted: false,
    createdOn: '2022-03-18T14:42:31.876Z',
    microCredentials: [],
    jwts: [],
    templateId: '62262ce12248912bdc580a36',
    __v: 0,
    emmitedOn: '2022-03-18T14:42:39.417Z',
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
  successRespEndOperation: {
    json: () => successBodyEndOperation,
  },
  successRespCreateCert: {
    json: () => createdCertResp,
  },
  successRespEmmitCert: {
    json: () => emmitedCertResp,
  },
  successVerifyToken: {
    json: () => successVerifyToken,
  },
  failVerifyToken: {
    json: () => failVerifyToken,
  },
  invalidJWT: {
    json: () => invalidJWT,
  },
  failResponse: {
    json: () => badRequest,
  },
};
