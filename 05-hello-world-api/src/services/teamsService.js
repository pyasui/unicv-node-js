const api = require("./externalApiService");

async function getTeams(limit, offset) {
    try {
        const response = await api.get('v4/teams', {
            params: {
                limit: limit || 10,
                offset: offset || 0
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os clientes:', error.message);
        throw error;
    }
}