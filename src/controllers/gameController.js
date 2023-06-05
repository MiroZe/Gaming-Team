const gameController = require('express').Router();
const hasUser = require('../middleware/userControl');
const { createGame, findOneGame, updateGame } = require('../sevices/gameService');
const parseErrors = require('../utils/parseError');
const guard = require('../middleware/guard');
const { getAllGames } = require('../sevices/gameService');





gameController.get('/catalog', async (req, res) => {

    try {

        const allGames = await getAllGames().lean()
        console.log(req.user);
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
        res.redirect('game/catalog')


    } catch (error) {

        res.render('create',
            {
                title: 'Create Game Page',
                game,
                errors: parseErrors(error)

            })

    }


})

gameController.get('/:gameId/details', guard, async (req, res) => {

    const gameId = req.params.gameId

    try {

        const game = await findOneGame(gameId).lean()

        game.isOwner = game.owner == req.user._id


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

gameController.get('/:gameId/edit', async (req, res) => {

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


module.exports = gameController