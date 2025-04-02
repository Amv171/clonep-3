//Importo mongoose y mongoose-delete para poder hacer soft delete
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');


//Creo el esquema de usuario
const TFGSchema = new mongoose.Schema({
    TituloTFG: { type: String, required: true, default: '' }, // Título del TFG
    Año: { type: String, required: true, default: '' }, // Año académico
    TitulaciónGrado: { type: String, required: true, default: '' }, // Titulación o grado
    Alumno: { type: String, required: true, default: '' }, // Nombre del alumno
    Tutor: { type: String, required: true, default: '' }, // Nombre del tutor
    Abstract: { type: String, required: true, default: '' }, // Resumen o abstract del TFG
    archivo: { type: String, default: '' }, 
    enlacesExternos: [{ type: String, default: '' }],
    estado: { type: String, enum: ['pendiente', 'aprobado'], default: 'pendiente' },
    fechaSubida: { type: Date, default: Date.now }
},
{
    timestamps: true, 
    versionKey: false
});

TFGSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('tfg', TFGSchema);

