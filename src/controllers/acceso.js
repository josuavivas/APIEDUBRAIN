const Mestudiante = require('../models/estudiante');
const Mtutor = require('../models/tutor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/dataConfig');
const ctrl = {};

ctrl.signupestudiante = async (req, res) => {

    try {
        const { nombre, edad, tutorId, usuario, password } = req.body;
        body = {
            nombre,
            edad,
            tutorId,
            usuario,
            password

        };

        var estudiante = new Mestudiante(body);
        await estudiante.save();
        res.status(200).json({ 'msg': 'Estudiante agregado con exito' });

    } catch (error) {
        console.error(error);
    }
}

ctrl.meTutor = async (req, res) => {
    const user = await Mtutor.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).send("Usuario no encontrado");
    }
    res.status(200).json(user);
}


ctrl.signinestudiante = async (req, res) => {
    const { usuario, password } = req.body;
    Mestudiante.findOne({ usuario })
        .then(user => {
            if (user == null) return res.status(500).json({ user: null, message: 'EL USUARIO NO EXISTE' })
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    res.status(200).json({ message: "login exitoso", user })
                } else {
                    res.status(401).json({ user: null, message: "LA CONTRASEÑA ES INCORRECTA" })
                }
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error });
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error });
        });
}

ctrl.signuptutor = async (req, res) => {

    try {
        const { nombre, apellido, correo, direccion, usuario, password } = req.body;
        var exTutor = await Mtutor.findOne({ usuario })
        if (exTutor._id == null) {
            body = {
                nombre,
                apellido,
                correo,
                direccion,
                usuario,
                password
            };

            var tutor = new Mtutor(body);
            await tutor.save();
            res.status(200).json({ signup: true, message: 'Tutor agregado con exito' });
        } else {
            return res.status(200).json({ signup: false, message: "EL USUARIO YA EXISTE" })
        }
    } catch (error) {
        res.status(500);
    }
}

ctrl.signintutor = async (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;
    Mtutor.findOne({ usuario })
        .then(user => {
            if (!user) return res.status(200).json({ message: "EL USUARIO NO EXISTE" })
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    payload = {
                        usuario: user.usuario,
                        password: user.password,
                    }
                    const token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 60 * 60 * 24
                    });
                    res.status(200).json({ login: true, token })

                } else {


                    res.status(200).json({ login: false, message: "LA CONTRASEÑA ES INCORRECTA" })
                }
            }).catch(error => {
                console.log(error);
                res.status(500).send({ error });
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error });
        });
}

module.exports = ctrl;