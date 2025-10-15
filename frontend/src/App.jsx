import React, { useState, useEffect } from 'react';
import DataList from './components/DataList.jsx';
import { getAllData, getDataById, getDataByStatus, getDataByQuery } from './api';

function App() {
  // 1. DECLARACIONES DE ESTADO (useState)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [endpoint, setEndpoint] = useState('allData');
  const [params, setParams] = useState({});

  // 2. FUNCIÓN DE CAMBIO DE ESTADO (handleEndpointChange)
  const handleEndpointChange = (newEndpoint, newParams = {}) => {
    // console.log(`Cambiando a endpoint: ${newEndpoint}`); // Temporal
    setEndpoint(newEndpoint);
    setParams(newParams);
  };

  // 3. EFECTOS LATERALES (useEffect)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      let apiCall = null;

      // Lógica de selección de apiCall (como la tienes)
      if (endpoint === 'allData') {
        apiCall = getAllData();
      } else if (endpoint.startsWith('dataInfo/')) {
        const id = endpoint.split('/')[1];
        apiCall = getDataById(id); // Opción 2: Por ID
      } else if (endpoint === 'dataInfo') {
        // Opción 3: Por 'status' (query param)
        apiCall = getDataByStatus(params.status);
      } else if (endpoint === 'dataInfoQuery') {
        // Opción 4: Por múltiples parámetros
        apiCall = getDataByQuery(params);
      }

      // Si apiCall sigue siendo null, es un endpoint no reconocido, y salimos.
      if (!apiCall) {
        setLoading(false);
        setError("Endpoint no reconocido o lógica de App.jsx incompleta.");
        return;
      }

      try {
        const result = await apiCall;
        const arrayResult = Array.isArray(result) ? result : (result ? [result] : []);
        setData(arrayResult);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(err.message || "Error desconocido en la conexión API.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [endpoint, params]); // Dependencias correctas

  // 4. EL RETURN DE JSX
  return (
    <div className="App">
      <h1>Consumo de API REST con React</h1>

      {/* Los botones deben estar dentro del div principal */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => handleEndpointChange('allData')}>
          GET /allData (Todos)
        </button>
        <button onClick={() => handleEndpointChange('dataInfo/123')}>
          GET /dataInfo/:id (Ej: 123)
        </button>
        <button onClick={() => handleEndpointChange('dataInfoQuery', { status: 'true', gender: 'suspense' })}>
          GET /dataInfoQuery (Filtro)
        </button>
      </div>

      {/* Visualización de resultados (el DataList) */}
      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && <DataList items={data} currentEndpoint={endpoint} />}
    </div>
  );
}

export default App;