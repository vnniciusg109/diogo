const jwt = require('jsonwebtoken');

module.exports = async (request,response,netx) =>{
    try{

        const token = await request.headers.authorization.split(" ")[1];

        const decodedToken = await jwt.verify(token,"RANDOM-TOKEN");

        const user = await decodedToken;

        request.user = user;

        netx();
    }catch(erro){
        response.status(401).json({error:new Error ("Invalid request!")})
    }
}