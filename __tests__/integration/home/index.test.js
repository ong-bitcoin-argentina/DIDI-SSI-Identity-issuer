const request = require('supertest');
const app = require('../../../src/server');

describe('gET identityId', () => {
  it('oK', async () => {
    expect.assertions(1);
    expect(true).toBeTruthy();
  });

  it('should respond 200 ok', async () => {
    expect.assertions(1);
    const response = await request(app).get('/identityId');
    expect(response.status).toBe(200);
  });
});

describe('gET /identityId', () => {
  it('responds with json', async () => {
    expect.assertions(0);
    await request(app)
      .get('/identityId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
