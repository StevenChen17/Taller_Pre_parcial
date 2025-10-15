const express = require('express');
const router = express.Router();
const data = require('../data/data.json'); // Importar los datos

const getFormattedResponse = (data, isArray = true) => ({
    status: true,
    data: isArray ? data : undefined,
    item: !isArray ? data : undefined,
    dateTime: new Date().toISOString()
});

// GET /api/allData - Recupera una lista de todos los objetos
router.get('/allData', (req, res) => {
    // La estructura de los datos es un arreglo con objetos tipo:
    // { id: 123, isActive: true, picture: '...', datePublish: '...', nameBook: '...', gender: '...' }
    res.json(getFormattedResponse(data));
});

// GET /api/dataInfo/:idItem - Recupera un objeto por su ID
router.get('/dataInfo/:idItem', (req, res) => {
    const id = parseInt(req.params.idItem);
    const item = data.find(obj => obj.id === id);

    if (item) {
        res.json(getFormattedResponse(item, false));
    } else {
        res.status(404).json({
            status: false,
            message: "Item no encontrado",
            dateTime: new Date().toISOString()
        });
    }
});

// GET /api/dataInfo - Recupera elementos por su 'status' (query param: ?status=true|false)
router.get('/dataInfo', (req, res) => {
    const statusQuery = req.query.status; // status: 'true' o 'false'

    if (statusQuery === undefined) {
        // Si no se proporciona 'status', se devuelve la lista completa
        res.json(getFormattedResponse(data));
        return;
    }

    const isActive = statusQuery.toLowerCase() === 'true';
    const filteredData = data.filter(obj => obj.isActive === isActive);

    res.json(getFormattedResponse(filteredData));
});

// GET /api/dataInfoQuery - Recupera elementos por 1 o más query params aleatorios
// Ejemplos: /dataInfoQuery?status=true  O  /dataInfoQuery?status=true&gender=suspense
router.get('/dataInfoQuery', (req, res) => {
    const queryParams = req.query;

    if (Object.keys(queryParams).length === 0) {
        // Si no hay parámetros de consulta, se devuelve la lista completa
        res.json(getFormattedResponse(data));
        return;
    }

    let filteredData = [...data]; // Copia de los datos originales

    // Iterar sobre todos los parámetros de consulta
    for (const key in queryParams) {
        const value = queryParams[key];

        // Se normaliza 'status' a 'isActive' para la comparación
        const dataKey = key === 'status' ? 'isActive' : key;
        let dataValue = value;

        // Convertir el valor a booleano si la clave es 'isActive'
        if (dataKey === 'isActive') {
            dataValue = value.toLowerCase() === 'true';
        }

        // Aplicar filtro
        filteredData = filteredData.filter(obj => {
            // Se asume que el valor de la propiedad es una cadena o un booleano para el filtro
            return obj[dataKey] !== undefined && String(obj[dataKey]).toLowerCase() === String(dataValue).toLowerCase();
        });
    }

    // Se asume que las salidas de dataInfoQuery deben ser con el campo 'data' (arreglo)
    res.json(getFormattedResponse(filteredData));
});

module.exports = router;