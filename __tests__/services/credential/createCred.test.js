jest.mock('node-fetch');
const fetch = require('node-fetch');

const { createCredential } = require('../../../src/services/CredentialService');

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
  successRespCreateCredential,
  invalidTemplateResp,
  extraElementResp,
  missingElementResp,
} = require('../mock/constants');

describe('services/cert/createCredential.test.js', () => {
  it('expect createCredential OK', async () => {
    expect.assertions(2);
    fetch.mockReturnValue(Promise.resolve(successRespCreateCredential));

    const { status, data } = await createCredential({
      data: personalData,
      did,
      templateId: personalTemplateId,
    });
    expect(status).toBe('success');
    expect(data[0].templateId).toBe(personalTemplateId);
  });

  it('expect createCredential FAIL on invalid template Id', async () => {
    expect.assertions(3);
    fetch.mockReturnValue(Promise.resolve(invalidTemplateResp));

    const { status, data } = await createCredential({
      data: personalData,
      did,
      templateId: invalidTemplateId,
    });

    expect(status).toBe('error');
    expect(data.code).toBe('TEMPLATE_GET');
    expect(data.message).toBe(
      'El modelo del certificado no pudo ser obtenido.',
    );
  });

  it('expect createCredential FAIL on extra parameter on certificate data', async () => {
    expect.assertions(3);
    fetch.mockReturnValue(Promise.resolve(extraElementResp));

    const { status, data } = await createCredential({
      data: extraElement,
      did,
      templateId: personalTemplateId,
    });
    expect(status).toBe('error');
    expect(data.code).toBe('EXTRA_ELEMENT');
    expect(data.message).toBe(
      'El campo DID no se encuentra en el modelo de certificado.',
    );
  });

  it('expect createCredential FAIL on missing parameter on certificate data', async () => {
    expect.assertions(3);
    fetch.mockReturnValue(Promise.resolve(missingElementResp));

    const { status, data } = await createCredential({
      data: missingElement,
      did,
      templateId: personalTemplateId,
    });

    expect(status).toBe('error');
    expect(data.code).toBe('MISSING_ELEMENT');
    expect(data.message).toBe(
      'El campo Credencial está faltando en el certificado.',
    );
  });

  it('expect createCredential to thrwo on missing personalData', async () => {
    expect.assertions(1);
    try {
      await createCredential({
        data: undefined,
        did,
        templateId: personalTemplateId,
      });
    } catch (error) {
      expect(error).toBe(missingData);
    }
  });
  it('expect createCredential to thrwo on missing did', async () => {
    expect.assertions(1);
    try {
      await createCredential({
        data: personalData,
        undefined,
        templateId: personalTemplateId,
      });
    } catch (error) {
      expect(error).toBe(missingDid);
    }
  });
  it('expect createCredential to thrwo on missing templateId', async () => {
    expect.assertions(1);
    try {
      await createCredential({
        data: personalData,
        did,
        templateId: undefined,
      });
    } catch (error) {
      expect(error).toBe(missingTemplateId);
    }
  });
});
