const apicache = require('apicache');
const redis = require('redis');
const request = require('supertest');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const Constants = require('../constants/Constants');
const Messages = require('../constants/Messages');

const app = express();

const { NAME, VERSION, ENVIRONMENT } = require('../constants/Constants');

/**
 * Config de Swagger
 */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: NAME,
      description: `Corriendo en el ambiente: ${ENVIRONMENT}. Para más información, visite la [documentación](https://docs.didi.org.ar/).`,
      version: VERSION,
    },
    servers: [
      {
        url: '/',
      },
    ],
  },
  apis: ['./*.js', './routes/*.js'], // files containing annotations as above
};
const apiSpecification = swaggerJsdoc(options);
/**
 * @openapi
 * /api-docs:
 *   get:
 *     description: Welcome to the jungle!
 *     responses:
 *       200:
 *         description: Returns a mysterious webpage.
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpecification));

app.use(
  apicache
    .options({
      redisClient: redis.createClient(),
      debug: false,
      trackPerformance: true,
      respectCacheControl: false,
    })
    .middleware(),
);

app.get('/cache', (_, res) => {
  try {
    res.json({
      performance: apicache.getPerformance(),
      index: apicache.getIndex(),
    });
  } catch (e) {
    res.status(500);
  }
});

app.get('/:identityId', (req, res) => {
  res.status(200).json({ id: req.params.identityId });
});

request(app)
  .get('/:identityId')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '20')
  .expect(200)
  // eslint-disable-next-line func-names
  .end(function (err) {
    if (err) throw err;
  });

app.listen(Constants.PORT, () =>
  // eslint-disable-next-line no-console
  console.log(Messages.INDEX.MSG.RUNNING_ON + Constants.PORT),
);

module.exports = {
  app,
};
