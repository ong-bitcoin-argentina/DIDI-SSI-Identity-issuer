const router = require('express').Router();

const { validateUser } = require('../middelwares/ValidateUser');
const Constants = require('../constants/Constants');
const vus = require('../controllers/vus');
const Validator = require('../utils/Validator');

const { IS_STRING, IS_BOOLEAN } = Constants.VALIDATION_TYPES;

/**
 * @openapi
 * 	 /vuSecurity/createVerification:
 *   post:
 *     summary: Permite validar la identidad de un usuario contra vu Security
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
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
  validateUser,
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
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
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
  validateUser,
  Validator.validateBody([
    { name: 'userName', validate: [IS_STRING] },
    { name: 'operationId', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.cancelVerification,
);

/**
 * @openapi
 * 	 /vuSecurity/addDocumentImage:
 *   post:
 *     summary: Permite adherir la imagen del documento
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
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
  '/addDocumentImage',
  validateUser,
  Validator.validateBody([
    { name: 'userName', validate: [IS_STRING] },
    { name: 'operationId', validate: [IS_STRING] },
    { name: 'file', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.addDocumentImage,
);

/**
 * @openapi
 * 	 /vuSecurity/addImage:
 *   post:
 *     summary: Permite adherir el dorso de un documento
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
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
 *               side:
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
  '/addImage',
  validateUser,
  Validator.validateBody([
    { name: 'userName', validate: [IS_STRING] },
    { name: 'operationId', validate: [IS_STRING] },
    { name: 'file', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.addImage,
);

module.exports = router;
