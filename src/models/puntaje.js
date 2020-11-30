var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Puntaje = new Schema({
    score: { type: Number, required: true },
    estado: { type: String, required: true },
    nivel: { type: Number, required: true },
    fecha: { type: String, required: true },
    estudianteId: {
        type: Schema.Types.ObjectId,
        ref: 'estudiante', required: true
    },
    juegoId: {
        type: Schema.Types.ObjectId,
        ref: 'juego', required: true
    }

},
    {
        collection: 'puntajes'
    });

module.exports = mongoose.model('puntaje', Puntaje);



