const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var port = process.env.PORT || 8080;

const app = express()

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname))

//API routes
const event_route = require('./src/routes/eventRoute');
const ticket_route = require('./src/routes/ticketRoute');
//const cart_route = require('./src/routes/cartRoute');

app.use('/api/event',event_route);
app.use('/api/ticket',ticket_route);
app.use('/api/user',user_route);
//app.use('/api/cart,cart_route);


require('./src/controllers/authController')(app);
require('./src/controllers/projectController')(app);


var server=app.listen(port,function() {
    console.log("app running on port 8080"); });
