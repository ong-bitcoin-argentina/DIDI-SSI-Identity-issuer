const router = require('express').Router();
const user = require('../controllers/user');

/**
 * @openapi
 *   /registerUser:
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
router.post('/registerUser', user.createUser);

module.exports = router;
