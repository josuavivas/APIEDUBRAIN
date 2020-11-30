const estudianteRoute = require('express').Router();
const estudiantectrl = require('../controllers/estudiante');
const { models } = require('mongoose');
const verifyToken = require('../config/verifyToken');


//CRUD ESTUDIANTE
estudianteRoute.route('/index').all(verifyToken).get(estudiantectrl.index);
estudianteRoute.route('/findbyid/:id').get(estudiantectrl.getById);
estudianteRoute.route('/create').post(estudiantectrl.create);
estudianteRoute.route('/edit/:id').post(estudiantectrl.edit);
estudianteRoute.route('/delete/:id').post(estudiantectrl.delete);

module.exports = estudianteRoute;