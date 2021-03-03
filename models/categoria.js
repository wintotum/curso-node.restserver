const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nonbre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true 
    }

});


// Convertir datos para quitar versión y el estado
CategoriaSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();    
    return data;
}


module.exports = model( 'Categoria', CategoriaSchema );