const express = require("express");
const router = express.Router();

//Importo las funciones del controlador de usuario
const { getItems, getAllItems , createItem, validateTFG} = require('../controllers/tfg');

//Importo la funcion de validacion de usuario
const {validatorCreateItem, validatorValidateitem} = require('../validators/tfg');

//Importo la función para sacar la sesion
const {authMiddleware, checkRol} = require('../middleware/session');


/**
 * @swagger
 * /api/tfg/getTFGs:
 *   get:
 *     summary: Retrieve all approved TFGs
 *     description: Retrieve a list of all TFGs from the database which are approved.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of approved TFGs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TFG'
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Server error.
 */
router.get("/getTFGs", getItems);



//Ruta para obtener los tfg aprobados


/**
 * @swagger
 * /api/tfg/getAllTFGs:
 *   get:
 *     summary: Retrieve all TFGs (admin only)
 *     description: Retrieve a list of all TFGs from the database. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of TFGs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TFG'
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Server error.
 */
router.get("/getAllTFGs",authMiddleware,checkRol(["admin"]),getAllItems);

//Ruta para crear un nuevo tfg
/**
 * @swagger
 * /api/tfg/createTFG:
 *   post:
 *     summary: Create a new TFG (admin only)
 *     description: Create a new TFG in the database. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TFG'
 *     responses:
 *       200:
 *         description: TFG created successfully.
 *       400:
 *         description: Bad request. Validation failed.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Server error.
 */
router.post("/createTFG",authMiddleware,checkRol(["admin"]),validatorCreateItem,createItem);


//Ruta para validar un tfg
/**
 * @swagger
 * /api/tfg/validateTFG:
 *   post:
 *     summary: Validate a TFG (admin only)
 *     description: Validate a TFG in the database. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TituloTFG:
 *                 type: string
 *                 description: The title of the TFG to validate.
 *     responses:
 *       200:
 *         description: TFG validated successfully.
 *       400:
 *         description: Bad request. Validation failed.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Server error.
 */
router.post("/validateTFG",authMiddleware,checkRol(["admin"]),validatorValidateitem ,validateTFG);



//Exporto el router de auth
module.exports = router