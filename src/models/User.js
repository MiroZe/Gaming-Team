const {Schema, model, } = require('mongoose')



const userSchema = new Schema({

    username : {type: String, required : true, minlength: [5, 'Username should be minimum 5 characters long']},
    email : {type: String, required:true, minlength: [10, 'Email is invalid!']},
    hashedPassword : { type: String, required:true}

})


const User = model('User', userSchema);


module.exports = User