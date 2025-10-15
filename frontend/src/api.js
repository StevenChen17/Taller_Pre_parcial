const API_BASE_URL = '/api'; 

// Función genérica para manejar todas las peticiones
const fetchData = async (endpoint, params = {}) => {
    let url = `${API_BASE_URL}${endpoint}`;
    
    // Construir la cadena de query parameters si existen
    if (Object.keys(params).length > 0) {
        const query = new URLSearchParams(params).toString();
        // Solo agregar '?' si no es parte ya del endpoint (como en el caso de dataInfoQuery)
        url += endpoint.includes('?') ? `&${query}` : `?${query}`;
    }
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        if (result.status) {
            // Devolver los datos o el item, dependiendo del endpoint
            return result.data || result.item;
        } else {
            throw new Error(`API error: ${result.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Propagar el error para manejarlo en el componente
    }
};

export const getAllData = () => fetchData('/allData');
export const getDataById = (id) => fetchData(`/dataInfo/${id}`);
export const getDataByStatus = (status) => fetchData('/dataInfo', { status });
export const getDataByQuery = (params) => fetchData('/dataInfoQuery', params);