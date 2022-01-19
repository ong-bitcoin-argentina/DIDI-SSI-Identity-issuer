const router = require('express').Router();

// const Validator = require('../utils/Validator');
// const Constants = require('../constants/Constants');
const vus = require('../controllers/vus');

/**
 * @openapi
 * 	 /createVerification:
 *   post:
 *     summary: Permite validar la identidad de un usuario contra vu Security
 *     requestBody:
 *       required:
 *         - did
 *         - userName
 *         - ipAddress
 *         - deviceHash
 *         - rooted
 *         - applicationVersion
 *         - operativeSystem
 *         - operativesystemVersion
 *         - deviceManufacturer
 *         - deviceName
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               did:
 *                  type: string
 *               userName:
 *                  type: string
 *               deviceHash:
 *                  type: string
 *               rooted:
 *                  type: boolean
 *                  default: false
 *               operativeSystem:
 *                  type: string
 *               operativeSystemVersion:
 *                  type: string
 *               deviceManufacturer:
 *                  type: string
 *               deviceName:
 *                  type: string
 *     responses:
 *       200:
 *         description: Puede devolver ok o error en algun parametro
 *       401:
 *         description: Acción no autorizada
 *       500:
 *         description: Error interno del servidor
 *
 */
router.post('/createVerification', vus.createVerification);

/**
 * @openapi
 * 	 /cancelVerification:
 *   post:
 *     summary: Permite validar la identidad de un usuario contra vu Security
 *     requestBody:
 *       required:
 *         - userName
 *         - operationId
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                  type: string
 *               operationId:
 *                  type: string
 *     responses:
 *       200:
 *         description: Puede devolver ok o error en algun parametro
 *       401:
 *         description: Acción no autorizada
 *       500:
 *         description: Error interno del servidor
 *
 */
router.post(
  '/cancelVerification',

  vus.cancelVerification,
);

module.exports = router;
