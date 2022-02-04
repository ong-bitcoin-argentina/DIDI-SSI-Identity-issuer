const apicache = require('apicache');
const client = require('redis').createClient;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const mongoose = require('mongoose');
const limiter = require('express-limiter');

const app = express();

limiter({
  path: '*',
  method: 'all',
  lookup: 'connection.remoteAddress',
  // 150 requests per hour
  total: 150,
  expire: 1000 * 60 * 60,
});

// aumentar el tamaño de request permitido para poder recibir la imagen en base64
app.use(express.json({ limit: '10mb' }));

const {
  NAME,
  VERSION,
  ENVIRONMENT,
  REDIS_URI,
  MONGO_URI,
} = require('./constants/Constants');
const Messages = require('./constants/Messages');

const routes = require('./routes/index');

mongoose
  .connect(MONGO_URI)
  // eslint-disable-next-line no-console
  .then(() => console.log(Messages.INDEX.MSG.CONNECTED))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(Messages.INDEX.ERR.CONNECTION + err.message);
  });

/**
 * Config de Swagger
 */
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: NAME,
      description: `Corriendo en el ambiente: ${ENVIRONMENT}. Para más información, visite la [documentación](https://docs.didi.org.ar/).`,
      version: VERSION,
    },
    servers: [
      {
        url: '/api',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
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
      redisClient: client({ url: REDIS_URI }),
      debug: true,
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

app.use('/api', routes);

module.exports = app;
