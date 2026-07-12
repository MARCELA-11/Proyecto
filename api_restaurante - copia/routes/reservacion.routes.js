// routes/reservacion.routes.js
const express = require('express');
const router = express.Router();
//const { crearReservacion, obtenerReservacion, actualizarReservaciones } = require('../controller/reservacion.controller');
const { crearReservacion, obtenerReservacion, actualizarReservacion } = require('../controller/reservacion.controller');

// Si requieres que esté protegido, puedes importar e incluir tu middleware de autenticación aquí
// const { verificarToken } = require('../middleware/auth.middleware'); 



// Definir la ruta POST para crear reservaciones
router.post('/reservaciones', crearReservacion);
router.get('/reservaciones', obtenerReservacion);
router.put('/reservaciones', actualizarReservacion);


module.exports = router;