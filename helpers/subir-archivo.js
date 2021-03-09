const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files,  extensionValidas = ['png', 'jpg', 'jpeg','git'], carpeta = '' ) => {

    return new Promise(( resolve, reject ) => {
      

        const { archivo } = files;



        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1];
    
        //Validar extensiones 
        if ( !extensionValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida, solo ${ extensionValidas }`);
        }
    
        // res.json({ extension });
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            reject(err);
          }
          resolve( nombreTemp );
        });
    });


}

module.exports = {
    subirArchivo
}