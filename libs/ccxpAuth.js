const axios = require('axios');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const config = require('../config.js');

module.exports = {

    async obtainCode(account, passwd, captcha, phpsessid) {
        const options = {
            method: 'POST',
            url: 'https://oauth.ccxp.nthu.edu.tw/v1/authorize.php',
            qs: {
                client_id: 'nthusa',
                response_type: 'code',
                state: 'xyz',
                scope: 'userid',
            },
            headers: {
                'Postman-Token': '9f1982c4-453d-42af-980e-3ac17decba27',
                'cache-control': 'no-cache',
                'Cookie': `PHPSESSID=${phpsessid};`,
                'User-Agent': 'Mozilla/5.0',
                'Origin': 'https://oauth.ccxp.nthu.edu.tw',
                'Host': 'oauth.ccxp.nthu.edu.tw',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: {
                account, passwd,
                oauth_captcha: captcha,
                undefined: undefined,
            },
        };
        try {
            await rp(options);
        } catch (error) {
            if (error.response.statusCode === 302 && error.response.body === '') {
                return (error.response.headers.location.split('?code=')[1].split('&')[0]);
            } else {
                throw Error('obtain code from ccxp authorize failed.');
            }
        }
        throw Error('obtain code from ccxp authorize failed.');
    },


    /**
     * @param {string} code authorization code
     * @return {Object}
     *      {access_token, expires_in, token_type, scope, refresh_token}
     */
    async verifyCode(code) {
        try {
            const response = await axios.post(`https://oauth.ccxp.nthu.edu.tw/v1/token.php`, {
                grant_type: 'authorization_code',
                client_id: 'nthusa',
                client_secret: 'Yx37gQrLUfmaw6BQ',
                redirect_uri: 'https%3A%2F%2Fvoting.nthusa.cf%2Fcallback',
                code,
            });
            return response.data;
        } catch (e) {
            console.log(e.response.data);
            throw new Error(e.response.data.error_description);
        }
    },

    /**
     * @param {string} accessToken access_token from verifyCode()
     * @return {string} account id
     */
    async verifyAccessToken(accessToken) {
        try {
            const response = await axios.post(`https://oauth.ccxp.nthu.edu.tw/v1/resource.php`, {}, {
                headers: {Authorization: `Bearer ${accessToken}`},
            });
            return response.data;
        } catch (e) {
            console.log(e.response.data);
            throw new Error(e.response.data.error_description);
        }
    },

    obtainServiceToken(account, user) {
        const payload = {account, ...user};
        const options = {
            'algorithm': 'HS256',
            'expiresIn': '1d',
        };
        const token = jwt.sign(payload, config.tokenSecret, options);
        return token;
    },
};
