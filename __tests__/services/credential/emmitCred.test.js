jest.mock('node-fetch');
const fetch = require('node-fetch');

const {
  createCredential,
  emmitCredential,
} = require('../../../src/services/CredentialService');

const { missingId } = require('../../../src/constants/serviceErrors');
const { personalData, personalTemplateId, did } = require('./constants');
const {
  successRespCreateCredential,
  successRespEmmitCredential,
  failRespEmmitCredential,
} = require('../mock/constants');

describe('services/cert/emmitCredential.test.js', () => {
  it('expect verifyToken OK', async () => {
    expect.assertions(3);

    fetch.mockReturnValue(Promise.resolve(successRespCreateCredential));
    const { data } = await createCredential({
      personalData,
      did,
      personalTemplateId,
    });

    const { _id: id } = data[0];

    fetch.mockReturnValue(Promise.resolve(successRespEmmitCredential));
    const { status, data: emmitedData } = await emmitCredential({ id });

    expect(status).toBe('success');
    expect(emmitedData.templateId).toBe(personalTemplateId);
    expect(emmitedData.emmitedOn).not.toBeNull();
  });

  it('expect verifyToken FAIL', async () => {
    expect.assertions(3);
    const id = '123456';
    fetch.mockReturnValue(Promise.resolve(failRespEmmitCredential));
    const { status, data } = await emmitCredential({ id });
    expect(status).toBe('error');
    expect(data.code).toBe('CERT_GET');
    expect(data.message).toBe('El certificado no pudo ser obtenido.');
  });

  it('expect emmitCredential to thrwo on missing did', async () => {
    expect.assertions(1);
    try {
      await emmitCredential({ undefined });
    } catch (error) {
      expect(error).toBe(missingId);
    }
  });
});
