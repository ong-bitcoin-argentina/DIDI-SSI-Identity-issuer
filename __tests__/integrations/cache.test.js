const request = require('supertest');

const { app, server } = require('../../src/server');

describe('get /cache', () => {
  afterAll(async () => {
    server.close();
  });
  it('responds with json', async () => {
    expect.assertions(0);
    await request(app)
      .get('/cache')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
