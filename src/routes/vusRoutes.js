const router = require('express').Router();

const vus = require('../controllers/vus');

const { validateUser } = require('../middelwares/ValidateUser');
const Validator = require('../utils/Validator');
const Constants = require('../constants/Constants');

const { IS_STRING, IS_BOOLEAN } = Constants.VALIDATION_TYPES;

/**
 * @openapi
 * 	 /vuSecurity/verification:
 *   post:
 *     summary: Permite crear un nuevo trámite de validación de identidad de un usuario
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
  '/verification',
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
 * 	 /vuSecurity/verification:
 *   delete:
 *     summary: Permite cancelar una operación pendiente de validación de identidad
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
router.delete(
  '/verification',
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
 * 	 /vuSecurity/{operationId}/documentImage:
 *   post:
 *     summary: Permite adherir el frente/dorso de un documento o selfie a una operación
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - name: operationId
 *         in: path
 *         required: true
 *         schema:
 *           type : string
 *     requestBody:
 *       required:
 *         - userName
 *         - file
 *         - side
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
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
  '/:operationId/documentImage',
  validateUser,
  Validator.validateBody([
    { name: 'userName', validate: [IS_STRING] },
    { name: 'file', validate: [IS_STRING] },
    { name: 'side', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.addDocumentImage,
);

/**
 * @openapi
 * 	 /vuSecurity/finishOperation:
 *   post:
 *     summary: Permite finalizar una operacion.
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
  '/finishOperation',
  validateUser,
  Validator.validateBody([
    { name: 'userName', validate: [IS_STRING] },
    { name: 'operationId', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.finishOperation,
);

/**
 * @openapi
 * 	 /vuSecurity/getStatus:
 *   post:
 *     summary: Permite obtener el estado del trámite/operación.
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
  '/getStatus',
  validateUser,
  Validator.validateBody([
    { name: 'userName', validate: [IS_STRING] },
    { name: 'operationId', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.getStatus,
);

/**
 * @openapi
 * 	 /vuSecurity/getInformation:
 *   post:
 *     summary: Permite traer los datos del documento analizado.
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
  '/getInformation',
  validateUser,
  Validator.validateBody([
    { name: 'userName', validate: [IS_STRING] },
    { name: 'operationId', validate: [IS_STRING] },
  ]),
  Validator.checkValidationResult,
  vus.getInformation,
);

module.exports = router;
