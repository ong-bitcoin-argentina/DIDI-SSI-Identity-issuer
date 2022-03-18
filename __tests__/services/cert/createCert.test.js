jest.mock('node-fetch');
const fetch = require('node-fetch');

const { createCert } = require('../../../src/services/CertService');

const {
  missingData,
  missingDid,
  missingTemplateId,
} = require('../../../src/constants/serviceErrors');

const {
  personalData,
  personalTemplateId,
  did,
  invalidTemplateId,
  extraElement,
  missingElement,
} = require('./constants');
const {
  successRespCreateCert,
  invalidTemplateResp,
  extraElementResp,
  missingElementResp,
} = require('../mock/constants');

describe('services/cert/createCert.test.js', () => {
  it('expect createCert OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successRespCreateCert));

    const { status, data } = await createCert(
      personalData,
      did,
      personalTemplateId,
    );
    expect(status).toBe('success');
    expect(data[0].templateId).toBe(personalTemplateId);
  });

  it('expect createCert FAIL on invalid template Id', async () => {
    expect.assertions(3);
    fetch.mockReturnValue(Promise.resolve(invalidTemplateResp));

    const { status, data } = await createCert(
      personalData,
      did,
      invalidTemplateId,
    );

    expect(status).toBe('error');
    expect(data.code).toBe('TEMPLATE_GET');
    expect(data.message).toBe(
      'El modelo del certificado no pudo ser obtenido.',
    );
  });

  it('expect createCert FAIL on extra parameter on certificate data', async () => {
    expect.assertions(3);
    fetch.mockReturnValue(Promise.resolve(extraElementResp));

    const { status, data } = await createCert(
      extraElement,
      did,
      personalTemplateId,
    );
    expect(status).toBe('error');
    expect(data.code).toBe('EXTRA_ELEMENT');
    expect(data.message).toBe(
      'El campo DID no se encuentra en el modelo de certificado.',
    );
  });

  it('expect createCert FAIL on missing parameter on certificate data', async () => {
    expect.assertions(3);
    fetch.mockReturnValue(Promise.resolve(missingElementResp));

    const { status, data } = await createCert(
      missingElement,
      did,
      personalTemplateId,
    );

    expect(status).toBe('error');
    expect(data.code).toBe('MISSING_ELEMENT');
    expect(data.message).toBe(
      'El campo Credencial está faltando en el certificado.',
    );
  });

  it('expect createCert to thrwo on missing personalData', async () => {
    expect.assertions(1);
    try {
      await createCert(undefined, did, personalTemplateId);
    } catch (error) {
      expect(error).toBe(missingData);
    }
  });
  it('expect createCert to thrwo on missing did', async () => {
    expect.assertions(1);
    try {
      await createCert(personalData, undefined, personalTemplateId);
    } catch (error) {
      expect(error).toBe(missingDid);
    }
  });
  it('expect createCert to thrwo on missing templateId', async () => {
    expect.assertions(1);
    try {
      await createCert(personalData, did, undefined);
    } catch (error) {
      expect(error).toBe(missingTemplateId);
    }
  });
});
