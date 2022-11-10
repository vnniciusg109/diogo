const express = require('express');
const bodyParser = require('body-parser');


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


require('./src/controllers/authController')(app);
require('./src/controllers/projectController')(app);
require('./src/controllers/event')(app);
require('./src/controllers/ticket')(app);


app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log("Server is running.");
  });