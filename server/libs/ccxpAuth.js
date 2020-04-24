const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

module.exports = {

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

    /**
     * @param {string} account student ccxp id
     * @return {string} service_token
     */
    obtainServiceToken(account) {
        const payload = {account};
        const options = {
            'algorithm': 'HS256',
            'expiresIn': '1d',
        };
        const token = jwt.sign(payload, config.tokenSecret, options);
        return token;
    },
};
