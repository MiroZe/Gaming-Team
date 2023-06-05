const Game = require("../models/Game");




function getAllGames () {

    return Game.find()

}

function createGame ( game) {
   return  Game.create(game)
}

  function findOneGame(gameId) {
    return  Game.findById(gameId)
}


module.exports = {
    getAllGames,
    createGame,
    findOneGame
}