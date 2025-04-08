/**
 * @swagger
 * tags:
 *   name: TFG
 *   description: Endpoints relacionados con el manejo de los objetos TFG
 */

const express = require("express");
const router = express.Router();

//Importo las funciones del controlador de usuario
const { getItems, getAllItems , createItem, validateTFG, getPendingItems, getItemsGrados, getItemsMasters} = require('../controllers/tfg');

//Importo la funcion de validacion de usuario
const {validatorCreateItem, validatorValidateitem} = require('../validators/tfg');

//Importo la función para sacar la sesion
const {authMiddleware, checkRol} = require('../middleware/session');


/**
 * @swagger
 * /api/tfg/getTFGs:
 *   get:
 *     summary: Retrieve all approved TFGs
 *     tags: [TFG]
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
 *     tags: [TFG]
 *     description: Retrieve a list of all TFGs from the database. Requires admin or coordinator role.
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
router.get("/getAllTFGs",authMiddleware,checkRol(["admin","coord"]),getAllItems);



//Ruta para obtener los tfg pendientes
/**
 * @swagger
 * /api/tfg/getPendingTFGs:
 *   get:
 *     summary: Retrieve all pending TFGs (admin only)
 *     tags: [TFG]
 *     description: Retrieve a list of all pending TFGs from the database. Requires admin or coordinator role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of pending TFGs.
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

router.get("/getPendingTFGs",authMiddleware,checkRol(["admin","coord"]) , getPendingItems);

//Ruta para crear un nuevo tfg
/**
 * @swagger
 * /api/tfg/createTFG:
 *   post:
 *     summary: Create a new TFG (admin only)
 *     tags: [TFG]
 *     description: Create a new TFG in the database. Requires admin or user role.
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
router.post("/createTFG",authMiddleware,checkRol(["admin","user"]),validatorCreateItem,createItem);


//Ruta para validar un tfg
/**
 * @swagger
 * /api/tfg/validateTFG:
 *   post:
 *     summary: Validate a TFG (admin only)
 *     tags: [TFG]
 *     description: Validate a TFG in the database. Requires admin or coordinator role.
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
router.post("/validateTFG",authMiddleware,checkRol(["admin","coord"]),validatorValidateitem ,validateTFG);



//Ruta para obtener los grados
/**
 * @swagger
 * /api/tfg/getTFGGrados:
 *   get:
 *     summary: Retrieve all TFG degrees
 *     tags: [TFG]
 *     description: Retrieve a list of all TFG degrees from the database. 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of TFG degrees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Server error.
 */
router.get("/getTFGGrados",authMiddleware,getItemsGrados);



//Ruta para obtener los masters
/**
 * @swagger
 * /api/tfg/getTFGMasters:
 *   get:
 *     summary: Retrieve all TFG masters
 *     tags: [TFG]
 *     description: Retrieve a list of all TFG masters from the database. 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of TFG masters.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Server error.
 */
router.get("getTFGMaster",authMiddleware,getItemsMasters);




//Ruta para obtener los tfg de un grado en concreto
/**
 * @swagger
 * /api/tfg/getTFGGrados/{TitulacionGrado}:
 *   get:
 *     summary: Retrieve TFG by degree
 *     tags: [TFG]
 *     description: Retrieve a list of TFGs by degree from the database.
 *     parameters:
 *       - in: path
 *        name: TitulacionGrado 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of TFG by degree.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Server error.
 */
router.get("/getTFGGrados/:TitulacionGrado",authMiddleware,getItemsGrados);


//Exporto el router de auth
module.exports = router