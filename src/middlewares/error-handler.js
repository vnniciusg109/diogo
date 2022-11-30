const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (err,req,res,next) =>{
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || "Algo deu errado ao criar o usuario, tente novamente mais tarde!"
    }

    if(err.name === 'Erro de validacao'){
        customError.msg = Object.values(err,errors)
        .map((item) => item.message)
        .join(',');        
        customError.statusCode = 404;

    }
    if(err.name && err.code === 11000){
        customError.msg = `Valor Duplicado por  ${Object.keys(err.KeyValue)}`
        customError.statusCode = 404;
        
    }
    if(err.name === 'CastError'){
        customError.msg = `Nenhum item encontrado com o ID: ${err.value}`
        customError.statusCode = 404;
        
    }

    return res.status(customError.statusCode).json({msg:customError.msg});
    
 

}

module.exports = errorHandlerMiddleware;