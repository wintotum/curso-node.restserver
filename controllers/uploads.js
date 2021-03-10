const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const { subirArchivo } = require('../helpers');

const { Usuario, Producto} = require('../models');

const cargarArchivo = async( req, res = response ) => {

    try {
      
      // Imágenes, txt, md o los que quieras
      // const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
      const nombre = await subirArchivo( req.files, undefined, 'imgs' );
  
      res.json({ nombre });

    } catch ( msg ) {
      res.status(400).json({ msg });      
    }
   
}

const actualizarImagenCloudinary = async( req, res = response ) => {

  const { id, coleccion } = req.params;

  console.log('coleccion->',coleccion);

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById( id );
      if ( !modelo ) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${ id }`
        });
      }
      
    break;

    case 'productos':
      modelo = await Producto.findById( id );
      if ( !modelo ) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${ id }`
        });
      }
      
      break;      
  
    default:
      return resizeTo.status(500).json({ msg: 'Se me olvidó validar esto'});
   
  }

  // Limpiar imágenes
  if ( modelo.img ) {
    // Borrar imagen del servidor
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[ nombreArr.length - 1];
    const [ public_id ] = nombre.split('.');
    cloudinary.uploader.destroy( public_id );    

  }

  // console.log(req.files.archivo);
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
  modelo.img = secure_url;
  
  await modelo.save();

  res.json( { modelo });

}

const actualizarImagen = async( req, res = response ) => {

  const { id, coleccion } = req.params;

  console.log('coleccion->',coleccion);

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById( id );
      if ( !modelo ) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${ id }`
        });
      }
      
    break;

    case 'productos':
      modelo = await Producto.findById( id );
      if ( !modelo ) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${ id }`
        });
      }
      
      break;      
  
    default:
      return resizeTo.status(500).json({ msg: 'Se me olvidó validar esto'});
   
  }

  // Limpiar imágenes
  if ( modelo.img ) {
    // Borrar imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img );
    if ( fs.existsSync( pathImagen )) {
      fs.unlinkSync( pathImagen );
    }
  }


  const nombre = await subirArchivo( req.files, undefined, coleccion );
  modelo.img = nombre;

  await modelo.save();

  res.json( { modelo });

}


const mostrarImagen = async ( req, res = response ) => {

  const { id, coleccion } = req.params;

  console.log('coleccion->',coleccion);

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById( id );
      if ( !modelo ) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${ id }`
        });
      }
      
    break;

    case 'productos':
      modelo = await Producto.findById( id );
      if ( !modelo ) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${ id }`
        });
      }
      
      break;      
  
    default:
      return resizeTo.status(500).json({ msg: 'Se me olvidó validar esto'});
  }

  // Limpiar imágenes
  if ( modelo.img ) {
    // Borrar imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img );
    if ( fs.existsSync( pathImagen )) {
      
      return res.sendFile( pathImagen )

    }
  }

  // Retorna no-image.jpg
  const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    if ( fs.existsSync( pathImagen )) {      
      return res.sendFile( pathImagen )
    }

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}