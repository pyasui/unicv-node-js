const service = require('../services/teamsService');

exports.getTeamById = async (req, res) => {
    const { id } = req.params;
    const team = await service.getTeamById(id);
    res.json(team);
};

exports.getTeams = async (req, res) => {
    const team = await service.getTeams();
    res.json(team);
};
