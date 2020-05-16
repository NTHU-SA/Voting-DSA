const votes = {};
const {member1, member2, member3} = votes;
const remarks = {'remark1': undefined, 'remark2': undefined, 'remark3': undefined};
const optionIDs = new Array(Object.keys(remarks).length);

const mongoObjOfObj2ID = (i) => i.data.data[0]._id;
const mongoObj2ID = (i) => i.data._id;
const isUndefined = (i) => i === undefined;
const getIdAttr = (i) => $(i).attr('id');
const attr2ID = (i) => $('#' + i);

const votesClick = (
    Opt, objYes, yes, yesUndo, objNo, no, noUndo, objWhatever, whatever,
    whateverUndo, bk1, bk2, bk3) => {
    temp = [], params = [];
    temp.push(objYes, yes, yesUndo, objNo, no, noUndo, objWhatever, whatever, whateverUndo, bk1, bk2, bk3);
    temp.forEach((element) => params.push(getIdAttr(element)));

    paramsList = {
        'objYes': '', 'yes': '', 'yesUndo': '',
        'objNo': '', 'no': '', 'noUndo': '',
        'objWhatever': '', 'whatever': '',
        'whateverUndo': '', 'bk1': '', 'bk2': '', 'bk3': '',
    };
    for (i = 0; i < params.length + 1; i++) paramsList[Object.keys(paramsList)[i]] = params[i];

    memberOption = paramsList.bk1.split('bk1')[0];
    idx = memberOption.split('member')[1];
    remarkIdx = 'remark' + idx;

    if (Opt == 1) {
        attr2ID(paramsList.objYes).css('max-width', '50%');
        attr2ID(paramsList.objYes).css('opacity', '100%');
        attr2ID(paramsList.yes).css('display', 'none');
        attr2ID(paramsList.yesUndo).css('display', 'block');
        attr2ID(paramsList.bk2).css('display', 'none');
        attr2ID(paramsList.bk3).css('display', 'none');
        votes[`${memberOption}`] = '我要投給他';
    } else if (Opt == 2) {
        attr2ID(paramsList.objNo).css('max-width', '50%');
        attr2ID(paramsList.objNo).css('opacity', '100%');
        attr2ID(paramsList.no).css('display', 'none');
        attr2ID(paramsList.noUndo).css('display', 'block');
        attr2ID(paramsList.bk1).css('display', 'none');
        attr2ID(paramsList.bk3).css('display', 'none');
        votes[`${memberOption}`] = '我不投給他';
    } else if (Opt == 3) {
        attr2ID(paramsList.objWhatever).css('max-width', '50%');
        attr2ID(paramsList.objWhatever).css('opacity', '100%');
        attr2ID(paramsList.whatever).css('display', 'none');
        attr2ID(paramsList.whateverUndo).css('display', 'block');
        attr2ID(paramsList.bk1).css('display', 'none');
        attr2ID(paramsList.bk2).css('display', 'none');
        votes[`${memberOption}`] = '我沒有意見';
    }
    remarks[`${remarkIdx}`] = idx + '號候選人：' + votes[`${memberOption}`];
};

