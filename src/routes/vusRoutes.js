const router = require('express').Router();

const Constants = require('../constants/Constants');
const vus = require('../controllers/vus');
const Validator = require('../utils/Validator');

const { IS_STRING, IS_BOOLEAN } = Constants.VALIDATION_TYPES;

/**
 * @openapi
 * 	 /vuSecurity/createVerification:
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
 *         application/json:
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
router.post(
  '/createVerification',
  Validator.validateBody([
    { name: 'did', validate: [IS_STRING] },
    { name: 'userName', validate: [IS_STRING] },
    { name: 'deviceHash', validate: [IS_STRING] },
    { name: 'rooted', validate: [IS_BOOLEAN] },
    { name: 'operativeSystem', validate: [IS_STRING] },
    { name: 'operativeSystemVersion', validate: [IS_STRING] },
    { name: 'deviceManufacturer', validate: [IS_STRING] },
    { name: 'deviceName', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.createVerification,
);

/**
 * @openapi
 * 	 /vuSecurity/cancelVerification:
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
  Validator.validateBody([
    { name: 'userName', validate: [IS_STRING] },
    { name: 'operationId', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.cancelVerification,
);

/**
 * @openapi
 * 	 /vuSecurity/frontImage:
 *   post:
 *     summary: Permite adherir el frente de un documento
 *     requestBody:
 *       required:
 *         - userName
 *         - operationId
 *         - file
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                  type: string
 *               operationId:
 *                  type: string
 *               file:
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
  '/frontImage',
  Validator.validateBody([
    { name: 'userName', validate: [IS_STRING] },
    { name: 'operationId', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.frontImage,
);

module.exports = router;
