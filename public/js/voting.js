$(document).ready(() => {
    $('#chooseTypeModal').modal('show');
    getAvailableActivities();
    $('.btn-chooseType').click(() => {
    });
});

let votes = {};
const chooseType = {
    'chooseAll': undefined;
};
const {
    member1,
    member2,
    member3
} = votes;
var remarks = {};
var voteName = "";
const optionIDs = new Array(Object.keys(remarks).length);

const mongoObjOfObj2ID = (i) => i.data.data[0]._id;
const mongoObj2ID = (i) => i.data._id;
const isUndefined = (i) => i === undefined;
const getIdAttr = (i) => $(i).attr('id');
const attr2ID = (i) => $('#' + i);

const chooseOneClick = (
    Opt, objYes, yes, yesUndo, bk1) => {
    temp = [], params = [];
    temp.push(objYes, yes, yesUndo, bk1);
    temp.forEach((element) => params.push(getIdAttr(element)));

    paramsList = {
        'objYes': '',
        'yes': '',
        'yesUndo': '',
        'bk1': '',
        'memberbk1': '',
        'memberbk2': '',
        'memberbk3': '',
    };
    for (i = 0; i < params.length + 1; i++) paramsList[Object.keys(paramsList)[i]] = params[i];
    memberOption = paramsList.bk1.split('bk1')[0];
    bk1 = paramsList.bk1.split(`${memberOption}`)[1];
    idx = memberOption.split('member')[1];
    remarkIdx = 'remark' + idx;
    for (i = 4; i < 4 + 2 + 1; i++) paramsList[Object.keys(paramsList)[i]] = 'member' + (i - 3) + 'bk' + 1;

    if (Opt === 1) {
        attr2ID(paramsList.objYes).css('max-width', '50%');
        attr2ID(paramsList.objYes).css('opacity', '100%');
        attr2ID(paramsList.yes).css('display', 'none');
        attr2ID(paramsList.yesUndo).css('display', 'block');
        attr2ID(paramsList.bk1).css('display', 'block');
        if (memberOption === 'member1') {
            attr2ID(paramsList.memberbk2).hide();
            attr2ID(paramsList.memberbk3).hide();
        } else if (memberOption === 'member2') {
            attr2ID(paramsList.memberbk1).hide();
            attr2ID(paramsList.memberbk3).hide();
        } else if (memberOption === 'member3') {
            attr2ID(paramsList.memberbk1).hide();
            attr2ID(paramsList.memberbk2).hide();
        }
        votes[`${memberOption}`] = idx;
    } else if (Opt === 0) {
        attr2ID(paramsList.objYes).css('max-width', '0%');
        attr2ID(paramsList.objYes).css('opacity', '0%');
        attr2ID(paramsList.yes).css('display', 'block');
        attr2ID(paramsList.yesUndo).css('display', 'none');
        if (memberOption === 'member1') {
            attr2ID(paramsList.memberbk2).show();
            attr2ID(paramsList.memberbk3).show();
        } else if (memberOption === 'member2') {
            attr2ID(paramsList.memberbk1).show();
            attr2ID(paramsList.memberbk3).show();
        } else if (memberOption === 'member3') {
            attr2ID(paramsList.memberbk1).show();
            attr2ID(paramsList.memberbk2).show();
        }
        votes = {};
    }
    remarks[`${remarkIdx}`] = idx + '號候選人：' + votes[`${memberOption}`];
};

