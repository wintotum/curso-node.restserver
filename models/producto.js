
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
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
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },    
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    }

});


// Convertir datos para quitar versión y el estado
ProductoSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();    
    return data;
}


module.exports = model( 'Producto', ProductoSchema );