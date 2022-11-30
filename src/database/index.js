//db.js

const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URL;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

module.exports = mongoose;
