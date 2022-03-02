const request = require('supertest');

const app = require('../../src/server');

describe('get /cache', () => {
  it('responds with json', async () => {
    expect.assertions(0);
    await request(app)
      .get('/cache')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
