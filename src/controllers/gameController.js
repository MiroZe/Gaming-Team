const gameController = require('express').Router();
const { createGame } = require('../sevices/gameService');
const parseErrors = require('../utils/parseError');





gameController.get('/catalog', (req,res) => {

    res.render('catalog', {
        title: 'Catalog Page'
    })

})


gameController.get('/create', (req,res) => {

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