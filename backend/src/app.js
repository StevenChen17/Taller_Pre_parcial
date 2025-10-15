// /backend/src/app.js
const express = require('express');
// El 'require' debe apuntar a './routes.js' (que está en la misma carpeta src)
const routes = require('./routes'); 
const app = express();
const cors = require('cors'); // Recomendado para evitar problemas con el frontend

app.use(cors()); // Habilita CORS
app.use(express.json());
app.use('/api', routes); // Prefijo '/api' para todas las rutas

module.exports = app;