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


async function updateGame(gameId, updatedGame) {

  
        const game = await Game.findById(gameId)
        game.platform = updatedGame.platform
        game.name = updatedGame.name
        game.imageUrl = updatedGame.imageUrl,
        game.price = updatedGame.price,
        game.genre = updatedGame.genre,
        game.description = updatedGame.description

        await game.save()

        
    } 


    function deleteGame(gameId) {
        return Game.findByIdAndDelete(gameId)
    }


    



module.exports = {
    getAllGames,
    createGame,
    findOneGame,
    updateGame
}