const chooseAllClick = (
    Opt, objYes, yes, yesUndo, objNo, no, noUndo, objWhatever, whatever,
    whateverUndo, bk1, bk2, bk3) => {
    temp = [], params = [];
    temp.push(objYes, yes, yesUndo, objNo, no, noUndo, objWhatever, whatever, whateverUndo, bk1, bk2, bk3);
    temp.forEach((element) => params.push(getIdAttr(element)));

    paramsList = {
        'objYes': '',
        'yes': '',
        'yesUndo': '',
        'objNo': '',
        'no': '',
        'noUndo': '',
        'objWhatever': '',
        'whatever': '',
        'whateverUndo': '',
        'bk1': '',
        'bk2': '',
        'bk3': '',
    };
    for (i = 0; i < params.length + 1; i++) paramsList[Object.keys(paramsList)[i]] = params[i];

    memberOption = paramsList.bk1.split('bk1')[0];
    idx = memberOption.split('member')[1];
    remarkIdx = 'remark' + idx;

    if (Opt === 1) {
        attr2ID(paramsList.objYes).css('max-width', '50%');
        attr2ID(paramsList.objYes).css('opacity', '100%');
        attr2ID(paramsList.yes).css('display', 'none');
        attr2ID(paramsList.yesUndo).css('display', 'block');
        attr2ID(paramsList.bk2).css('display', 'none');
        attr2ID(paramsList.bk3).css('display', 'none');
        votes[`${memberOption}`] = '我要投給他';
    } else if (Opt === 2) {
        attr2ID(paramsList.objNo).css('max-width', '50%');
        attr2ID(paramsList.objNo).css('opacity', '100%');
        attr2ID(paramsList.no).css('display', 'none');
        attr2ID(paramsList.noUndo).css('display', 'block');
        attr2ID(paramsList.bk1).css('display', 'none');
        attr2ID(paramsList.bk3).css('display', 'none');
        votes[`${memberOption}`] = '我不投給他';
    } else if (Opt === 3) {
        attr2ID(paramsList.objWhatever).css('max-width', '50%');
        attr2ID(paramsList.objWhatever).css('opacity', '100%');
        attr2ID(paramsList.whatever).css('display', 'none');
        attr2ID(paramsList.whateverUndo).css('display', 'block');
        attr2ID(paramsList.bk1).css('display', 'none');
        attr2ID(paramsList.bk2).css('display', 'none');
        votes[`${memberOption}`] = '我沒有意見';
    } else if (Opt == -2) {
        attr2ID(paramsList.objYes).css('max-width', '0%');
        attr2ID(paramsList.objYes).css('opacity', '0%');
        attr2ID(paramsList.yes).css('display', 'block');
        attr2ID(paramsList.yesUndo).css('display', 'none');
        attr2ID(paramsList.bk2).css('display', 'block');
        attr2ID(paramsList.bk3).css('display', 'block');
    } else if (Opt == -1) {
        attr2ID(paramsList.objNo).css('max-width', '0%');
        attr2ID(paramsList.objNo).css('opacity', '0%');
        attr2ID(paramsList.no).css('display', 'block');
        attr2ID(paramsList.noUndo).css('display', 'none');
        attr2ID(paramsList.bk1).css('display', 'block');
        attr2ID(paramsList.bk3).css('display', 'block');
    } else if (Opt == 0) {
        attr2ID(paramsList.objWhatever).css('max-width', '0%');
        attr2ID(paramsList.objWhatever).css('opacity', '0%');
        attr2ID(paramsList.whatever).css('display', 'block');
        attr2ID(paramsList.whateverUndo).css('display', 'none');
        attr2ID(paramsList.bk1).css('display', 'block');
        attr2ID(paramsList.bk2).css('display', 'block');
    }
    remarks[`${remarkIdx}`] = idx + '號候選人：' + votes[`${memberOption}`];
};


