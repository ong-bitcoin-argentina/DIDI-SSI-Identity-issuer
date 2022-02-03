const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../../src/server');

describe('get /cache', () => {
  // eslint-disable-next-line jest/no-hooks
  afterAll(() => {
    server.close();
    mongoose.connection.close();
  });
  it('responds with json', async () => {
    expect.assertions(0);
    // this.timeout(500);
    await request(app)
      .get('/cache')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
