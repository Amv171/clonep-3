/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Endpoints relacionados con los usuarios
 */


const express = require("express");
const router = express.Router();

//Importo las funciones del controlador de usuario
const { getItems, deleteItemAdmin } = require('../controllers/user');

//Importo la funcion de validacion de usuario
const {validatorCreateItem, validatorDeleteItem} = require('../validators/user');

//Importo la funcion de autenticacion
const {authMiddleware, checkRol} = require('../middleware/session');







//Ruta para eliminar un usuario
/**
 * @swagger
 * /api/user/deleteUser:
 *   post:
 *     summary: Delete a user (admin only)
 *     tags: [Users]
 *     description: Deletes a user from the database. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Bad request. Validation failed.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       403:
 *         description: Forbidden. User does not have the required role.
 *       500:
 *         description: Server error.
 */
router.post("/deleteUser", validatorDeleteItem, authMiddleware, checkRol(["admin"]), deleteItemAdmin);


//Exporto el router de auth
module.exports = router