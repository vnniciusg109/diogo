const jwt = require('jsonwebtoken');

const createJWT = ({payload}) =>{
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_LIFETIME,
        }
    )

    return token;
}



const createTokenUser = (res,user) =>{

    const token = createJWT({payload:user});
    res.send({
        name:user.name,
        userId: user._id,
        role:user.role,
        token:token
        
});
};

module.exports = createTokenUser;