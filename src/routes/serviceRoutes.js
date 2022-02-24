const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const apicache = require('apicache');

const { client } = require('../services/RedisService');
const ResponseHandler = require('../utils/ResponseHandler');
const apiSpecification = require('./utils/swaggerConfig');
const { NAME, VERSION, ENVIRONMENT } = require('../constants/Constants');

/**
 * @openapi
 * /:
 *   get:
 *     summary: Bienvenida al Servidor de Identidad.
 *     description: Descripcion de variables internas.
 *     responses:
 *       200:
 *         description: Returns a mysterious JSON.
 */
router.get('/', (_, res) => {
  ResponseHandler.sendRes(res, {
    environment: ENVIRONMENT,
    name: NAME,
    version: VERSION,
  });
});

/**
 * @openapi
 * /api-docs:
 *   get:
 *     description: Documentación de rutas de la api
 *     responses:
 *       200:
 *         description: Returns a mysterious webpage.
 */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpecification));

router.use(
  apicache
    .options({
      redisClient: client,
      debug: false,
      trackPerformance: true,
      respectCacheControl: false,
    })
    .middleware(),
);

/**
 * @openapi
 * /cache:
 *   get:
 *     description: Información sobre la cache
 *     responses:
 *       200:
 *         description: Returns a mysterious webpage.
 */
router.get('/cache', (_, res) => {
  try {
    res.json({
      performance: apicache.getPerformance(),
      index: apicache.getIndex(),
    });
  } catch (e) {
    res.status(500);
  }
});

module.exports = router;
