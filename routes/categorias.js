const {  Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria,
        categoriasPut,
        categoriasGet,
        obtenerCategoria,
        borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


/**
 * {{url}}/api/categorias
 */

 //Obtener todas las categorias -público
 router.get('/', categoriasGet);


//Obtener una categoria por id .- publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos   
], crearCategoria );

// Actualizar categoria - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),    
    validarCampos
],
 categoriasPut);

// router.put('/:id', ( req, res ) => {
//     res.json('put');
// });

// Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],
borrarCategoria);

module.exports = router;