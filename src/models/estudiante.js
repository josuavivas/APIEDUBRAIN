const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

var Estudiante = new Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    tutorId: {
        type: Schema.Types.ObjectId,
        ref: 'tutor',
        required: true
    },
    usuario: { type: String, required: true },
    password: { type: String, required: true }
},
    {
        collection: 'estudiantes'
    });

Estudiante.pre('save', function (next) {
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
})



module.exports = mongoose.model('estudiante', Estudiante);





