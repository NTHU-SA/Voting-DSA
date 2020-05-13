let voteOpt1 = null;
let voteOpt2 = null;
let voteOpt3 = null;
let remark1 = null;
let remark2 = null;
let remark3 = null;

function votesClick(
    Opt, objYes, objYesUndo, objNo, objNoUndo, objWhatever, objWhateverUndo) {
  if (Opt == 1) {
    $('#' + objYes).css('max-width', '50%');
    $('#' + objYes).css('opacity', '100%');
  }
}

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
  try {
    $('.modal-title').html('投票結果');
    $('.modalCheck').html('您確定要將投票結果送出嗎？');
    const resUserVoteRecord = await getUserResult();
    if (String(resUserVoteRecord).length === 24 && resUserVoteRecord !== null) {
      $('.modalInfo').html('您已經投過票了哦！');
    } else if (voteOpt1 === null || voteOpt2 === null || voteOpt3 === null) {
      $('.modalInfo')
          .html('尚未選擇所有候選人哦！請您重新返回投票頁面進行投票');
      $('.btn-modalInfoSecondary').css('display', 'none');
    } else {
      $('.modalInfo')
          .html(
              '您的所選擇的候選人依序爲<br>' +
              '一號候選人：' + voteOpt1 + '<br>' +
              '二號候選人：' + voteOpt2 + '<br>' +
              '三號候選人：' + voteOpt3);
      $('.btn-modalInfoPrimary').css('display', 'inline');
      $('.btn-modalInfoSecondary').css('display', 'inline');
      remark1 = `一號候選人：${voteOpt1}`;
      remark2 = `二號候選人：${voteOpt2}`;
      remark3 = `三號候選人：${voteOpt3}`;
    }
  } catch (e) {
    console.log(e.response.data);
  }
}

async function getUserResult() {
  const resActivity = await axios.post(
      '/activities/getActivities', {
        'filter': {name: '第28屆學生議會議員補選'},
        'limit': 0,
        'skip': 0,
        'sort': 0,
      },
      {});
  activityID = resActivity.data.data[0]._id;
  const resVote = await axios.post(
      '/votes/getVotes', {
        // TODO:token to get the votes
        'filter': {activity_id: activityID, token: ''},
        'limit': 0,
        'skip': 0,
        'sort': 0,
      },
      {});
  if (Object.values(resVote.data)[1].length === 0) {
    return 0;
  } else {
    const UserVoteRecord = (Object.values(resVote.data)[1])[0]._id;
    return UserVoteRecord;
  }
};

async function sendUserResult() {
  try {
    const resActivity = await axios.post(
        '/activities/getActivities', {
          'filter': {name: '第28屆學生議會議員補選'},
          'limit': 0,
          'skip': 0,
          'sort': 0,
        },
        {});
    activityID = resActivity.data.data[0]._id;
    const resOption = await axios.post(
        '/options/getOptions', {
          'filter': {
            activity_id: activityID,
            type: 'candidate',
          },
          'limit': 0,
          'skip': 0,
          'sort': 0,
        },
        {});
    optionID1 = resOption.data.data[0]._id;
    optionID2 = resOption.data.data[1]._id;
    optionID3 = resOption.data.data[2]._id;
    await axios.post(
        '/votes/addVote', {
          'activity_id': activityID,
          'rule': 'choose_all',
          'choose_all': [
            {
              'option_id': optionID1,
              'remark': remark1,
            },
            {
              'option_id': optionID2,
              'remark': remark2,
            },
            {
              'option_id': optionID3,
              'remark': remark3,
            }
          ],
        },
        {
          headers: {
            Authorization:
                `Bearer ${document.cookie.split('service_token=')[1]}`,
          },
        });
  } catch (e) {
    console.log(e.response.data);
  }
}
