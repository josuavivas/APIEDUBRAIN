const puntajeRoute = require('express').Router();
const puntajectrl = require('../controllers/puntaje');
const verifyToken = require('../config/verifyToken');

//CRUD PUNTAJE

puntajeRoute.route('/index').get(puntajectrl.index);
puntajeRoute.route('/create').post(puntajectrl.create);
puntajeRoute.route('/edit/:id').post(puntajectrl.edit);
puntajeRoute.route('/delete/:id').post(puntajectrl.delete);
puntajeRoute.route('/findbyid/:id').get(puntajectrl.findById);
puntajeRoute.route('/findbygame/:juegoId').get(puntajectrl.findByGame);
puntajeRoute.route('/findbystudent/:estudianteId/:juegoId').get(puntajectrl.findByStudentGame);
puntajeRoute.route('/getgraph/:estudianteId/:juegoId').get(puntajectrl.getGraph);

module.exports = puntajeRoute;