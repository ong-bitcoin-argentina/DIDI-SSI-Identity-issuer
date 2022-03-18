jest.mock('node-fetch');
const fetch = require('node-fetch');

const { createCert, emmitCert } = require('../../../src/services/CertService');

const { missingId } = require('../../../src/constants/serviceErrors');
const { personalData, personalTemplateId, did } = require('./constants');
const {
  successRespCreateCert,
  successRespEmmitCert,
  failRespEmmitCert,
} = require('../mock/constants');

describe('services/cert/emmitCert.test.js', () => {
  it('expect verifyToken OK', async () => {
    expect.assertions(3);

    fetch.mockReturnValue(Promise.resolve(successRespCreateCert));
    const { data } = await createCert(personalData, did, personalTemplateId);

    const { _id: id } = data[0];

    fetch.mockReturnValue(Promise.resolve(successRespEmmitCert));
    const { status, data: emmitedData } = await emmitCert(id);

    expect(status).toBe('success');
    expect(emmitedData.templateId).toBe(personalTemplateId);
    expect(emmitedData.emmitedOn).not.toBeNull();
  });

  it('expect verifyToken FAIL', async () => {
    expect.assertions(3);
    const id = '123456';
    fetch.mockReturnValue(Promise.resolve(failRespEmmitCert));
    const { status, data } = await emmitCert(id);
    expect(status).toBe('error');
    expect(data.code).toBe('CERT_GET');
    expect(data.message).toBe('El certificado no pudo ser obtenido.');
  });

  it('expect emmitCert to thrwo on missing did', async () => {
    expect.assertions(1);
    try {
      await emmitCert(undefined);
    } catch (error) {
      expect(error).toBe(missingId);
    }
  });
});
