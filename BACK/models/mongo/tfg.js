//Importo mongoose y mongoose-delete para poder hacer soft delete
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');


//Creo el esquema de usuario
const TFGSchema = new mongoose.Schema({
    titulo: { type: String, required: true, default: '' },
    asignatura: { type: String, required: true, default: '' },
    estudiante: [{ type: String, required: true, default: '' }], 
    docentes: [{ type: String, default: '' }], 
    resumen: { type: String, required: true, default: '' },
    palabrasClave: [{ type: String, required: true, default: '' }],
    cursoAcademico: { type: String, required: true, default: '' },
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

