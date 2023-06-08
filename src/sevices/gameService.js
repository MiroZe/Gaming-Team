const Game = require("../models/Game");
const mongoose = require('mongoose')




function getAllGames() {

    return Game.find()

}

function createGame(game) {
    return Game.create(game)
}

function findOneGame(gameId) {
    return Game.findById(gameId)
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

async function buyGame(gameId, userId) {

    const game = await Game.findById(gameId).populate('boughtUsers').lean()
    game.isAlreadyBought = false

    const check = game.boughtUsers.some(r => r._id == userId)
    
    if (!check) {
         await Game.findByIdAndUpdate(gameId, {$push :{boughtUsers : userId}})
        
        game.isAlreadyBought = true
       

    } 
    
    return game
}

function searchGame(nameQuery, gamePlatform) {

    
    return Game.find()
    .where({name : { $regex: new RegExp(nameQuery, 'i') }})
    .where({platform: { $regex: new RegExp(gamePlatform, 'i') }})


}




module.exports = {
    getAllGames,
    createGame,
    findOneGame,
    updateGame,
    deleteGame,
    buyGame,
    searchGame
}