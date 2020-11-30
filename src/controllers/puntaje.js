const Mpuntaje = require('../models/puntaje');
const {Types} = require('mongoose');
const ctrl = {};


ctrl.index = async (req, res) => {
    try {
        var listutores = await Mpuntaje.find().populate('estudianteId').populate('juegoId');
        res.json(listutores);
    } catch (error) {
        console.error(error);
    }
}

ctrl.create = async (req, res) => {
    try {
        //descomposición de objeto: saco prop de objeto
        const { score, nivel, fecha, estado, estudianteId, juegoId } = req.body;
        const body = {
            score,
            nivel,
            fecha,
            estado,
            estudianteId,
            juegoId
        }
        console.log(body);

        var puntaje = new Mpuntaje(body);
        await puntaje.save();
        res.status(200).json({ 'msg': 'Puntaje agregado con exito' });

    } catch (error) {
        res.status(500);
    }
}


ctrl.edit = async (req, res) => {
    try {
        const { score, nivel, fecha, estado, estudianteId, juegoId } = req.body;
        body = {
            score,
            nivel,
            fecha,
            estado,
            estudianteId,
            juegoId
        }
        await Mpuntaje.findByIdAndUpdate(req.params.id, body)

        res.status(200).json({ 'msg': 'Puntaje actualizado con exito' });

    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.delete = async (req, res) => {
    try {
        await Mpuntaje.findByIdAndDelete(req.params.id)
        res.status(200).json({ 'msg': 'Puntaje eliminado' });

    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.findById = async (req, res) => {
    try {
        var puntaje = await Mpuntaje.findById(req.params.id)
        res.status(200).json(puntaje)
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.findByGame = async (req, res) => {
    try {
        console.log(req.params.id);
        var puntaje = await Mpuntaje.find({ "juegoId": req.params.juegoId }).populate('estudianteId').populate('juegoId');
        res.status(200).json(puntaje)
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.findByStudentGame = async (req, res) => {
    try {
        var puntaje = await Mpuntaje.find({ "estudianteId": req.params.estudianteId, "juegoId": req.params.juegoId})
        res.status(200).json(puntaje)
        
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

ctrl.getGraph = async (req,res) => {
    try {
        var puntajes = await Mpuntaje.aggregate([     
            {
               $addFields: {
                  convertedDate: { $toDate: "$fecha" }
               },
            },
            {
                 $match: { estudianteId: Types.ObjectId(req.params.estudianteId), juegoId: Types.ObjectId(req.params.juegoId) } 
            },
            {
                $group: 
                {
                    _id :{"$month": "$convertedDate"},
                    avgScore: {"$avg": "$score"},
                    maxScore: {"$max": "$score"}      
                }   
            }
        ])
        res.status(200).json(puntajes)
    } catch (error) {
        console.log(error)
    }
}

module.exports = ctrl;