async function checkVote() {
    try {
        $('.modal-title').html('投票結果');
        $('.modalCheck').html('您確定要將投票結果送出嗎？');
        const resUserVoteRecord = await getUserResult();
        if (String(resUserVoteRecord).length === 24 && resUserVoteRecord !== undefined) {
            $('.modalInfo').html('您已經投過票了哦！');
            $('.btn-modalInfoSecondary').css('display', 'none');
            return 0;
        }
        if (chooseType.chooseAll === 1) {
            if (Object.keys(remarks).every(isUndefined) === true || (Object.keys(remarks).length > Object.keys(votes).length) !== false) {
                $('.modalInfo')
                    .html('尚未選擇所有候選人哦！請您重新返回投票頁面進行投票');
                $('.btn-modalInfoSecondary').css('display', 'none');
            } else if (Object.keys(votes).length === Object.keys(remarks).length) {
                $('.modalInfo').html('');
                votesTemplate = Object.values(remarks);
                const votesMarkup =
                    '<p> 您的所選擇的候選人依序爲： </p>' +
                    '{{each(i,val) votesTemplate}}' +
                    '<p>' + '${val}' + '</p>' +
                    '{{/each}}';
                $.template('votesTemplate', votesMarkup);
                $.tmpl('votesTemplate', votesMarkup).appendTo('.modalInfo');
                $('.btn-modalInfoPrimary').css('display', 'inline');
                $('.btn-modalInfoSecondary').css('display', 'inline');
            }
        } else if (chooseType.chooseAll === 0) {
            if (Object.keys(votes).length < 1) {
                $('.modalInfo')
                    .html('尚未選擇候選人哦！請您重新返回投票頁面進行投票');
                $('.btn-modalInfoSecondary').css('display', 'none');
            } else if (Object.keys(votes).length === 1) {
                votesTemplate = Object.values(votes);
                const votesMarkup =
                    '<p> 您的所選擇的候選人爲： </p>' +
                    '{{each(i,val) votesTemplate}}' +
                    '<p>' + '${val}' + ' 號候選人' + '</p>' +
                    '{{/each}}';
                $.template('votesTemplate', votesMarkup);
                $.tmpl('votesTemplate', votesMarkup).appendTo('.modalInfo');
                $('.btn-modalInfoPrimary').css('display', 'inline');
                $('.btn-modalInfoSecondary').css('display', 'inline');
            }
        }
    } catch (e) {
        console.log(e);
    }
}

async function getUserResult() {
    const resUser = await axios.post('/users/getUser', {}, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,

        }
    });
    userID = mongoObj2ID(resUser);
    const resActivity = await axios.post(
        '/activities/getActivities', {
        'filter': {
            name: voteName
        },
    }, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    activityID = mongoObjOfObj2ID(resActivity);
    let resVote = await axios.post(
        '/activities/getActivities', {
        'filter': {
            _id: activityID,
            users: userID,
        },
    }, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    if (resVote.data.data.length === 0) resVote = undefined;
    else resVote = mongoObjOfObj2ID(resVote);
    return resVote;
};

async function sendUserResult() {
    try {
        const resActivity = await axios.post(
            '/activities/getActivities', {
            'filter': {
                name: voteName
            },
        }, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        activityID = mongoObjOfObj2ID(resActivity);
        const resOption = await axios.post(
            '/options/getOptions', {
            'filter': {
                activity_id: activityID,
                type: 'candidate',
            },
        }, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        if (chooseType.chooseAll === 1) {
            let voteContent = [];
            for (i = 0; i < candidates.length; i++) {
                voteContent.push({
                    'option_id': candidates[i]._id,
                    'remark': votes[`member${i+1}`],
                });
            }
            resp = await axios.post(
                '/votes/addVote', {
                'activity_id': activityID,
                'rule': 'choose_all',
                'choose_all': voteContent,
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            $('.modalToken').html(`投票成功！<br>請保存好您的存根權杖，以供驗票使用：<br>${resp.data.token}`);
            $('#modalToken').modal('show');
        } else if (chooseType.chooseAll === 0) {
            await axios.post(
                '/votes/addVote', {
                'activity_id': activityID,
                'rule': 'choose_one',
                'choose_one': [{
                    'option_id': mongoObjOfObj2ID(resOption),
                    'remark': votes,
                },],
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
        }
    } catch (e) {
        console.log(e);
    }
}
