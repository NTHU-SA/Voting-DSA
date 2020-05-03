<<<<<<< HEAD
=======
document.cookie = 'service_token=';
>>>>>>> 2d759fd083eceec8035e5b0401ea6986259f5f82
let voteOpt1 = null; let voteOpt2 = null; let voteOpt3 = null;
const imgDisappear = null;

function voteOneClick(Opt) {
    if (Opt == 1) {
        voteOpt1 = '我要投給他';
        $('#member-one-vote-yes').css('max-width', '50%');
        $('#member-one-vote-yes').css('opacity', '100');
        $('#oneYescancelNot').css('display', 'none');
        $('#oneYescancel').css('display', 'block');
        $('#member-one-2').css('display', 'none');
        $('#member-one-3').css('display', 'none');
    } else if (Opt == 2) {
        voteOpt1 = '我不投給他';
        $('#member-one-vote-no').css('max-width', '50%');
        $('#member-one-vote-no').css('opacity', '100');
        $('#oneNocancelNot').css('display', 'none');
        $('#oneNocancel').css('display', 'block');
        $('#member-one-1').css('display', 'none');
        $('#member-one-3').css('display', 'none');
    } else if (Opt == 3) {
        voteOpt1 = Opt;
        $('#member-one-vote-withoutOpinion').css('max-width', '50%');
        $('#member-one-vote-withoutOpinion').css('opacity', '100');
        $('#oneWOcancelNot').css('display', 'none');
        $('#oneWOcancel').css('display', 'block');
        $('#member-one-1').css('display', 'none');
        $('#member-one-2').css('display', 'none');
    }
}

function imgOneClick(Opt) {
    if (Opt == 1) {
        $('#member-one-vote-yes').css('max-width', '0%');
        $('#member-one-vote-yes').css('opacity', '0');
        $('#oneYescancelNot').css('display', 'block');
        $('#oneYescancel').css('display', 'none');
        $('#member-one-2').css('display', 'block');
        $('#member-one-3').css('display', 'block');
    } else if (Opt == 2) {
        $('#member-one-vote-no').css('max-width', '0%');
        $('#member-one-vote-no').css('opacity', '0');
        $('#oneNocancelNot').css('display', 'block');
        $('#oneNocancel').css('display', 'none');
        $('#member-one-1').css('display', 'block');
        $('#member-one-3').css('display', 'block');
    } else if (Opt == 3) {
        $('#member-one-vote-withoutOpinion').css('max-width', '0%');
        $('#member-one-vote-withoutOpinion').css('opacity', '0');
        $('#twoWOcancelNot').css('display', 'block');
        $('#oneWOcancel').css('display', 'none');
        $('#member-one-1').css('display', 'block');
        $('#member-one-2').css('display', 'block');
    }
    return Opt;
}

function voteTwoClick(Opt) {
    if (Opt == 1) {
        voteOpt2 = '我要投給他';
        $('#member-two-vote-yes').css('max-width', '50%');
        $('#member-two-vote-yes').css('opacity', '100');
        $('#twoYescancelNot').css('display', 'none');
        $('#twoYescancel').css('display', 'block');
        $('#member-two-2').css('display', 'none');
        $('#member-two-3').css('display', 'none');
    } else if (Opt == 2) {
        voteOpt2 = '我不投給他';
        $('#member-two-vote-no').css('max-width', '50%');
        $('#member-two-vote-no').css('opacity', '100');
        $('#twoNocancelNot').css('display', 'none');
        $('#twoNocancel').css('display', 'block');
        $('#member-two-1').css('display', 'none');
        $('#member-two-3').css('display', 'none');
    } else if (Opt == 3) {
        voteOpt2 = Opt;
        $('#member-two-vote-withoutOpinion').css('max-width', '50%');
        $('#member-two-vote-withoutOpinion').css('opacity', '100');
        $('#twoWOcancelNot').css('display', 'none');
        $('#twoWOcancel').css('display', 'block');
        $('#member-two-1').css('display', 'none');
        $('#member-two-2').css('display', 'none');
    }
    return Opt;
}

