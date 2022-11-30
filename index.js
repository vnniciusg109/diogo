const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const cors = require('cors');


//middleware
//const errorHandlerMiddleware = require('./src/middlewares/error-handler');
//const notFoundMiddleware = require('./src/middlewares/not-found');

//API routes
const event_route = require('./src/routes/eventRoute');
const ticket_route = require('./src/routes/ticketRoute');
const auth_route = require('./src/routes/authRoute');
const user_route = require('./src/routes/userRoute');

//const cart_route = require('./src/routes/cartRoute');

var port = process.env.PORT || 8080;
const app = express()

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(path.join(__dirname,'public')))
//app.use(errorHandlerMiddleware);
//app.use(notFoundMiddleware);

app.use('/api/event',event_route);
app.use('/api/ticket',ticket_route);
app.use('/api/user',user_route);
app.use('/api/auth',auth_route);



//require('./src/controllers/authController')(app);
//require('./src/controllers/projectController')(app);


var server=app.listen(port,function() {
    console.log("app running on port 8080"); });
