const Mjuego = require('../models/juego');
const juego = require('../models/juego');

const ctrl = {};

ctrl.index = async (req, res) => {
    var listjuego = await Mjuego.find()
    res.json(listjuego);
}

ctrl.create = async (req, res) => {

    try {
        const { nombre, estado, niveles } = req.body;
        body = {
            nombre,
            estado,
            niveles
        }
        var juego = new Mjuego(body);
        await juego.save();
        res.status(200).json({ 'msg': 'Juego agregado con exito' })
    } catch (error) {
        console.error(error);
    }
}

ctrl.edit = async (req, res) => {
    try {
        const { nombre, estado, niveles } = req.body;
        body = {
            nombre,
            estado,
            niveles
        }
        await Mjuego.findByIdAndUpdate(req.params.id, body)
        res.status(200).json({ 'msg': 'Juego actualizado con exito' });

    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.delete = async (req, res) => {
    try {
        await Mjuego.findByIdAndDelete(req.params.id)
        res.status(200).json({ 'msg': 'Juego eliminado' });

    } catch (error) {
        console.error(error);
        res.status(500);
    }
}


ctrl.findById = async (req, res) => {
    try {
        var juego = await Mjuego.findById(req.params.id)
        res.status(200).json(juego.toJSON())
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.postList = async (req, res) => {
    const { nombre, estado, nivel } = req.body
    var body = { nombre, estado, nivel }
    try {
        console.log(body);
        var juego = new Mjuego(body);
        await juego.save();
        var listJuegos = await Mjuego.find();
        res.status(200).json(listJuegos);

    } catch (error) {
        console.error(error);
        res.status(500);
    }

}

ctrl.findByName = async (req, res) => {
    try {
        console.log(req.params.nombre);
        var juego = await Mjuego.findOne({ "nombre": req.params.nombre });
        res.status(200).json(juego)
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

module.exports = ctrl;