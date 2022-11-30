const CustomError = require('../errors');

const checkPermission = (requestedUser, resourceUserId) =>{
    if(requestedUser.role === 'admin'){
        return;
    }

    if(requestedUser.UserId === resourceUserId.toString()){
        return
    }
    throw new CustomError.UnauthorizedError(
        "Nao tem acesso a essa rota"
    );
}

module.exports = checkPermission;
