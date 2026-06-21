## 🚀 TATEA: Primer API REST con Express.js
🎯 Propósito de Aplicación
Express.js es el framework backend de Node.js más usado en la industria. Entender cómo un servidor procesa 
peticiones HTTP y devuelve respuestas JSON es la base de cualquier API REST profesional que se construya más adelante con bases de datos,
autenticación y despliegue en la nube.

API REST de Estudiantes
Esta es una API REST básica para la gestión de estudiantes construida con **Node.js** y **Express**.
El proyecto simula una base de datos en memoria (utilizando un arreglo de JavaScript) y
permite realizar todas las operaciones CRUD (Crear, Leer, Actualizar y Eliminar) utilizando formato JSON.
---
## 🛠️ Requisitos Previos
Antes de ejecutar este proyecto, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (Versión 16 o superior recomendada)
- Un cliente de API como **Thunder Client** (extensión de VS Code)
---
## ⚙️ Instalación y Ejecución
Sigue estos pasos para poner a correr el servidor localmente:

1. **Clona o descarga este repositorio** en tu máquina local.
2. **Abre una terminal** en la carpeta raíz del proyecto.
3. **Se inicializa el proyecto de Node**  e instala Express con los sigientes codigo:
   ```bash
   npm init -y
   npm install express
   ```
## Se ejecuta el servidor con el comando:
Bash   
node index.js

**Tambien se ejecuta el servidor con el comando**
La API está montada en http://localhost:3000.
A continuación se detallan las rutas disponibles:

**Tabla de Endpoints Disponibles**
1- Método: GET
Endpoint: /
Descripción: Endpoint de bienvenida a la API.
Cuerpo de la Petición (JSON): No requiere

2- Método: /GET
Endpoint: /estudiantes
Descripción: Obtiene la lista de todos los estudiantes registrados.
Cuerpo de la Petición (JSON): No requiere

3 Método: GET
Endpoint: /estudiantes/:estudianteId
Descripción: Busca y obtiene un estudiante específico por su ID.
Cuerpo de la Petición (JSON): No requiere

4 Método: POST
Endpoint: /estudiantes
Descripción: Registra un nuevo estudiante en el sistema.
Cuerpo de la Petición (JSON): {"nombre": string, "edad": number, "correo": string}

5 Método: PUT
Endpoint: /estudiantes/:estudianteId
Descripción: Actualiza toda la información de un estudiante.
Cuerpo de la Petición (JSON): {"nombre": string, "edad": number, "correo": string}

6 Método: PATCH
Endpoint: /estudiantes/:estudianteId
Descripción: Actualiza únicamente el correo de un estudiante.
Cuerpo de la Petición (JSON): {"nuevo_correo": string}

7 Método: DELETE
Endpoint: /estudiantes/:estudianteId
Descripción: Elimina a un estudiante del sistema por su ID.
Cuerpo de la Petición (JSON):No requiere