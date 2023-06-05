const Game = require("../models/Game");




function getAllGames () {

    return Game.find()

}

function createGame ( game) {
   return  Game.create(game)
}


module.exports = {
    getAllGames,
    createGame
}