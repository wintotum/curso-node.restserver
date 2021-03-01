
const { check } = require('express-validator');
const {  Router } = require('express');

const { 
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole,
} = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuario } = require('../helpers/db-validators');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre',"El nombre es obligado").not().isEmpty(),
    check('correo','El correo no es válido').isEmail(),
    check('password','El password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
    check('rol').custom(esRoleValido), 
    check('correo').custom(emailExiste),
    validarCampos 
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(esRoleValido), 
    validarCampos
],
 usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos
], usuariosDelete);




module.exports = router;