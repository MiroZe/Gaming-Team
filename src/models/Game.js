const {Schema,model,Types} = require('mongoose')

const httpPattern = /^https?:\/\/.+$/i

const gameSchema = new Schema( {
    platform: {type: String, required: true, enum :['PC','Nintendo','PS4','PS5','XBOX']},
    name: {type: String,required: true, minLength: [4, 'The name should be min 4 characters long']},
    imageUrl : {type: String,
            required: true, 
            validate : { validator :(value) => httpPattern.test(value) , message : 'Invalid Url'},
            },
    price : {type : Number,required: true, min: 0},
    genre : {type : String,required: true, minLength: [2, 'The genre should be min 2 characters long']},
    description : {type: String, required: true, minLength: [10, 'The description should be min 10 characters long']},
    owner :{type: Types.ObjectId, ref: 'User', required: true}

})



const Game = model('Game', gameSchema);

module.exports = Game