// js/ApiService.js

export const apiService = (() => {
    // --- PARTE COMPLEJA Y PRIVADA ---
    // Esta es la lógica que la fachada va a ocultar

    const _baseURL = 'https://jsonplaceholder.typicode.com';

    // Función privada que maneja CUALQUIER petición fetch
    const _fetchData = async (endpoint) => {
        try {
            const response = await fetch(`${_baseURL}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Falló la petición a ${_baseURL}/${endpoint}:`, error);
            return null; // Devolver null en caso de error
        }
    };

    // --- FACHADA PÚBLICA ---
    // Métodos simples que el resto de la app usará

    return {
        /**
         * Obtiene la lista de "países" (simulados con usuarios).
         * No necesitas saber la URL, solo llamas a getCountries().
         */
        getCountries: () => {
            console.log("Fachada: Obteniendo la lista de países...");
            return _fetchData('users');
        },

        /**
         * Obtiene las "ciudades" de un país (simuladas con posts de un usuario).
         * No necesitas saber cómo construir la URL, solo pasas el ID.
         * @param {number} countryId - El ID del país.
         */
        getCitiesByCountry: (countryId) => {
            console.log(`Fachada: Obteniendo ciudades para el país ${countryId}...`);
            return _fetchData(`posts?userId=${countryId}`);
        }
    };
})();