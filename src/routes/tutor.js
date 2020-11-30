const tutorRoute = require('express').Router();
const tutorctrl = require('../controllers/tutor');
var MTutor = require('../models/tutor');
const { models } = require('mongoose');



//CRUD TUTORES
tutorRoute.route('/index').get(tutorctrl.index);
tutorRoute.route('/create').post(tutorctrl.create);
tutorRoute.route('/edit/:id').post(tutorctrl.edit);
tutorRoute.route('/delete/:id').post(tutorctrl.delete);
tutorRoute.route('/findbyid/:id').get(tutorctrl.findById);
tutorRoute.route('/postlist').post(tutorctrl.postList);

module.exports = tutorRoute;


