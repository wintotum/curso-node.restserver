const montoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await montoose.connect( process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión de base de datos');
    }

}


module.exports = {
    dbConnection
}