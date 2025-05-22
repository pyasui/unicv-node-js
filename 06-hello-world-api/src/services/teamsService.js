const api = require("./externalApiService");

// Buscar todos os usuários
async function getTeamById(id) {
  try {
    const response = await api.get(`/v4/teams/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os times:', error.message);
    throw error;
  }
}

module.exports = {
  getTeamById
};
