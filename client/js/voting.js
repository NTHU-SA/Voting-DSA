let voteTo = null;

function voteHandleClick(memberNumber) {
    voteTo = memberNumber;
    // console.log(memberNumber);
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
