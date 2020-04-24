const jwt = require('jsonwebtoken');
const ccxpAuth = require('../libs/ccxpAuth.js');
const config = require('../config.js');

module.exports = {

    async authccxpCallback(req, res) {
        try {
            const tokenInfo = await ccxpAuth.verifyCode(req.query.code);
            const account = (await ccxpAuth.verifyAccessToken(
                tokenInfo.access_token)).Userid;
            const serviceToken = ccxpAuth.obtainServiceToken(account);
            res.send({status: true, service_token: serviceToken});
        } catch (e) {
            res.status(401).send({status: false, error: e.message});
        }
    },

    async verifyServiceToken(req, res, next) {
        const auth = req.headers.authorization;
        if (auth.substring(0, 7) !== 'Bearer ') {
            res.status(401).send({
                status: false,
                error: 'token fromat should be "Bearer <jwt token>"'});
            return;
        }
        try {
            const serviceToken = auth.substring(7);
            const account = jwt.verify(
                serviceToken, config.tokenSecret).account;
            req.user = account;
        } catch (e) {
            if (e.name === 'JsonWebTokenError'
                && e.message === 'invalid token') {
                res.status(401).send({
                    status: false,
                    error: 'UnAuthorized: invalid token'});
            } else if (e.name === 'TokenExpiredError'
                && e.message === 'jwt expired') {
                res.status(401).send({
                    status: false,
                    error: 'UnAuthorized: the token is expired'});
            } else {
                res.status(401).send({
                    status: false,
                    error: `UnAuthorized: ${e.name}, ${e.message}`});
            }
            return;
        }
        next();
    },
};
