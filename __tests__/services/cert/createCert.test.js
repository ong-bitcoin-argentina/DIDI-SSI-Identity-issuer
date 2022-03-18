jest.mock('node-fetch');
const fetch = require('node-fetch');

const { createCert } = require('../../../src/services/CertService');

const {
  missingData,
  missingDid,
  missingTemplateId,
} = require('../../../src/constants/serviceErrors');

const { personalData, personalTemplateId, did } = require('./constants');
const { successRespCreateCert } = require('../mock/constants');

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
