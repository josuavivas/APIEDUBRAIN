const accesoRoute = require('express').Router();
const accesoctrl = require('../controllers/acceso');
const verifyToken = require('../config/verifyToken')


//CRUD ESTUDIANTE

accesoRoute.route('/signupestudiante').post(accesoctrl.signupestudiante);
accesoRoute.route('/signinestudiante').post(accesoctrl.signinestudiante);
accesoRoute.route('/signuptutor').post(accesoctrl.signuptutor);
accesoRoute.route('/signintutor').post(accesoctrl.signintutor);
accesoRoute.route('/meTutor').all(verifyToken).get(accesoctrl.meTutor)
module.exports = accesoRoute;