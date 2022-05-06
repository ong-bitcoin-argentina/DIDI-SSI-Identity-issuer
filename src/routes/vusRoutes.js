const router = require('express').Router();

const vus = require('../controllers/vus');

const { validateUser } = require('../middelwares/ValidateUser');
const Validator = require('../utils/Validator');
const Constants = require('../constants/Constants');

const { IS_STRING, IS_BOOLEAN } = Constants.VALIDATION_TYPES;

/**
 * @openapi
 * 	 /verifications:
 *   post:
 *     summary: Permite crear un nuevo trámite de validación de identidad de un usuario
 *     parameters:
 *       - in: header
 *         name: AuthorizationToken
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
  '/verifications',
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
 * 	 /verifications:
 *   delete:
 *     summary: Permite cancelar una operación pendiente de validación de identidad
 *     parameters:
 *       - in: header
 *         name: AuthorizationToken
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
  '/verifications',
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
 * 	 /verifications/{operationId}/documentImage:
 *   post:
 *     summary: Permite adherir el frente/dorso de un documento o selfie a una operación
 *     parameters:
 *       - in: header
 *         name: AuthorizationToken
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
  '/verifications/:operationId/documentImage',
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
 * 	 /verifications/{operationId}:
 *   patch:
 *     summary: Permite finalizar una operacion.
 *     parameters:
 *       - in: header
 *         name: AuthorizationToken
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
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
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
router.patch(
  '/verifications/:operationId',
  validateUser,
  Validator.validateBody([{ name: 'userName', validate: [IS_STRING] }]),
  Validator.checkValidationResult,
  vus.finishOperation,
);

/**
 * @openapi
 * 	 /verifications/{did}:
 *   get:
 *     summary: Permite obtener el estado del trámite/operación.
 *     parameters:
 *       - in: header
 *         name: AuthorizationToken
 *         schema:
 *           type: string
 *         required: true
 *       - name: did
 *         in: path
 *         required: true
 *         schema:
 *           type : string
 *     responses:
 *       200:
 *         description: Puede devolver ok o error en algun parametro
 *       401:
 *         description: Acción no autorizada
 *       500:
 *         description: Error interno del servidor
 *
 */
router.get(
  '/verifications/:did',
  validateUser,
  Validator.checkValidationResult,
  Validator.validateParams,
  vus.getStatus,
);

/**
 * @openapi
 * 	 /verifications/{operationId}/{userName}:
 *   get:
 *     summary: Permite traer los datos del documento analizado.
 *     parameters:
 *       - in: header
 *         name: AuthorizationToken
 *         schema:
 *           type: string
 *         required: true
 *       - name: operationId
 *         in: path
 *         required: true
 *         schema:
 *           type : string
 *       - name: userName
 *         in: path
 *         required: true
 *         schema:
 *           type : string
 *     responses:
 *       200:
 *         description: Puede devolver ok o error en algun parametro
 *       401:
 *         description: Acción no autorizada
 *       500:
 *         description: Error interno del servidor
 *
 */
router.get(
  '/verifications/:operationId/:userName',
  validateUser,
  Validator.checkValidationResult,
  Validator.validateParams,
  vus.getInformation,
);

module.exports = router;
