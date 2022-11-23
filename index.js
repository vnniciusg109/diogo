const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-session');


//var corsOptions = {
    //origin:"url do site"
//}




require('./src/database/index')

var port = process.env.PORT || 8080;

const app = express()

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname))
app.use(
    cookie({
        name:"test-session",
        secret : "saijdoiashfiusaf923",
        httpOnly:true
    })
)


//API routes
const event_route = require('./src/routes/eventRoute');
const ticket_route = require('./src/routes/ticketRoute');
const user_route = require('./src/routes/userRoute');

app.use('/api/event',event_route);
app.use('/api/ticket',ticket_route);
app.use('/api/user',user_route);


require('./src/controllers/authController')(app);
require('./src/controllers/projectController')(app);
require('./src/controllers/authEmpresaController')(app);


var server=app.listen(port,function() {
    console.log("app running on port 8080"); });