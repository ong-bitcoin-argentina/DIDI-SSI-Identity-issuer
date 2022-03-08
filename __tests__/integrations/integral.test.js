/* eslint-disable jest/no-disabled-tests */
const request = require('supertest');

const app = require('../../src/server');
const { newOperationData, jwtAuth } = require('./constants');
const { fileFront, fileBack, fileSelfie } = require('./filesConstants');

describe('finish operation to be OK', () => {
  it.skip('responds final operation OK', async () => {
    expect.assertions(0);
    const res = await request(app)
      .post('/vuSecurity/createVerification')
      .set('Authorization', jwtAuth)
      .send(newOperationData)
      .expect(200);

    // PARAMS
    const params = {
      operationId: JSON.stringify(res.body.data.operationId),
      userName: res.body.data.userName,
      side: 'front',
      file: fileFront,
    };

    // ADD FRONT DOCUMENT IMAGE
    await request(app)
      .post('/vuSecurity/addDocumentImage')
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);

    // ADD BACK DOCUMENT IMAGE
    params.side = 'back';
    params.file = fileBack;
    await request(app)
      .post('/vuSecurity/addDocumentImage')
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);

    // ADD SELFIE
    params.side = 'selfie';
    params.file = fileSelfie;
    await request(app)
      .post('/vuSecurity/addDocumentImage')
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);

    // FINALIZAR OPERACION
    await request(app)
      .post('/vuSecurity/finishOperation')
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);
  });
});

describe('cancel operation to be OK', () => {
  it.skip('responds cancel operation OK', async () => {
    expect.assertions(0);
    const res = await request(app)
      .post('/vuSecurity/createVerification')
      .set('Authorization', jwtAuth)
      .send(newOperationData)
      .expect(200);

    // PARAMS
    const params = {
      operationId: JSON.stringify(res.body.data.operationId),
      userName: res.body.data.userName,
    };

    // FINALIZAR OPERACION
    await request(app)
      .post('/vuSecurity/cancelVerification')
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);
  });
});