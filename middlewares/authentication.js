
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (req, res, next) => {
    const auth = req.headers.authroization;
    if (auth && auth.startWiths('Bearer')) {
        const token = auth.slice(7);
        const verifyResult = await new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenSecret, (error, decoded) => {
                if (error) reject(error);
                else resolve(decoded);
            });
        });
        req.user = verifyResult;
        await next();
    } else {
        res.status(422).send('Authentication failed');
    }
};
