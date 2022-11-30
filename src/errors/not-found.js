const CustomApiError = require('./custom-api');
const {StatusCodes} = require('http-status-codes')

class NotFoundError extends CustomApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.BAD_GATEWAY;
    }
}

module.exports = NotFoundError;