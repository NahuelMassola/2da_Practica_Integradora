const pasport = require('passport');

function handlePolicies(policies) {
    return (req , res , next) => {
        if(policies.legth === 1 && policies[0] === "PUBLIC"){
            return next();
        }

        pasport.authenticate("jwt" , {session: false} , (err , userJWT , info) => {
            if(err) {
                return next(err);
            }
            if(!userJWT) {
                return res.status(401).send({
                    message: "ACCESO DENEGADO, TOKEN INVALIDO O EXPIRADO"
                })
        } 
        if (policies.includes(userJWT.user.rol)) {
            req.user = userJWT
            return next();
        } else {
            return res.status(403).send({ message: "ACCESO DENEGADO. ROL INVALIDO"})
        }
    }) (req ,res ,next);
    };
}

module.exports = handlePolicies