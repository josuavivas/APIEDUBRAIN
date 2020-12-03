const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tutorRoutes = require('../routes/tutor');
const estudianteRoutes = require('../routes/estudiante');
const juegoRoutes = require('../routes/juego');
const puntajeRoutes = require('../routes/puntaje');
const accesoRoutes = require('../routes/acceso');
const homeRoutes = require('../routes/home');
const app = express();
const cors = require('cors');
const verifyToken = require('../config/verifyToken')


app.use(cors());
require('dotenv').config();


mongoose.connect(`mongodb+srv://edubrain123:${process.env.PASSWORD_DB}@edubrain.rpnpa.mongodb.net/dbedubrain?retryWrites=true&w=majority`,
    { useNewUrlParser: true })
    .then(() => console.log('Db is connected'))
    .catch(err => console.error(err));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(morgan('dev'));

// rutas
app.use('/tutor', tutorRoutes);
app.use('/estudiante', estudianteRoutes);
app.use('/juego', juegoRoutes);
app.use('/puntaje', puntajeRoutes);
app.use('/acceso', accesoRoutes);
app.use('/', homeRoutes);

module.exports = app;