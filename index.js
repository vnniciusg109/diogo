const express = require('express');
const bodyParser = require('body-parser');
var port = process.env.PORT || 8080;


const app = express()
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


require('./src/controllers/authController')(app);
require('./src/controllers/projectController')(app);
require('./src/controllers/event')(app);
require('./src/controllers/ticket')(app);


var server=app.listen(port,function() {
    console.log("app running on port 8080"); });