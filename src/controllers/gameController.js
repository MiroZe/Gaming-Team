const gameController = require('express').Router();
const hasUser = require('../middleware/userControl');
const { createGame, findOneGame, updateGame, deleteGame, buyGame, searchGame } = require('../sevices/gameService');
const parseErrors = require('../utils/parseError');
const guard = require('../middleware/guard');
const { getAllGames } = require('../sevices/gameService');





gameController.get('/catalog', async (req, res) => {

    try {

        const allGames = await getAllGames().lean()
        
        if (req.user) {
            allGames.map(r => r.hasUser = true)
        }


        res.render('catalog', {
            title: 'Catalog Page',
            allGames
        })

    } catch (error) {

    }


})




gameController.get('/create', guard, (req, res) => {

    res.render('create', {
        title: 'Create Game Page'
    })

})

gameController.post('/create', async (req, res) => {

    const game = {
        platform: req.body.platform,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        genre: req.body.genre,
        description: req.body.description,
        owner: req.user._id

    }

    try {
        if (Object.values(game).some(f => !f)) {
            throw new Error('All fields are mandatory')
        }


        await createGame(game)
        res.redirect('/game/catalog')


    } catch (error) {

        res.render('create',
            {
                title: 'Create Game Page',
                game,
                errors: parseErrors(error)

            })

    }


})

gameController.get('/:gameId/details',  async (req, res) => {

    const gameId = req.params.gameId
    const userId = req.user?._id 

    

    try {

        const game = await findOneGame(gameId).populate('boughtUsers').lean()
        if(userId) {

            const check = game.boughtUsers.some(r => r._id == userId)
            if(check) {
                game.alreadyBought = false 
            } else {
                game.alreadyBought = true 
            }

            game.isOwner = game.owner == req.user._id
        }
        console.log(game);
        
        res.render('details', {
            title: 'Details Page',
            game

        })
    } catch (error) {
        res.render('details', {
            errors: parseErrors(error)
        })
    }


})

gameController.get('/:gameId/edit', guard, async (req, res) => {

    try {

        const game = await findOneGame(req.params.gameId).lean()
        
        res.render('edit', {
            title: 'Edit page',
            game
        })

    } catch (error) {
        res.render('edit', {
            title: 'Edit page',
            errors: parseErrors(error),
            game
        })
    }

})

gameController.post('/:gameId/edit' ,guard,  async (req,res) => {
    

    
    const updatedGame = {
        platform: req.body.platform,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        genre: req.body.genre,
        description: req.body.description,
        
    }
    try {
        

        if (Object.values(updatedGame).some(f => !f)) {
            throw new Error('All fields are mandatory')
        }

        await updateGame(req.params.gameId, updatedGame)

        res.redirect(`/game/${req.params.gameId}/details`)
        
    } catch (error) {
        res.render('edit', {
            title: 'Edit Page',
            game : Object.assign(updatedGame, {_id: req.params.gameId}),
            errors: parseErrors(error)
        })
        
    }
})

gameController.get('/:gameId/delete',guard, async (req, res) => {

    try {

         await deleteGame(req.params.gameId)
        
        res.redirect('/game/catalog')
       

    } catch (error) {
        res.render('home', {
            title: 'Home page',
            errors: parseErrors(error),
            
        })
    }

})

gameController.get('/:gameId/buy', guard, async (req,res)=> {
    const game = await buyGame(req.params.gameId, req.user._id)

    

    res.render('details' , {game})
    
})

gameController.get('/search', guard, async (req,res) => {

    try {
        const foundGames = await getAllGames().lean()
        res.render('search' , {
            title: 'Search Page',
            foundGames
        })

    } catch (error) {
        res.render('search', {
            title: 'Search Page',
            errors : parseErrors(error)
        })
    }

})

gameController.post('/search', guard, async (req,res) => {

    const nameQuery = (req.body.name).toLowerCase()
    const gamePlatform = req.body.platform   

    try {
        const foundGames = await searchGame(nameQuery,gamePlatform).lean()

        res.render('search' , {
            title: 'Search Page',
            foundGames
        })
        
    } catch (error) {
        res.render('search', {
            title: 'Search Page',
            errors : parseErrors(error)
        })
    }

    
    

})

module.exports = gameController