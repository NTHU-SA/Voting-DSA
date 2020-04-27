// document.cookie = ""

let voteOpt = null;
let imgDisappear = null;

const clientId = 'nthusa';

let vote_answer1, vote_answer2, vote_answer3

function voteOneClick(Opt) {
    voteOpt = Opt;
    if (Opt == 1) {
        $('#member-one-vote-yes').css('max-width', '50%');
        $('#member-one-vote-yes').css('opacity', '100');
        $('#oneYescancelNot').css('display', 'none');
        $('#oneYescancel').css('display', 'block');
        $('#member-one-2').css('display', 'none');
        $('#member-one-3').css('display', 'none');
        vote_answer1 = {
            ['question']: '第一號候選人',
            ['answer']: '我要投給他'
        }
    }
    else if (Opt == 2) {
        $('#member-one-vote-no').css('max-width', '50%');
        $('#member-one-vote-no').css('opacity', '100');
        $('#oneNocancelNot').css('display', 'none');
        $('#oneNocancel').css('display', 'block');
        $('#member-one-1').css('display', 'none');
        $('#member-one-3').css('display', 'none');
        vote_answer1 = {
            ['question']: '第一號候選人',
            ['answer']: '我不投給他'
        }

    }
    else if (Opt == 3) {
        $('#member-one-vote-withoutOpinion').css('max-width', '50%');
        $('#member-one-vote-withoutOpinion').css('opacity', '100');
        $('#oneWOcancelNot').css('display', 'none');
        $('#oneWOcancel').css('display', 'block');
        $('#member-one-1').css('display', 'none');
        $('#member-one-2').css('display', 'none');
        vote_answer1 = {
            ['question']: '第一號候選人',
            ['answer']: '我沒意見'
        }
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
    }
    else if (Opt == 2) {
        $('#member-one-vote-no').css('max-width', '0%');
        $('#member-one-vote-no').css('opacity', '0');
        $('#oneNocancelNot').css('display', 'block');
        $('#oneNocancel').css('display', 'none');
        $('#member-one-1').css('display', 'block');
        $('#member-one-3').css('display', 'block');
    }
    else if (Opt == 3) {
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
        vote_answer2 = {
            ['question']: '第二號候選人',
            ['answer']: '我要投給他'
        }
    }
    else if (Opt == 2) {
        $('#member-two-vote-no').css('max-width', '50%');
        $('#member-two-vote-no').css('opacity', '100');
        $('#twoNocancelNot').css('display', 'none');
        $('#twoNocancel').css('display', 'block');
        $('#member-two-1').css('display', 'none');
        $('#member-two-3').css('display', 'none');
        vote_answer2 = {
            ['question']: '第二號候選人',
            ['answer']: '我不頭給他'
        }
    }
    else if (Opt == 3) {
        $('#member-two-vote-withoutOpinion').css('max-width', '50%');
        $('#member-two-vote-withoutOpinion').css('opacity', '100');
        $('#twoWOcancelNot').css('display', 'none');
        $('#twoWOcancel').css('display', 'block');
        $('#member-two-1').css('display', 'none');
        $('#member-two-2').css('display', 'none');
        vote_answer2 = {
            ['question']: '第二號候選人',
            ['answer']: '我沒意見'
        }
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
    }

    else if (Opt == 2) {
        $('#member-two-vote-no').css('max-width', '0%');
        $('#member-two-vote-no').css('opacity', '0');
        $('#twoNocancelNot').css('display', 'block');
        $('#twoNocancel').css('display', 'none');
        $('#member-two-1').css('display', 'block');
        $('#member-two-3').css('display', 'block');
    }
    else if (Opt == 3) {
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
        vote_answer3 = {
            ['question']: '第三號候選人',
            ['answer']: '我要投給他'
        }
    }
    else if (Opt == 2) {
        $('#member-three-vote-no').css('max-width', '50%');
        $('#member-three-vote-no').css('opacity', '100');
        $('#threeNocancelNot').css('display', 'none');
        $('#threeNocancel').css('display', 'block');
        $('#member-three-1').css('display', 'none');
        $('#member-three-3').css('display', 'none');
        vote_answer3 = {
            ['question']: '第三號候選人',
            ['answer']: '我不投給他'
        }
    }
    else if (Opt == 3) {
        $('#member-three-vote-withoutOpinion').css('max-width', '50%');
        $('#member-three-vote-withoutOpinion').css('opacity', '100');
        $('#threeWOcancelNot').css('display', 'none');
        $('#threeWOcancel').css('display', 'block');
        $('#member-three-1').css('display', 'none');
        $('#member-three-2').css('display', 'none');
        vote_answer3 = {
            ['question']: '第三號號選人',
            ['answer']: '我沒意見'
        }
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
    }
    else if (Opt == 2) {
        $('#member-three-vote-no').css('max-width', '0%');
        $('#member-three-vote-no').css('opacity', '0');
        $('#threeNocancelNot').css('display', 'block');
        $('#threeNocancel').css('display', 'none');
        $('#member-three-1').css('display', 'block');
        $('#member-three-3').css('display', 'block');
    }
    else if (Opt == 3) {
        $('#member-three-vote-withoutOpinion').css('max-width', '0%');
        $('#member-three-vote-withoutOpinion').css('opacity', '0');
        $('#threeWOcancelNot').css('display', 'block');
        $('#threeWOcancel').css('display', 'none');
        $('#member-three-1').css('display', 'block');
        $('#member-three-2').css('display', 'block');
    }
}

async function sendResult() {
    console.log(document.cookie);
    try {
        const result = await axios.post('http://localhost:3000/api/vote', {
            activity_name: 'first_vote',
            vote_answers: [
                vote_answer1, vote_answer2, vote_answer3
            ]
        }, {
            headers: {
                Authorization: `Bearer ${document.cookie.split('service_token=')[1]}`
            }
        })
        console.log(result);
    }
    catch (e) {
        console.log(e.response.data);
    }
}
