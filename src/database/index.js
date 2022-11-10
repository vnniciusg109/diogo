//db.js

const mongoose = require('mongoose')

const url = `mongodb+srv://Vnn:ubLU7iPUqnkGPEK@cluster0.bqwrzci.mongodb.net/?retryWrites=true&w=majority`;

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
