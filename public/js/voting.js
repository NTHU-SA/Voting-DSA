document.cookie = 'service_token=';

let voteOpt = null;
let imgDisappear = null;

function voteOneClick(Opt) {
    voteOpt = Opt;
    if (Opt == 1) {
        $('#member-one-vote-yes').css('max-width', '50%');
        $('#member-one-vote-yes').css('opacity', '100');
        $('#oneYescancelNot').css('display', 'none');
        $('#oneYescancel').css('display', 'block');
        $('#member-one-2').css('display', 'none');
        $('#member-one-3').css('display', 'none');

    } else if (Opt == 2) {
        $('#member-one-vote-no').css('max-width', '50%');
        $('#member-one-vote-no').css('opacity', '100');
        $('#oneNocancelNot').css('display', 'none');
        $('#oneNocancel').css('display', 'block');
        $('#member-one-1').css('display', 'none');
        $('#member-one-3').css('display', 'none');
    } else if (Opt == 3) {
        $('#member-one-vote-withoutOpinion').css('max-width', '50%');
        $('#member-one-vote-withoutOpinion').css('opacity', '100');
        $('#oneWOcancelNot').css('display', 'none');
        $('#oneWOcancel').css('display', 'block');
        $('#member-one-1').css('display', 'none');
        $('#member-one-2').css('display', 'none');
    }
}

function imgOneClick(Opt) {
    imgDisappear = Opt;
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
}

function voteTwoClick(Opt) {
    voteOpt = Opt;
    if (Opt == 1) {
        $('#member-two-vote-yes').css('max-width', '50%');
        $('#member-two-vote-yes').css('opacity', '100');
        $('#twoYescancelNot').css('display', 'none');
        $('#twoYescancel').css('display', 'block');
        $('#member-two-2').css('display', 'none');
        $('#member-two-3').css('display', 'none');

    } else if (Opt == 2) {
        $('#member-two-vote-no').css('max-width', '50%');
        $('#member-two-vote-no').css('opacity', '100');
        $('#twoNocancelNot').css('display', 'none');
        $('#twoNocancel').css('display', 'block');
        $('#member-two-1').css('display', 'none');
        $('#member-two-3').css('display', 'none');
    } else if (Opt == 3) {
        $('#member-two-vote-withoutOpinion').css('max-width', '50%');
        $('#member-two-vote-withoutOpinion').css('opacity', '100');
        $('#twoWOcancelNot').css('display', 'none');
        $('#twoWOcancel').css('display', 'block');
        $('#member-two-1').css('display', 'none');
        $('#member-two-2').css('display', 'none');
    }
}

function imgTwoClick(Opt) {
    imgDisappear = Opt;
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
}

function voteThreeClick(Opt) {
    voteOpt = Opt;
    if (Opt == 1) {
        $('#member-three-vote-yes').css('max-width', '50%');
        $('#member-three-vote-yes').css('opacity', '100');
        $('#threeYescancelNot').css('display', 'none');
        $('#threeYescancel').css('display', 'block');
        $('#member-three-2').css('display', 'none');
        $('#member-three-3').css('display', 'none');

    } else if (Opt == 2) {
        $('#member-three-vote-no').css('max-width', '50%');
        $('#member-three-vote-no').css('opacity', '100');
        $('#threeNocancelNot').css('display', 'none');
        $('#threeNocancel').css('display', 'block');
        $('#member-three-1').css('display', 'none');
        $('#member-three-3').css('display', 'none');
    } else if (Opt == 3) {
        $('#member-three-vote-withoutOpinion').css('max-width', '50%');
        $('#member-three-vote-withoutOpinion').css('opacity', '100');
        $('#threeWOcancelNot').css('display', 'none');
        $('#threeWOcancel').css('display', 'block');
        $('#member-three-1').css('display', 'none');
        $('#member-three-2').css('display', 'none');
    }
}

function imgThreeClick(Opt) {
    imgDisappear = Opt;
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
    try {
        const resUserVoteRecord = await getUserResult();
        console.log(resUserVoteRecord);
        if (resUserVoteRecord) {
            //TODO: interface at front-end
            console.log('you have already voted');
        } else {
            //TODO: interface at front-end
            console.log('plz vote');
            await sendUserResult();
        }
    } catch (e) {
        console.log(e.response.data);
    }
}

async function sendUserResult() {
    // console.log(document.cookie);
    //TODO:403 error, check it later
    try {
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

        await axios.post('/votes/addVote', {
            'user_id': '',
            'activity_id': activityID,
            'rule': 'choose_one',
            'choose_one': optionID,
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
    try {
        const resUserID = await axios.post('/users/getUsers', {
            'filter': { student_id: '' },
            'limit': 0, 'skip': 0, 'sort': 0,
        }, {});
        const userID = resUserID.data.data[0]._id;
        const resVote = await axios.post('/votes/getVote', { '_id': userID }, {});
        const UserVoteRecord = resVote.config.data;
        return UserVoteRecord;
    } catch (e) {
        console.log(e.response.data);
    }
};
