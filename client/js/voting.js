const clientId = 'nthusa';
let voteTo = null;

function voteHandleClick(memberNumber) {
    voteTo = memberNumber;
    if (memberNumber == 1) {
        $('#member-one-vote').css('max-width', '50%');
        $('#member-one-vote').css('opacity', '100');
    } else if (memberNumber == 2) {
        $('#member-two-vote').css('max-width', '50%');
        $('#member-two-vote').css('opacity', '100');
    } else if (memberNumber == 3) {
        $('#member-three-vote').css('max-width', '50%');
        $('#member-three-vote').css('opacity', '100');
    }
}

async function signIn(account, passwd, captcha) {
    await axios.post(`https://oauth.ccxp.nthu.edu.tw/v1/authorize.php?client_id=${clientId}&response_type=code&state=xyz&scope=userid`, {
        account, passwd, oauth_captcha: captcha,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'oauth.ccxp.nthu.edu.tw',
            'Origin': 'https://oauth.ccxp.nthu.edu.tw',
        },
    });
}
