require('dotenv').config();
const jwt = require('jsonwebtoken');

// function middleware
function authenticateToken(req, res, next) {

    console.log(req.headers.authorization);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (token == null)
        return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err)
            return res.sendStatus(401);
        res.locals = response; // response == payload
        next();
    });
}

module.exports = { authenticateToken: authenticateToken };


// function middleware
// function jwtGuard(req, res, next) {
//
//     console.log(req.headers.authorization);
//     const idToken = req.headers.authorization.split(' ')[1];
//     console.log(idToken);
//
//     if (idToken) {
//         jwt.verify(idToken, process.env.ACCESS_TOKEN, (err, decoded) => {
//             if (err) {
//                 res.status(401).json({ success: false, message: 'Incorrect token or it is expired.' });
//             } else {
//                 req.userToken = decoded;  // decoded == payload
//                 console.log(decoded);
//                 next();
//             }
//         });
//     }
//     else {
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// }