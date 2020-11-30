const Mtutor = require('../models/tutor');


const ctrl = {};
ctrl.index = async (req, res) => {
    try {
        var listutores = await Mtutor.find()
        res.json(listutores);
    } catch (error) {
        console.error(error);
    }
}

ctrl.create = async (req, res) => {
    try {
        const { nombre, apellido, correo, direccion, usuario, password } = req.body;
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
        res.status(200).json({ 'msg': 'Tutor agregado con exito' });

    } catch (error) {
        res.status(500);
    }
}

ctrl.edit = async (req, res) => {
    try {
        await Mtutor.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ 'msg': 'Tutor actualizado con exito' });

    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.delete = async (req, res) => {
    try {
        await Mtutor.findByIdAndDelete(req.params.id)
        res.status(200).json({ 'msg': 'Tutor eliminado' });

    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.findById = async (req, res) => {
    try {
        var tutor = await Mtutor.findById(req.params.id)
        res.status(200).json(tutor.toJSON())
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.postList = async (req, res) => {

    const { nombre, apellido, correo, direccion, usuario, password } = req.body
    var body = {
        nombre, apellido, correo, direccion, usuario, password
    }
    try {
        console.log(body);
        var tutor = new Mtutor(body);
        await tutor.save();
        var Tutores = await Mtutor.find()
        res.status(200).json(Tutores);

    } catch (error) {
        res.status(500);
    }
}

module.exports = ctrl;

