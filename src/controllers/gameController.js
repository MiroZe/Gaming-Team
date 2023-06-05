const gameController = require('express').Router();
const hasUser = require('../middleware/userControl');
const { createGame } = require('../sevices/gameService');
const parseErrors = require('../utils/parseError');
const guard = require('../middleware/guard');
const { getAllGames } = require('../sevices/gameService');





gameController.get('/catalog', async (req,res) => {

    try {

        const allGames = await getAllGames().lean()
        

        res.render('catalog', {
            title: 'Catalog Page',
            allGames 
        })
        
    } catch (error) {
        
    }


})


gameController.get('/create',guard, (req,res) => {

    res.render('create', {
        title: 'Create Game Page'
    })

})

gameController.post('/create', async (req,res) => {

    const game = {
        platform : req.body.platform,
        name :  req.body.name,
        imageUrl : req.body.imageUrl,
        price : Number(req.body.price),
        genre: req.body.genre,
        description: req.body.description

    } 

    try {
        if (Object.values(game).some(f => !f)) {
            throw new Error('All fields are mandatory')
        }
        

        await createGame(game)
        res.redirect('/catalog')

        
    } catch (error) {

        res.render('create', 
        {
            title: 'Create Game Page',
            game,
            errors :parseErrors(error)

        })
        
    }

    
})


module.exports = gameController