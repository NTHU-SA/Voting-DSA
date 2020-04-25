const qs = require('qs');
const axios = require('axios');

(
    async () => {
        const clientId = 'nthusa';
        const account = '108062613';
        const passwd = '';
        const captcha = '529786';
        const response1 = await axios.post(`https://oauth.ccxp.nthu.edu.tw/v1/authorize.php?client_id=${clientId}&response_type=code&state=xyz&scope=userid`);
        const cookies = response1.headers['set-cookie'][0].split(';')[0];
        const response2 = await axios.post(`https://oauth.ccxp.nthu.edu.tw/v1/authorize.php?client_id=${clientId}&response_type=code&state=xyz&scope=userid`,
            qs.stringify({account, passwd, oauth_captcha: captcha}), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Host': 'oauth.ccxp.nthu.edu.tw',
                    'Origin': 'https://oauth.ccxp.nthu.edu.tw',
                    'User-Agent': 'Mozilla/5.0',
                    'Cookie': cookies,
                },
            });
        console.log(response2);
    }
)();
