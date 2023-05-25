const mongoose = require('mongoose');



const CONNECTION_STRING = 'mongodb://localhost:27017/Gaming-Team'


const databaseConfig = async (app) => {

    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        console.log('Database connected');
    } catch (error) {
        console.error(err.message);
        process.exit(1)
    }


}

module.exports = databaseConfig