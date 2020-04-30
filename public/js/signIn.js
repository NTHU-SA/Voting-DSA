
async function signIn(account, passwd, captcha) {
    try {
        await axios.post('/auth/ccxp', {
            account, passwd, captcha,
            ccxp_sessid: document.cookie.split('ccxp_sessid=')[1],
        });
        location.href = '/voting.html';
    } catch (error) {
        $('#form-prompt').css('display', 'inline');
    }
}
