// controller/reservacion.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const crearReservacion = async (req, res) => {


//import { obtenerReservacion, actualizarReservacion } from '../controllers/reservacion.controller.js';


    try {
        const { mesaId, fecha, hora, cantidadPersonas, usuario_id } = req.body;

        // 1. VALIDACIÓN DE DISPONIBILIDAD
        // Buscamos si ya existe una reservación activa para la misma mesa, fecha y hora
        const [h, m, s] = hora.split(":"); // "19:30" -> ["19","30"] 
        const horaDate = new Date(Date.UTC(1970, 0, 1, h, m, s || 0));
        const reservaExistente = await prisma.reservacion.findFirst({
            where: {
                mesaId: mesaId,
                fecha: new Date(fecha),
                hora: horaDate,
                estado: "confirmada" // O el estado que utilices para reservaciones activas
            }
        });

        if (reservaExistente) {
            return res.status(409).json({ 
                error: "La mesa no está disponible en la fecha y hora seleccionada." 
            });
        }



        // 2. CREACIÓN DE LA RESERVACIÓN
        const nuevaReservacion = await prisma.reservacion.create({
            data: {
                mesaId: mesaId,
                fecha: new Date(fecha),
                hora: horaDate,
                personas: parseInt(cantidadPersonas),
                usuarioId: usuario_id,
                estado: "confirmada"
            }
        });

        return res.status(201).json({
            mensaje: "Reservación creada con éxito",
            data: nuevaReservacion
        });

    } catch (error) {
        console.error("Error al procesar la reservación:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

 // 3. OBTENER RESERVACION

const obtenerReservacion = async (req, res) => {
const lista_reserva = await prisma.reservacion.findMany();
    res.status(200).json(lista_reserva)
};


// actualizar-----------------------------------------------
// ¡ASEGÚRATE DE QUE ESTA FUNCIÓN ESTÉ AQUÍ ESCRITA!
const actualizarReservacion = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ mensaje: 'El ID proporcionado no es válido.' });
    }

    const { fecha, hora, personas, estado, usuarioId, mesaId } = req.body;

    try {
        const reservacionActualizada = await prisma.reservacion.update({
            where: { id: id },
            data: {
                fecha: fecha ? new Date(fecha) : undefined,
                hora: hora ? new Date(hora) : undefined,
                personas: personas ? parseInt(personas, 10) : undefined,
                estado: estado,
                usuarioId: usuarioId ? parseInt(usuarioId, 10) : undefined,
                mesaId: mesaId ? parseInt(mesaId, 10) : undefined,
            },
        });

        res.status(200).json({
            mensaje: 'Reservación actualizada exitosamente.',
            data: reservacionActualizada
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ mensaje: `No se encontró la reservación con ID ${id}.` });
        }
        res.status(500).json({ mensaje: 'Error interno.', error: error.message });
    }
};


// fin de actualizacion-------------------------------------


//module.exports = { crearReservacion,obtenerReservacion,actualizarReservacion};
module.exports = { crearReservacion, obtenerReservacion, actualizarReservacion };

