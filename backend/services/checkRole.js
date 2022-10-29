const jwt_decode = require('jwt-decode');

function checkRole(expected) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];
        let tokenPayload;
        try {
            tokenPayload = jwt_decode(token);
        } catch (err) {
            return res.status(500).json(err);
        }
        console.log("tokenPayload: ", tokenPayload);
        if (!expected || expected.length === 0) {
            return next();
        }
        const result = tokenPayload.role.find(roleElement => expected.indexOf(roleElement.role) >= 0);
        console.log("result: ", result);

        if (result != null) {
            next();
        } else {
            return res.status(403).send({message: "You are not allowed to access these pages"});
        }
    }
}

module.exports = checkRole;


/*
require('dotenv').config();

function checkRole(req, res, next) {
    if (res.locals.role == process.env.USER)
        res.sendStatus(401);
    else
        next();

}

module.exports = { checkRole: checkRole };
*/