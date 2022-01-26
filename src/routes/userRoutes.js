const router = require('express').Router();

const Validator = require('../utils/Validator');
const Constants = require('../constants/Constants');
const user = require('../controllers/user');

const { IS_STRING } = Constants.VALIDATION_TYPES;

/**
 * @openapi
 *   /vuSecurity/registerUser:
 *   post:
 *     summary: Genera usuario.
 *     requestBody:
 *       required:
 *         - did
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               did:
 *                 type: string
 *     responses:
 *       200:
 *         description: Puede devolver ok o error en algun parametro
 *       401:
 *         description: Acción no autorizada
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  '/registerUser',
  Validator.validateBody([{ name: 'did', validate: [IS_STRING] }]),
  Validator.checkValidationResult,
  user.createUser,
);

module.exports = router;
