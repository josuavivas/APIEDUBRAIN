var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

const Tutor = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    direccion: { type: String },
    usuario: { type: String, required: true },
    password: { type: String, required: true }
},
    {
        collection: 'tutores'
    });


Tutor.pre('save', function (next) {
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
})

module.exports = mongoose.model('tutor', Tutor);