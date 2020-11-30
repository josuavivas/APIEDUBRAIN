const juegoRoute = require('express').Router();
const juegoctrl = require('../controllers/juego');
const Mjuego = require('../models/juego');
const { models } = require('mongoose');


//CRUD JUEGO
juegoRoute.route('/index').get(juegoctrl.index);
juegoRoute.route('/create').post(juegoctrl.create);
juegoRoute.route('/edit/:id').post(juegoctrl.edit);
juegoRoute.route('/delete/:id').post(juegoctrl.delete);
juegoRoute.route('/postlist').post(juegoctrl.postList);
juegoRoute.route('/findbyid/:id').get(juegoctrl.findById);
juegoRoute.route('/findbyname/:nombre').get(juegoctrl.findByName);

module.exports = juegoRoute;



