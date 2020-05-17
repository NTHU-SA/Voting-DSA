
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
        const token = auth.slice(7);
        try {
            const verifyResult = await new Promise((resolve, reject) => {
                jwt.verify(token, config.tokenSecret, (error, decoded) => {
                    if (error) reject(error);
                    else resolve(decoded);
                });
            });
            req.user = verifyResult;
            await next();
        } catch (error) {
            res.status(401).send('Authentication failed');
        }
    } else {
        res.status(401).send('Authentication failed');
    }
};
