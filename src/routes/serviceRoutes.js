const router = require('express').Router();
const ResponseHandler = require('../utils/ResponseHandler');
const Constants = require('../constants/Constants');

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
  const { NAME, ENVIRONMENT, VERSION } = Constants;

  ResponseHandler.sendRes(res, {
    environment: ENVIRONMENT,
    name: NAME,
    version: VERSION,
  });
});

module.exports = router;