const voteClickUndo = (
    Opt, objYes, yes, yesUndo, objNo, no, noUndo, objWhatever, whatever,
    whateverUndo, bk1, bk2, bk3) => {
    temp = [], params = [];
    temp.push(objYes, yes, yesUndo, objNo, no, noUndo, objWhatever, whatever, whateverUndo, bk1, bk2, bk3);
    temp.forEach((element) => params.push(getIdAttr(element)));

    paramsList = {
        'objYes': '', 'yes': '', 'yesUndo': '',
        'objNo': '', 'no': '', 'noUndo': '',
        'objWhatever': '', 'whatever': '',
        'whateverUndo': '', 'bk1': '', 'bk2': '', 'bk3': '',
    };
    for (i = 0; i < params.length + 1; i++) paramsList[Object.keys(paramsList)[i]] = params[i];

    if (Opt == 1) {
        attr2ID(paramsList.objYes).css('max-width', '0%');
        attr2ID(paramsList.objYes).css('opacity', '0%');
        attr2ID(paramsList.yes).css('display', 'block');
        attr2ID(paramsList.yesUndo).css('display', 'none');
        attr2ID(paramsList.bk2).css('display', 'block');
        attr2ID(paramsList.bk3).css('display', 'block');
    } else if (Opt == 2) {
        attr2ID(paramsList.objNo).css('max-width', '0%');
        attr2ID(paramsList.objNo).css('opacity', '0%');
        attr2ID(paramsList.no).css('display', 'block');
        attr2ID(paramsList.noUndo).css('display', 'none');
        attr2ID(paramsList.bk1).css('display', 'block');
        attr2ID(paramsList.bk3).css('display', 'block');
    } else if (Opt == 3) {
        attr2ID(paramsList.objWhatever).css('max-width', '0%');
        attr2ID(paramsList.objWhatever).css('opacity', '0%');
        attr2ID(paramsList.whatever).css('display', 'block');
        attr2ID(paramsList.whateverUndo).css('display', 'none');
        attr2ID(paramsList.bk1).css('display', 'block');
        attr2ID(paramsList.bk2).css('display', 'block');
    }
};

async function checkVote() {
    try {
        $('.modal-title').html('投票結果');
        $('.modalCheck').html('您確定要將投票結果送出嗎？');
        const resUserVoteRecord = await getUserResult();
        if (String(resUserVoteRecord).length === 24 && resUserVoteRecord !== undefined) {
            $('.modalInfo').html('您已經投過票了哦！');
            $('.btn-modalInfoSecondary').css('display', 'none');
        } else if (Object.keys(votes).every(isUndefined) || Object.keys(votes).length < 3) {
            $('.modalInfo')
                .html('尚未選擇所有候選人哦！請您重新返回投票頁面進行投票');
            $('.btn-modalInfoSecondary').css('display', 'none');
        } else if (Object.keys(votes).length === 3) {
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
    } catch (e) {
        console.log(e.response.data);
    }
}

async function getUserResult() {
    const resUser = await axios.post('/users/getUser', {},
        {
            headers: {
                Authentication:
                    `Bearer ${document.cookie.split('service_token=')[1]} `,
            },
        });
    userID = mongoObj2ID(resUser);
    const resActivity = await axios.post(
        '/activities/getActivities', {
            'filter': {name: '第28屆學生議會議員補選'},
        });
    activityID = mongoObjOfObj2ID(resActivity);
    let resVote = await axios.post(
        '/activities/getActivities', {
            'filter': {
                _id: activityID, users: userID,
            },
        },
        {});
    if (resVote.data.data.length === 0) resVote = undefined;
    else resVote = mongoObjOfObj2ID(resVote);
    return resVote;
};


async function sendUserResult() {
    try {
        const resActivity = await axios.post(
            '/activities/getActivities', {
                'filter': {name: '第28屆學生議會議員補選'},
            }, {});
        activityID = mongoObjOfObj2ID(resActivity);
        const resOption = await axios.post(
            '/options/getOptions', {
                'filter': {
                    activity_id: activityID,
                    type: 'candidate',
                },
            });
        for (i = 0; i < optionIDs.length; i++) optionIDs[i] = resOption.data.data[i]._id;
        await axios.post(
            '/votes/addVote', {
                'activity_id': activityID,
                'rule': 'choose_all',
                'choose_all': [
                    {
                        'option_id': optionIDs[0],
                        'remark': remarks.remark1,
                    },
                    {
                        'option_id': optionIDs[1],
                        'remark': remarks.remark2,
                    },
                    {
                        'option_id': optionIDs[2],
                        'remark': remarks.remark3,
                    },
                ],
            },
            {
                headers: {
                    Authentication:
                        `Bearer ${document.cookie.split('service_token=')[1]} `,
                },
            });
    } catch (e) {
        console.log(e.response.data);
    }
}
