const service = require("../services/teamsService")

exports.listTeams = async (req, res) => {
    // listar todos os times
    const { limit, offset } = req.query;

    // criar o serviço de times
    const data = await service.getTeams(limit, offset);
    console.log(data);
    
    res.status(200).json();
}