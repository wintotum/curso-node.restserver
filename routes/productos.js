const {  Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerUnProducto, borrarProducto, actualizarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo - categoria').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos   
], crearProducto );


 //Obtener todos las productos
 router.get('/', obtenerProductos);

//Obtener un producto por id .- publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerUnProducto);

// Actualizar producto - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    // check('categoria', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId),    
    validarCampos
],
 actualizarProducto);

// Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],
borrarProducto);



module.exports = router;