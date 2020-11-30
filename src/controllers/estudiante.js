const Mestudiante = require('../models/estudiante');

const ctrl = {};

ctrl.index = async (req, res) => {
    try {
        var listestudiantes = await Mestudiante.find({tutorId : req.userId})
        res.json(listestudiantes);
    } catch (error) {
        console.error(error);
    }
}

ctrl.create = async (req, res) => {

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

ctrl.edit = async (req, res) => {
    try {
        await Mestudiante.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ 'msg': 'Estudiante actualizado con exito' });

    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.delete = async (req, res) => {
    try {
        await Mestudiante.findByIdAndDelete(req.params.id)
        res.status(200).json({ 'msg': 'Estudiante eliminado con exito' });

    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.getById = async (req, res) => {
    try {

        var estudiante = await Mestudiante.findById(req.params.id).populate('tutorId');
        res.status(200).json(estudiante)
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}


module.exports = ctrl;

