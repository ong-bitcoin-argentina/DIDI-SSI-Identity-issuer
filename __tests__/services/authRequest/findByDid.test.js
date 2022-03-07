const mongoose = require('mongoose');
const AuthRequestModel = require('../../../src/models/AuthRequest');

const { findByDid } = require('../../../src/services/AuthRequestService');
const { missingDid } = require('../../../src/constants/serviceErrors');

const { MONGO_URI } = require('../../../src/constants/Constants');
const { authRequestData } = require('./constants');

describe('services/AuthRequest/findByDid.test.js', () => {
  beforeAll(async () => {
    mongoose.connect(MONGO_URI);
    await AuthRequestModel.generate(
      authRequestData.operationId,
      authRequestData.did,
    );
  });
  afterAll(async () => {
    await AuthRequestModel.deleteOne({ did: authRequestData.did });
    await mongoose.connection.close();
  });

  it('expect findByDid to throw on missing did', async () => {
    expect.assertions(1);
    try {
      await findByDid(undefined);
    } catch (e) {
      expect(e.code).toMatch(missingDid.code);
    }
  });

  it('expect findByDid to find', async () => {
    expect.assertions(1);
    const result = await findByDid(authRequestData.did);
    expect(result).toMatch(authRequestData.operationId);
  });
});
