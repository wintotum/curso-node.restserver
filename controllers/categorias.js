const { response } = require("express");
const { Categoria } = require('../models');

const crearCategoria = async ( req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }

    // Generar la data para guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Guardar db
    await categoria.save();

    res.status(201).json(categoria);

}

// Obtener Categorias - paginado - total registros - populate {}
const categoriasGet = async (req = request, res = response ) =>  {
    
    const { limite = 5, desde = 0 } = req.query;
    query = { estado: true };
    
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.json({
        total,
        categorias
    });
}    


// Obtener una Categoria - populate {}
const obtenerCategoria = async ( req, res = response ) => {
    
    const  { id } = req.params;
    const categoria = await (await Categoria.findById( id )).populate('usuario','nombre');

    res.json( categoria );


}

// Actualizar Categoria, se puede cambiar el nombre 
const categoriasPut =  async (req, res = response ) =>  {    
    
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, resto, { new: true } );

    res.json( categoria );
}    

// Borrar categoria - estado: false
const borrarCategoria = async(req, res = response ) => {
 
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json( categoriaBorrada );
    
}


module.exports = {
    crearCategoria,
    categoriasPut,
    categoriasGet,
    obtenerCategoria,
    borrarCategoria
}