/* eslint-disable no-undef */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

const request = require('supertest');

const { app, server } = require('../../src/server');
const {
  newOperationData,
  jwtAuth,
  fileFront,
  fileBack,
  fileSelfie,
} = require('./vuUserInfoTest');

describe('finish operation to be OK', () => {
  afterAll(async () => {
    server.close();
  });

  it('responds final operation OK', async () => {
    expect.assertions(1);
    const res = await request(app)
      .post('/verification')
      .set('Authorization', jwtAuth)
      .send(newOperationData)
      .expect(200);

    const operationId = JSON.stringify(res.body.data.operationId);
    // GUARDO PARAMETROS NECESARIOS PARA LAS SIGUIENTES OPERACIONES.
    const params = {
      userName: res.body.data.userName,
      side: 'front',
      file: fileFront,
    };

    // AGREGO EL FRENDE LA IDENTIFICACION
    await request(app)
      .post(`/${operationId}/documentImage`)
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);

    // AGREGO EL BACK DE LA IDENTIFICACION
    params.side = 'back';
    params.file = fileBack;
    await request(app)
      .post(`/${operationId}/documentImage`)
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);

    // AGREGO LA SELDIE
    params.side = 'selfie';
    params.file = fileSelfie;
    await request(app)
      .post(`/${operationId}/documentImage`)
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);

    // FINALIZAR OPERACION
    await request(app)
      .patch(`/verification/${operationId}`)
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);

    const { did } = newOperationData;

    // CONSULTO ESTADO DE LA OPERACION
    await request(app)
      .get(`/verification/${did}/status`)
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200)
      .then((response) => {
        expect(response.body.data.status).toBe('Successful');
      });
  });
});

describe('cancel operation to be OK', () => {
  it('responds cancel operation OK', async () => {
    expect.assertions(1);
    const res = await request(app)
      .post('/verification')
      .set('Authorization', jwtAuth)
      .send(newOperationData)
      .expect(200);

    // GUARDO PARAMETROS NECESARIOS PARA LAS SIGUIENTES OPERACIONES.
    const params = {
      userName: res.body.data.userName,
    };
    const operationId = JSON.stringify(res.body.data.operationId);
    params.operationId = operationId;
    const { did } = newOperationData;

    // FINALIZAR OPERACION
    await request(app)
      .delete('/verification')
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200);

    // CONSULTAR ESTADO DE LA OPERACION
    await request(app)
      .get(`/verification/${did}/status`)
      .set('Authorization', jwtAuth)
      .send(params)
      .expect(200)
      .then((response) => {
        expect(response.body.data.status).toBe('Cancelled');
      });
  });
});
