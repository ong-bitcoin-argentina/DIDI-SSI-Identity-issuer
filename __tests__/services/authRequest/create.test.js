const mongoose = require('mongoose');
const AuthRequestModel = require('../../../src/models/AuthRequest');

const { create } = require('../../../src/services/AuthRequestService');
const { missingOperationId } = require('../../../src/constants/serviceErrors');

const { MONGO_URI } = require('../../../src/constants/Constants');
const { authRequestData } = require('./constants');

describe('services/AuthRequest/create.test.js', () => {
  beforeAll(async () => {
    mongoose.connect(MONGO_URI);
  });
  afterAll(async () => {
    await AuthRequestModel.deleteOne({ did: authRequestData.did });
    await mongoose.connection.close();
  });

  it('expect create to throw on missing operationId', async () => {
    expect.assertions(1);
    try {
      await create({ operationId: undefined, userDid: 'userDid' });
    } catch (e) {
      expect(e.code).toBe(missingOperationId.code);
    }
  });

  it('expect create to create', async () => {
    expect.assertions(2);
    const result = await create(authRequestData);
    expect(result.operationId).toBe(authRequestData.operationId);
    expect(result.did).toBe(authRequestData.did);
  });
});

describe('services/AuthRequest/create fail', () => {
  it('expect create to fail', async () => {
    expect.assertions(1);
    try {
      await create(authRequestData);
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });
});
