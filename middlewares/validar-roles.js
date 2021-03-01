const { response } = require("express");

const esAdminRole = ( req, res = response, next)  => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere validar el role sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No autorizado` 
        });
    }

    next();
}

const tieneRole = ( ...roles ) => {

    return ( req, res = response, next ) => {
        // console.log(roles, req.usuario.rol);
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere validar el role sin validar el token primero'
            });
        }

        if ( !roles.includes ( req.usuario.rol )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
    

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}