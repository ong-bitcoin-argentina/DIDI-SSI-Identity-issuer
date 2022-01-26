const apicache = require('apicache');
const redis = require('redis');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const express = require('express');
const mongoose = require('mongoose');

const multer = require('multer');

const app = express();

app.use(express.json());

const { NAME, VERSION, ENVIRONMENT } = require('./constants/Constants');
const Constants = require('./constants/Constants');
const Messages = require('./constants/Messages');

const routes = require('./routes/index');

const fileStorage = multer.diskStorage({
  // eslint-disable-next-line no-empty-pattern
  filename: ({}, file, callback) => {
    const filename = 'pic';
    callback(null, filename);
  },
});

app.use(
  multer({
    storage: fileStorage,
  }).single('file'),
);

mongoose
  .connect(Constants.DB_URI)
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

app.use('/api', routes);

module.exports = app;
