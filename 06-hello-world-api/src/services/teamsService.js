const api = require("./externalApiService");
const Team = require('../models/teamModel');
const { globalCache } = require('../utils/cache');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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

async function getTeams() {
  const teams = globalCache.get('teams');
  if (teams){
    console.log('cache');
    return teams;
  }

  const result = await globalCache.getOrSet('teams', async () => {
    let allTeams = [];
    let page = 0;
    const limit = 500; 
    let totalFetched = 0;

    while (true) {
      const offset = page * limit;
      console.log(`Buscando times página ${page + 1}`);

      try {
        const response = await api.get(`/v4/teams`, {
          params: {
            limit: limit,
            offset: offset
          }
        });

        const teamsData = response.data.teams || [];
        if (teamsData.length == 0)
          break;

        const teamsPage = teamsData.map(teamData => new Team(teamData));
        allTeams = allTeams.concat(teamsPage);

        totalFetched += teamsPage.length;

        page++;

        await delay(6000);
      } catch (err) {
        console.error('Erro buscando times:', err.response?.data || err.message);
        break;
      }
    }
    return allTeams;
  });

  return result;
}
module.exports = {
  getTeamById,
  getTeams
};
