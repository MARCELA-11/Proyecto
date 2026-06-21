// Mencionando el modulo de express para nuestro proyecto
const express = require('express')

// creando nuestro objeto central (global) que se utilizara en nuestro proyecto (rutas, funciones, configuraciones)
const app = express()

// indicamos que nuestra api tiene un middleware (procesar datos en formato JSON)
app.use(express.json())

// simulando una base de datos de estudiantes
const estudiantes = [
    { id: 1, nombre: "Ana García", edad: 18, correo: "ana.garcia@email.com" },
    { id: 2, nombre: "Carlos López", edad: 17, correo: "carlos.lopez@email.com" },
    { id: 3, nombre: "María Pérez", edad: 18, correo: "maria.p@email.com" }
]

// por defecto el puerto de express 3000
// servidor = localhost:3000
app.listen(3000, () => {
    console.log("Hola, este es el servidor http://localhost:3000/")
})

// comando para ejecutar el servidor (archivo) -> node index.js

// creando enrutamiento para nuestra API

// creando la ruta principal (peticion HTTP: GET, POST, PUT, DELETE, PATCH)
/**
 * (primer parametro) req = request (se utiliza cuando necesitamos por ejemplo datos del usuario (body), headers, parametros)
 * (segundo parametro) res = response (lo que se devuelve al cliente)
 */

// Mi primer endpoint
app.get('/', (req, res) => {
    //codigo de la funcion
    res.send("Hola Mundo, Bienvenidos a mi API Estudiantes")
})

// ruta para obtener todos los estudiantes (segundo endpoint)
app.get('/estudiantes', (req, res) => {
    // codigo
    res.status(200).json(estudiantes)
});

// PARTE 0 BUSCAR UN ESTUDIANTE (GET)
// ruta para buscar un estudiante por ID (la ruta lleva parametro (:))
app.get('/estudiantes/:estudianteId', (req, res) => {
    //capturando el valor del parametro
    const id = Number(req.params.estudianteId); 
    //devolvemos el estudiante con el metodo find
    const encontrar_estudiante = estudiantes.find(estudiante => estudiante.id === id);

    //validando si el estudiante NO existe
    if(!encontrar_estudiante){  
        return res.status(404).json({ error: 'Estudiante no encontrado' })
    }

    res.status(200).json(encontrar_estudiante)
});

// PARTE 1 INGRESAR UN ESTUDIANTE()
// ruta para crear un nuevo estudiante
app.post('/estudiantes', (req, res) => {
    // haciendo el cuerpo de datos para registrar el estudiante
    const { nombre, edad, correo } = req.body

    // agregamos los datos ingresados a un objeto
    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        //nombre: nombre
        nombre,
        edad,
        correo
    }

    //agregamos el nuevo objeto al arreglo
    estudiantes.push(nuevoEstudiante);

    res.status(201).json({
        message: 'Registrado exitosamente',
        estudiante: nuevoEstudiante
    })

});

// Parte 2 PACHT
// ruta para actualizar un estudiante (correo)
app.patch('/estudiantes/:estudianteId', (req, res) => {
    // primero encontramos al estudiante a actualizar
    const id = Number(req.params.estudianteId); 
    const encontrar_estudiante = estudiantes.find(estudiante => estudiante.id === id);

    //validando si el estudiante NO existe
    if(!encontrar_estudiante){
        return res.status(404).json({ error: 'Estudiante no encontrado' })
    }

    // segundo si el estudiante existe, actualizamos su correo
    const { nuevo_correo } = req.body
    encontrar_estudiante.correo = nuevo_correo

    res.status(200).json({
        message: 'Correo actualizado exitosamente',
        estudiante: encontrar_estudiante
    })
});

// Parte 3 PUT
// Ruta para actualizar TODO el estudiante (Reemplazo completo) 
// (en este caso utilizo put para cambiar toda la informacion, por que pacht lo utilizo solo para actualizar informacion parcial)
app.put('/estudiantes/:estudianteId', (req, res) => {
    // 1. Capturamos el ID y buscamos al estudiante
    const id = Number(req.params.estudianteId); 
    const encontrar_estudiante = estudiantes.find(estudiante => estudiante.id === id);

    // 2. Validamos si el estudiante NO existe
    if (!encontrar_estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' })
    }

    // 3. Extraemos todos los nuevos datos desde el req.body
    const { nombre, edad, correo } = req.body;

    // Para seguerarme que el usuario envie toda la informacion del estudiante, si falta me enviara el error 400
    if (!nombre || !edad || !correo) {
        return res.status(400).json({ error: 'Faltan campos obligatorios (nombre, edad, correo)' });
    }

    // 4. Actualizamos todas las propiedades del estudiante encontrado
    // (cree un arreglo, array para ver automaticamente los cambios dento del areglo estudiantes)
    encontrar_estudiante.nombre = nombre;
    encontrar_estudiante.edad = edad;
    encontrar_estudiante.correo = correo;

    // 5. Respondemos al cliente
    res.status(200).json({
        message: 'Estudiante actualizado completamente con éxito',
        estudiante: encontrar_estudiante
    });
});

// Parte 4 DELETE
// Ruta para eliminar un estudiante por ID
app.delete('/estudiantes/:estudianteId', (req, res) => {
    // 1. Capturo el ID de los parámetros de la URL
    const id = Number(req.params.estudianteId); 
    
    // 2. Busco el índice (posición) del estudiante en el arreglo
    const indiceEstudiante = estudiantes.findIndex(estudiante => estudiante.id === id);

    // 3. Valido si el estudiante NO existe (findIndex devuelve -1 si no lo encuentra)
    if (indiceEstudiante === -1) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // 4. Elimino al estudiante del arreglo usando splice
    // (primer parámetro: posición, segundo parámetro: cuántos elementos eliminar)
    const estudianteEliminado = estudiantes.splice(indiceEstudiante, 1);

    // 5. Respondo al cliente con el estudiante que fue eliminado
    res.status(200).json({
        message: 'Estudiante eliminado exitosamente',
        estudiante: estudianteEliminado[0]
    });
});