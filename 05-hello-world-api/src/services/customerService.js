const api = require("./externalApiService");

async function getCustomers(limit, offset, name) {
  try {
    const response = await api.get('/v3/customers', {
      params: {
        limit: limit|| 10,
        offset: offset || 0,
        name: name
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os clientes:', error.message);
    throw error;
  }
}

// // Buscar um usuário por ID
// async function getUserById(id) {
//   try {
//     const response = await api.get(`/users/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Erro ao buscar usuário ${id}:`, error.message);
//     throw error;
//   }
// }

module.exports = {
  getCustomers,
  // getUserById
};
