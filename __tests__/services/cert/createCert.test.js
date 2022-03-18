const { createCert } = require('../../../src/services/CertService');

// const {
//   missingData,
//   missingDid,
//   missingTemplateId,
// } = require('../../../src/constants/serviceErrors');

const { personalData, personalTemplateId, did } = require('./constants');

describe('services/cert/createCert.test.js', () => {
  it('expect verifyToken OK', async () => {
    expect.assertions(2);

    const { status, data } = await createCert(
      personalData,
      did,
      personalTemplateId,
    );

    expect(status).toBe('success');
    expect(data[0].templateId).toBe(personalTemplateId);
  });
});