function imgTwoClick(Opt) {
    if (Opt == 1) {
        $('#member-two-vote-yes').css('max-width', '0%');
        $('#member-two-vote-yes').css('opacity', '0');
        $('#twoYescancelNot').css('display', 'block');
        $('#twoYescancel').css('display', 'none');
        $('#member-two-2').css('display', 'block');
        $('#member-two-3').css('display', 'block');
    } else if (Opt == 2) {
        $('#member-two-vote-no').css('max-width', '0%');
        $('#member-two-vote-no').css('opacity', '0');
        $('#twoNocancelNot').css('display', 'block');
        $('#twoNocancel').css('display', 'none');
        $('#member-two-1').css('display', 'block');
        $('#member-two-3').css('display', 'block');
    } else if (Opt == 3) {
        $('#member-two-vote-withoutOpinion').css('max-width', '0%');
        $('#member-two-vote-withoutOpinion').css('opacity', '0');
        $('#twoWOcancelNot').css('display', 'block');
        $('#twoWOcancel').css('display', 'none');
        $('#member-two-1').css('display', 'block');
        $('#member-two-2').css('display', 'block');
    }
    return Opt;
}

function voteThreeClick(Opt) {
    if (Opt == 1) {
        voteOpt3 = '我要投給他';
        $('#member-three-vote-yes').css('max-width', '50%');
        $('#member-three-vote-yes').css('opacity', '100');
        $('#threeYescancelNot').css('display', 'none');
        $('#threeYescancel').css('display', 'block');
        $('#member-three-2').css('display', 'none');
        $('#member-three-3').css('display', 'none');
    } else if (Opt == 2) {
        voteOpt3 = '我不投給他';
        $('#member-three-vote-no').css('max-width', '50%');
        $('#member-three-vote-no').css('opacity', '100');
        $('#threeNocancelNot').css('display', 'none');
        $('#threeNocancel').css('display', 'block');
        $('#member-three-1').css('display', 'none');
        $('#member-three-3').css('display', 'none');
    } else if (Opt == 3) {
        voteOpt3 = '我沒有意見';
        $('#member-three-vote-withoutOpinion').css('max-width', '50%');
        $('#member-three-vote-withoutOpinion').css('opacity', '100');
        $('#threeWOcancelNot').css('display', 'none');
        $('#threeWOcancel').css('display', 'block');
        $('#member-three-1').css('display', 'none');
        $('#member-three-2').css('display', 'none');
    }
}

function imgThreeClick(Opt) {
    if (Opt == 1) {
        $('#member-three-vote-yes').css('max-width', '0%');
        $('#member-three-vote-yes').css('opacity', '0');
        $('#threeYescancelNot').css('display', 'block');
        $('#threeYescancel').css('display', 'none');
        $('#member-three-2').css('display', 'block');
        $('#member-three-3').css('display', 'block');
    } else if (Opt == 2) {
        $('#member-three-vote-no').css('max-width', '0%');
        $('#member-three-vote-no').css('opacity', '0');
        $('#threeNocancelNot').css('display', 'block');
        $('#threeNocancel').css('display', 'none');
        $('#member-three-1').css('display', 'block');
        $('#member-three-3').css('display', 'block');
    } else if (Opt == 3) {
        $('#member-three-vote-withoutOpinion').css('max-width', '0%');
        $('#member-three-vote-withoutOpinion').css('opacity', '0');
        $('#threeWOcancelNot').css('display', 'block');
        $('#threeWOcancel').css('display', 'none');
        $('#member-three-1').css('display', 'block');
        $('#member-three-2').css('display', 'block');
    }
}

