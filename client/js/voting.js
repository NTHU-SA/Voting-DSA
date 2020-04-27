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
            ['question']: 'q`${Opt}`',
            ['answer']: 'a`${Opt}`'
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
            ['question']: 'q`${Opt}`',
            ['answer']: 'a`${Opt}`'
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
            ['question']: 'q`${Opt}`',
            ['answer']: 'a`${Opt}`'
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
            ['question']: 'q`${Opt}`',
            ['answer']: 'a`${Opt}`'
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
            ['question']: 'q`${Opt}`',
            ['answer']: 'a`${Opt}`'
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
            ['question']: 'q`${Opt}`',
            ['answer']: 'a`${Opt}`'
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
            ['question']: 'q`${Opt}`',
            ['answer']: 'a`${Opt}`'
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
            ['question']: 'q`${Opt}`',
            ['answer']: 'a`${Opt}`'
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
            ['question']: 'q`${Opt}`',
            ['answer']: 'a`${Opt}`'
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
    await axios.post('http://localhost:3000/v1/vote'), {
        activity_name: 'first_vote',
        vote_answers: [
            vote_answer1, vote_answer2, vote_answer3
        ]
    }
}

async function vote(candidate1, candidate2, candidate3) {
    await axios.post(`https://voting.nthusa.cf/api/vote`, {
        
    });
}