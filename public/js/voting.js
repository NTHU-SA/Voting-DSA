const votes = {};
const remarks = {
  'remark1': '',
  'remark2': '',
  'remark3': ''
};
const optionIDs = new Array(Object.keys(remarks).length);

function votesClick(
    Opt, objYes, yes, yesUndo, objNo, no, noUndo, objWhatever, whatever,
    whateverUndo, bk1, bk2, bk3) {
  objYes = $(objYes).attr('id');
  yes = $(yes).attr('id');
  yesUndo = $(yesUndo).attr('id');
  objNo = $(objNo).attr('id');
  no = $(no).attr('id');
  noUndo = $(noUndo).attr('id');
  objWhatever = $(objWhatever).attr('id');
  whatever = $(whatever).attr('id');
  whateverUndo = $(whateverUndo).attr('id');

  bk1 = $(bk1).attr('id');
  bk2 = $(bk2).attr('id');
  bk3 = $(bk3).attr('id');
  memberOption = bk1.split('bk1')[0];
  idx = memberOption.split('member')[1]
  remarkIdx = 'remark' + idx;
  console.log(remarkIdx)
  if (Opt == 1) {
    $('#' + objYes).css('max-width', '50%');
    $('#' + objYes).css('opacity', '100%');
    $('#' + yes).css('display', 'none');
    $('#' + yesUndo).css('display', 'block');
    $('#' + bk2).css('display', 'none');
    $('#' + bk3).css('display', 'none');
    votes[`${memberOption}`] = '我要投給他';
  }
  else if (Opt == 2) {
    $('#' + objNo).css('max-width', '50%');
    $('#' + objNo).css('opacity', '100%');
    $('#' + no).css('display', 'none');
    $('#' + noUndo).css('display', 'block');
    $('#' + bk1).css('display', 'none');
    $('#' + bk3).css('display', 'none');
    votes[`${memberOption}`] = '我不投給他';
  }
  else if (Opt == 3) {
    $('#' + objWhatever).css('max-width', '50%');
    $('#' + objWhatever).css('opacity', '100%');
    $('#' + whatever).css('display', 'none');
    $('#' + whateverUndo).css('display', 'block');
    $('#' + bk1).css('display', 'none');
    $('#' + bk2).css('display', 'none');
    votes[`${memberOption}`] = '我沒有意見';
  }
  remarks[`${remarkIdx}`] = idx + '號候選人：' + votes[`${memberOption}`];
}


function voteClickUndo(
    Opt, objYes, yes, yesUndo, objNo, no, noUndo, objWhatever, whatever,
    whateverUndo, bk1, bk2, bk3) {
  objYes = $(objYes).attr('id');
  yes = $(yes).attr('id');
  yesUndo = $(yesUndo).attr('id');

  objNo = $(objNo).attr('id');
  no = $(no).attr('id');
  noUndo = $(noUndo).attr('id');

  objWhatever = $(objWhatever).attr('id');
  whatever = $(whatever).attr('id');
  whateverUndo = $(whateverUndo).attr('id');

  bk1 = $(bk1).attr('id');
  bk2 = $(bk2).attr('id');
  bk3 = $(bk3).attr('id');

  if (Opt == 1) {
    $('#' + objYes).css('max-width', '0%');
    $('#' + objYes).css('opacity', '0%');
    $('#' + yes).css('display', 'block');
    $('#' + yesUndo).css('display', 'none');
    $('#' + bk2).css('display', 'block');
    $('#' + bk3).css('display', 'block');
  } else if (Opt == 2) {
    $('#' + objNo).css('max-width', '0%');
    $('#' + objNo).css('opacity', '0%');
    $('#' + no).css('display', 'block');
    $('#' + noUndo).css('display', 'none');
    $('#' + bk1).css('display', 'block');
    $('#' + bk3).css('display', 'block');
  } else if (Opt == 3) {
    $('#' + objWhatever).css('max-width', '0%');
    $('#' + objWhatever).css('opacity', '0%');
    $('#' + whatever).css('display', 'block');
    $('#' + whateverUndo).css('display', 'none');
    $('#' + bk1).css('display', 'block');
    $('#' + bk2).css('display', 'block');
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
      const votesMarkup = '您的所選擇的候選人依序爲<br>' +
          '{{each(i,val) votes}}' +
          '<p>' +
          '${i}：' +
          '號候選人：' +
          '${val}' +
          '</p>' +
          '{{/each}}';
      $.template('votesTemplate', votesMarkup);
      $.tmpl('votesTemplate', votes).appendTo('.modalInfo');
      $('.btn-modalInfoPrimary').css('display', 'inline');
      $('.btn-modalInfoSecondary').css('display', 'inline');
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
    // optionIDs.forEach(ele, index => {
    //   ele = resOption.data.data[index]._id;
    // });
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
              'remark': remarks.remark1,
            },
            {
              'option_id': optionID2,
              'remark': remarks.remark2,
            },
            {
              'option_id': optionID3,
              'remark': remarks.remark3,
            },
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