async function checkVote() {
<<<<<<< HEAD
    try {
        $('.modal-title').html('投票結果');
        $('.modalCheck').html('您確定要將投票結果送出？');
        const resUserVoteRecord = await getUserResult();
        if (String(resUserVoteRecord).length === 24 && resUserVoteRecord !== null) {
            $('.modalInfo').html('您已經投過票了哦！');
        } else if (voteOpt1 === null || voteOpt2 === null || voteOpt3 === null) {
            $('.modalInfo').html('尚未選擇所有候選人哦！您將重新返回投票頁面進行投票');
            $('.btn-modalInfoSecondary').css('display', 'none');
        } else {
            $('.modalInfo').html('您的所選擇的候選人依序爲<br>' +
                '一號候選人：' + voteOpt1 + '<br>' +
                '二號候選人：' + voteOpt2 + '<br>' +
                '三號候選人：' + voteOpt3 + '<br>');
            $('.btn-modalInfoPrimary').css('display', 'inline');
            $('.btn-modalInfoSecondary').css('display', 'inline');
        }
    } catch (e) {
        console.log(e.response.data);
    }
}

async function sendUserResult() {
    try {
=======
    try {
        $('.modal-title').html('投票結果');
        $('.modalCheck').html('您確定要將投票結果送出？');
        const resUserVoteRecord = await getUserResult();
        if (String(resUserVoteRecord).length === 24 && resUserVoteRecord !== null) {
            $('.modalInfo').html('您已經投過票了哦！');
        } else if (voteOpt1 === null || voteOpt2 === null || voteOpt3 === null) {
            $('.modalInfo').html('尚未選擇所有候選人哦！您將重新返回投票頁面進行投票');
            $('.btn-modalInfoSecondary').css('display', 'none');
        } else {
            $('.modalInfo').html('您的所選擇的候選人依序爲<br>' +
                '一號候選人：' + voteOpt1 + '<br>' +
                '二號候選人：' + voteOpt2 + '<br>' +
                '三號候選人：' + voteOpt3 + '<br>');
            $('.btn-modalInfoPrimary').css('display', 'inline');
            $('.btn-modalInfoSecondary').css('display', 'inline');
        }
    } catch (e) {
        console.log(e.response.data);
    }
}

async function sendUserResult() {
    console.log(document.cookie);
    try {
>>>>>>> 2d759fd083eceec8035e5b0401ea6986259f5f82
        const resActivity = await axios.post('/activities/getActivities', {
            'filter': { name: '第28屆學生議會議員補選' },
            'limit': 0, 'skip': 0, 'sort': 0,
        }, {});
        activityID = resActivity.data.data[0]._id;
        const resOption = await axios.post('/options/getOptions', {
            'filter': {
                activity_id: activityID,
                type: 'candidate',
            },
            'limit': 0, 'skip': 0, 'sort': 0,
        }, {});
        optionID = resOption.data.data[0]._id;
<<<<<<< HEAD
        //TODO: addVote should include the "remark" path in DB
        await axios.post('/votes/addVote', {
=======
        await axios.post('/votes/addVote', {
            //TODO:token API updated
            //TODO:wait for remark path in DB complete
            'user_id': '',
>>>>>>> 2d759fd083eceec8035e5b0401ea6986259f5f82
            'activity_id': activityID,
            'rule': 'choose_all',
            'choose_all': [
                { 'option_id': optionID }],
        }, {
            headers: {
                Authorization: `Bearer ${document.cookie.split('service_token=')[1]}`,
            },
        });
    } catch (e) {
        console.log(e.response.data);
    }
}

async function getUserResult() {
    const resActivity = await axios.post('/activities/getActivities', {
        'filter': { name: '第28屆學生議會議員補選' },
        'limit': 0, 'skip': 0, 'sort': 0,
    }, {});
    activityID = resActivity.data.data[0]._id;
    const resVote = await axios.post('/votes/getVotes', {
<<<<<<< HEAD
        // TODO:token to get the votes
=======
        //TODO:token API updated
>>>>>>> 2d759fd083eceec8035e5b0401ea6986259f5f82
        'filter': { activity_id: activityID, token: '' },
        'limit': 0, 'skip': 0, 'sort': 0,
    }, {});
    if (Object.values(resVote.data)[1].length === 0) {
        return 0;
    } else {
        const UserVoteRecord = (Object.values(resVote.data)[1])[0]._id;
<<<<<<< HEAD
=======
        console.log(String(UserVoteRecord.length));
>>>>>>> 2d759fd083eceec8035e5b0401ea6986259f5f82
        return UserVoteRecord;
    }
};
