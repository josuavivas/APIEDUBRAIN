const homeRoute = require('express').Router();
const homectrl = require('../controllers/home');

homeRoute.route('/').get(homectrl.index);

module.exports = homeRoute;