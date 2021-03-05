const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');


const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está en la BD`)
    }
}


// Verificar si el correo existe
const emailExiste = async( correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo: ${correo}, ya está registrado en la BD`)
    }
}

// Verificar si el id existe
const existeUsuario = async( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El id: ${id}, no existe en la BD`)
    }
}

// Verificar si el id de categoria existe
const existeCategoriaPorId = async( id ) => {

    const existeCategoria = await Categoria.findById( id );
    if( !existeCategoria ){
        throw new Error(`El id: ${id} de categoria, no existe en la BD`)        
    }
    
}

// Verificar si el id de producto existe
const existeProductoPorId = async( id ) => {

    console.log('id del producto', id );
    const existeProducto = await Producto.findById( id );
    if( !existeProducto ){
        throw new Error(`El id: ${id} de producto, no existe en la BD`)        
    }
    
}


module.exports = { 
    esRoleValido,
    emailExiste,
    existeUsuario,
    existeCategoriaPorId,
    existeProductoPorId
}