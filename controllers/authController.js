const jwt = require('jsonwebtoken');
const axios = require('axios');
const ccxpAuth = require('../libs/ccxpAuth.js');
const config = require('../config.js');
const Mongoose = require('mongoose');
const Users = Mongoose.model('users');
const { OAUTH_CLIENT_ID, OAUTH_AUTHORIZE, OAUTH_CALLBACK_URL, OAUTH_SCOPE, OAUTH_LOGIN } = process.env;

module.exports = {

    async authURL(req, res) {
	// if OAUTH_LOGIN == undefined: stub login
        res.redirect(OAUTH_LOGIN == undefined ?
		`${OAUTH_AUTHORIZE}?client_id=${OAUTH_CLIENT_ID}&response_type=code&redirect_uri=${OAUTH_CALLBACK_URL}&scope=${OAUTH_SCOPE}`
		: OAUTH_LOGIN);
    },

    async authccxp(req, res) {
        try {
            const { account, passwd, captcha, ccxp_sessid } = req.body;
            const code = await ccxpAuth.obtainCode(account, passwd, captcha, ccxp_sessid);
            const tokenInfo = await ccxpAuth.verifyCode(code);
            const userId = (await ccxpAuth.verifyAccessToken(
                tokenInfo.access_token)).Userid;
            let user = await Users.findOne({ student_id: userId }).lean();
            if (!user) {
                const newUser = await Users.create({ student_id: userId, created_at: Date.now(), updated_at: Date.now() });
                user = newUser.toObject();
            }
            const serviceToken = ccxpAuth.obtainServiceToken(userId, user);
            res.cookie('service_token', serviceToken);
            res.send({ status: true });
        } catch (e) {
            res.status(401).send({ status: false, error: 'Sign in to ccxp failed' });
        }
    },

    async authccxpCallback(req, res) {
        try {
            if (req.query.code === undefined || req.query.error === 'access_denied') throw 'Authentication failed';
            const tokenInfo = await ccxpAuth.verifyCode(req.query.code);
            const userId = (await ccxpAuth.verifyAccessToken(
                tokenInfo.access_token)).Userid;
            let user = await Users.findOne({ student_id: userId }).lean();
            if (!user) {
                const newUser = await Users.create({ student_id: userId, created_at: Date.now(), updated_at: Date.now() });
                user = newUser.toObject();
            }
            const serviceToken = ccxpAuth.obtainServiceToken(userId, user);
            res.cookie('service_token', serviceToken);
            res.redirect(`/voting.html`);
        } catch (e) {
            console.log(e);
            res.status(401).send('認證失敗，請回上一頁重新嘗試登入');
        }
    },

    async getccxpCaptchaImage(req, res) {
        const response = await axios.get('https://oauth.ccxp.nthu.edu.tw/v1/vendor/securimage/3.6.7/securimage_show.php?fnstr=654321', { responseType: 'arraybuffer' });
        res.cookie('ccxp_sessid', response.headers['set-cookie'][0].split('PHPSESSID=')[1].split(';')[0]);
        res.contentType('image/png');
        res.end(Buffer.from(response.data, 'binary'), 'binary');
    },

    async verifyServiceToken(req, res, next) {
        const auth = req.headers.authentication;
        if (!auth) {
            res.status(401).send({
                status: false,
                error: 'service_token should be given in Authentication header',
            });
            return;
        }
        if (auth.substring(0, 7) !== 'Bearer ') {
            res.status(401).send({
                status: false,
                error: 'token fromat should be "Bearer <jwt token>"',
            });
            return;
        }
        try {
            const serviceToken = auth.substring(7);
            const account = jwt.verify(
                serviceToken, config.tokenSecret).account;
            req.user = account;
        } catch (e) {
            if (e.name === 'JsonWebTokenError' &&
                e.message === 'invalid token') {
                res.status(401).send({
                    status: false,
                    error: 'UnAuthorized: invalid token',
                });
            } else if (e.name === 'TokenExpiredError' &&
                e.message === 'jwt expired') {
                res.status(401).send({
                    status: false,
                    error: 'UnAuthorized: the token is expired',
                });
            } else {
                res.status(401).send({
                    status: false,
                    error: `UnAuthorized: ${e.name}, ${e.message}`,
                });
            }
            return;
        }
        next();
    },

    async logout(req, res) {
        res.cookie('service_token', '');
        res.redirect('/');
    },
};
