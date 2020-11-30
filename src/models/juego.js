var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Juego = new Schema({
    nombre: { type: String },
    niveles: { type: Number }
},
    {
        collection: 'juegos'
    });

module.exports = mongoose.model('juego', Juego);