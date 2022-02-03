const apicache = require('apicache');
const redis = require('redis');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

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
      redisClient: redis.createClient({ REDIS_URI }),
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

app.use('/api', routes);
app.use('*', (req, res) =>
  res.status(404).json({
    status: 'error',
    errorCode: 'INVALID_ROUTE',
    message: 'La ruta no existe.',
  }),
);

module.exports = app;
