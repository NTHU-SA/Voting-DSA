const arrNoItemiztion = (arr) => {
    for (i = 0; i < arr.length; i++) arr[i] = arr[i].split('. ')[1];
    return arr;
};
const candidateTempl = [];
async function getCandidates(opt) {
    chooseType.chooseAll = opt;
    try {
        const resCandidate = await axios.post(
            '/options/getOptions', {
            'activity_id': opt,
        }, {
            headers: {
                Authorization:
                    `Bearer ${document.cookie.split('service_token=')[1]} `,
            },
        });
        for (i = 0; i < Object.keys(remarks).length; i++) {
            candidateTempl.push(
                [{
                    'member': 'member' + (i + 1),
                    'cardTitle': (i + 1) + '號候選人',
                    'name': resCandidate.data.data[i].candidate.name,
                    'department': resCandidate.data.data[i].candidate.department,
                    'college': resCandidate.data.data[i].candidate.college,
                    'img': resCandidate.data.data[i].candidate.avatar_url,
                    'personalExperiences': resCandidate.data.data[i].candidate.personal_experiences,
                    'politicalOpinions': resCandidate.data.data[i].candidate.political_opinions,
                }]
            );
        }
        console.log(candidateTempl);
        Promise.resolve('Success').then(() => {
            candidatesAppend();
        }, () => {
            console.log('Fail to call chooseAll function');
        });
    } catch (e) {
        console.log(e.response.data);
    }
}

async function getCandidate(opt) {
    chooseType.chooseAll = opt;
    try {
        const resCandidate = await axios.post(
            '/options/getOptions', {
            'type': 'candidate',
        }, {
            headers: {
                Authorization:
                    `Bearer ${document.cookie.split('service_token=')[1]} `,
            },
        });
        for (i = 0; i < Object.keys(remarks).length; i++) {
            candidateTempl.push(
                [{
                    'member': 'member' + (i + 1),
                    'cardTitle': (i + 1) + '號候選人',
                    'name': resCandidate.data.data[i].candidate.name,
                    'department': resCandidate.data.data[i].candidate.department,
                    'college': resCandidate.data.data[i].candidate.college,
                    'img': resCandidate.data.data[i].candidate.avatar_url,
                    'personalExperiences': resCandidate.data.data[i].candidate.personal_experiences,
                    'politicalOpinions': resCandidate.data.data[i].candidate.political_opinions,
                }]
            );
        }
        Promise.resolve('Success').then(() => {
            candidateAppend();
        }, () => {
            console.log('Fail to call chooseOne function');
        });
    } catch (e) {
        console.log(e.response.data);
    }
}

const candidateAppend = () => {
    for (idx = 0; idx < candidateTempl.length; idx++) {
        imgIwantThis = 'https://i.imgur.com/ue4ktGb.png';
        members = candidateTempl[idx][0].member;
        cardTitles = candidateTempl[idx][0].cardTitle;
        imgs = candidateTempl[idx][0].img;
        names = candidateTempl[idx][0].name;
        departments = candidateTempl[idx][0].department;
        colleges = candidateTempl[idx][0].college;
        politicalOpinions = candidateTempl[idx][0].politicalOpinions;
        personalExperiences = candidateTempl[idx][0].personalExperiences;

        yesS = 'yes' + (idx + 1);
        yesUndoS = 'yesUndo' + (idx + 1);
        noS = 'no' + (idx + 1);
        noUndoS = 'noUndo' + (idx + 1);
        whateverS = 'whatever' + (idx + 1);
        whateverUndoS = 'whateverUndo' + (idx + 1);

        iWantYes = 'iWantYes' + (idx + 1);
        iWantNo = 'iWantNo' + (idx + 1);
        iWantWhatever = 'iWantWhatever' + (idx + 1);
        votebk1 = members + 'bk1';
        votebk2 = members + 'bk2';
        votebk3 = members + 'bk3';

        $.tmpl('<section class=${members}></section>', '').insertBefore('.btn-result');

        const candidatesMarkup =
            '<div class="container">' +
            '<div class="listBullteinBox">' +
            '<div class="card card-text-center">' +
            '<div class="card-header cardTitle">' +
            '${cardTitles}' +
            '</div>' +
            '<div class="card-body">' +
            '<div class="row memberInfo">' +
            '<div class="col-sm-4">' +
            '<div class="candidate-img">' +
            '<img src="${imgs}"/>' +
            '</div>' +
            '<div class="col voteBlock mb-4" id="${votebk1}">' +
            '<div class="col-md-10 voteTransperencissAnimate">' +
            '<img id="${iWantYes}" src="${imgIwantThis}" class="img-responsive" />' +
            '<h5 id="${yesS}" onclick="chooseOneClick(1,${iWantYes},${yesS},${yesUndoS},${votebk1})">我要投給他</h5>' +
            '<h5 class="voteUndo" id="${yesUndoS}" onclick="chooseOneClick(0,${iWantYes},${yesS},${yesUndoS},${votebk1})">取消投給他 </h5>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-sm-4">' +
            '<ul class="list-group candidateItems mb-4">' +
            '<li class="list-group-item active candidateItemsTitle">${names}</li>' +
            '<li class="list-group-item candidateItemsTitle">${departments}</li>' +
            '<li class="list-group-item candidateItemsTitle">${colleges}</li>' +
            '</ul>' +

            '<ul class="list-group candidateItems mb-4">' +
            '<li class="list-group-item active candidateItemsTitle">個人經歷</li>' +
            '{{each(i,exps) personalExperiences}}' +
            '<li class="list-group-item">' +
            '${exps}' +
            '</li>' +
            '{{/each}}' +
            '</ul>' +
            '</div>' +
            '<div class="col-sm-4">' +
            '<ul class="list-group candidateItems">' +
            '<li class="list-group-item active candidateItemsTitle">個人政見</li>' +

            '{{each(i,opis) politicalOpinions}}' +
            '<li class="list-group-item">' +
            '${opis}' +
            '</li>' +
            '{{/each}}' +

            '</ul>' +
            '</div>' +

            '</div>' +
            '</div>' +
            '<div class="card-footer text-muted"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        $.template('candidatesTemplate', candidatesMarkup);

        $.tmpl('candidatesTemplate', candidateTempl[idx]).appendTo('.' + members);
    };
};


const candidatesAppend = () => {
    for (idx = 0; idx < candidateTempl.length; idx++) {
        imgIwantThis = 'https://i.imgur.com/ue4ktGb.png';
        members = candidateTempl[idx][0].member;
        cardTitles = candidateTempl[idx][0].cardTitle;
        imgs = candidateTempl[idx][0].img;
        names = candidateTempl[idx][0].name;
        departments = candidateTempl[idx][0].department;
        colleges = candidateTempl[idx][0].college;
        politicalOpinions = candidateTempl[idx][0].politicalOpinions;
        personalExperiences = candidateTempl[idx][0].personalExperiences;

        yesS = 'yes' + (idx + 1);
        yesUndoS = 'yesUndo' + (idx + 1);
        noS = 'no' + (idx + 1);
        noUndoS = 'noUndo' + (idx + 1);
        whateverS = 'whatever' + (idx + 1);
        whateverUndoS = 'whateverUndo' + (idx + 1);

        iWantYes = 'iWantYes' + (idx + 1);
        iWantNo = 'iWantNo' + (idx + 1);
        iWantWhatever = 'iWantWhatever' + (idx + 1);
        votebk1 = members + 'bk1';
        votebk2 = members + 'bk2';
        votebk3 = members + 'bk3';

        $.tmpl('<section class=${members}></section>', '').insertBefore('.btn-result');

        const candidatesMarkup =
            '<div class="container">' +
            '<div class="listBullteinBox">' +
            '<div class="card card-text-center">' +
            '<div class="card-header cardTitle">' +
            '${cardTitles}' +
            '</div>' +
            '<div class="card-body">' +
            '<div class="row memberInfo">' +
            '<div class="col-sm-4">' +
            '<div class="candidate-img">' +
            '<img src="${imgs}"/>' +
            '</div>' +
            '<div class="col voteBlock mb-4" id="${votebk1}">' +
            '<div class="col-md-10 voteTransperencissAnimate">' +
            '<img id="${iWantYes}" src="${imgIwantThis}" class="img-responsive" />' +
            '<h5 id="${yesS}" onclick="chooseAllClick(1,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">我要投給他</h5>' +
            '<h5 class="voteUndo" id="${yesUndoS}" onclick="chooseAllClick(1-3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">取消投給他 </h5>' +
            '</div>' +
            '</div>' +

            '<div class="col voteBlock mb-4" id="${votebk2}">' +
            '<div class="col-md-10 voteTransperencissAnimate">' +
            '<img id="${iWantNo}" src="${imgIwantThis}" class="img-responsive" />' +
            '<h5 id="${noS}" onclick="chooseAllClick(2,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">我不投給他</h5>' +
            '<h5 class="voteUndo" id="${noUndoS}" onclick="chooseAllClick(2-3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">取消不投給他 </h5>' +
            '</div>' +
            '</div>' +

            '<div class="col voteBlock mb-4" id="${votebk3}">' +
            '<div class="col-md-10 voteTransperencissAnimate">' +
            '<img id="${iWantWhatever}" src="${imgIwantThis}" class="img-responsive" />' +
            '<h5 id="${whateverS}" onclick="chooseAllClick(3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">我沒有意見</h5>' +
            '<h5 class="voteUndo" id="${whateverUndoS}" onclick="chooseAllClick(3-3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">取消我沒意見 </h5>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-sm-4">' +
            '<ul class="list-group candidateItems mb-4">' +
            '<li class="list-group-item active candidateItemsTitle">${names}</li>' +
            '<li class="list-group-item candidateItemsTitle">${departments}</li>' +
            '<li class="list-group-item candidateItemsTitle">${colleges}</li>' +
            '</ul>' +

            '<ul class="list-group candidateItems mb-4">' +
            '<li class="list-group-item active candidateItemsTitle">個人經歷</li>' +
            '{{each(i,exps) personalExperiences}}' +
            '<li class="list-group-item">' +
            '${exps}' +
            '</li>' +
            '{{/each}}' +
            '</ul>' +
            '</div>' +
            '<div class="col-sm-4">' +
            '<ul class="list-group candidateItems">' +
            '<li class="list-group-item active candidateItemsTitle">個人政見</li>' +

            '{{each(i,opis) politicalOpinions}}' +
            '<li class="list-group-item">' +
            '${opis}' +
            '</li>' +
            '{{/each}}' +

            '</ul>' +
            '</div>' +

            '</div>' +
            '</div>' +
            '<div class="card-footer text-muted"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        $.template('candidatesTemplate', candidatesMarkup);

        $.tmpl('candidatesTemplate', candidateTempl[idx]).appendTo('.' + members);
    };
};

async function getAvailableActivities() {
    try {
        const resActivities = await axios.post(
            '/activities/getAvailableActivities', {
        }, {
            headers: {
                Authorization:
                    `Bearer ${document.cookie.split('service_token=')[1]} `,
            },
        });
        Promise.resolve('Success').then(() => {
            let node = document.getElementById('activityList');
            resActivities.data.available.forEach(activity => {
                node.innerHTML += `<button type="button" class="btn btn-link btn-chooseType btn-chooseOne" value="chooseOne" data-dismiss="modal"
            onclick="getCandidates('${activity._id}');">${activity.name}</button>`;
            });
            resActivities.data.unavailable.forEach(activity => {
                node.innerHTML += `<span class="d-inline-block" data-toggle="popover" data-content="尚未開始或已經結束"><button type="button" class="btn btn-link disabled">${activity.name}</button></span>`;
            });
            $('.d-inline-block').popover(options)
        }, () => {
            console.log('Fail to call getAvailableActivities function');
        });
    } catch (e) {
        console.log(e.response.data);
    }
}


function test(id) {
    let a = document.getElementById('test');
    html = `
<section class="member1">
<div class="container">
   <div class="listBullteinBox">
      <div class="card card-text-center">
         <div class="card-header cardTitle">${id}號候選人</div>
         <div class="card-body">
            <div class="row memberInfo">
               <div class="col-sm-4">
                  <div class="candidate-img"><img src="http://test.com/test.png"></div>
                  <div class="col voteBlock mb-4" id="member-${id}-bk1" style="display: block;">
                     <div class="col-md-10 voteTransperencissAnimate">
                        <img id="iWantYes-${id}" src="https://i.imgur.com/ue4ktGb.png" class="img-responsive">
                        <h5 id="yes-${id}" onclick="chooseAllClick(1,iWantYes1,yes1,yesUndo1,iWantNo1,no1,noUndo1,iWantWhatever1,whatever1,whateverUndo1,member1bk1,member1bk2,member1bk3)">我要投給他</h5>
                        <h5 class="voteUndo" id="yesUndo-${id}" onclick="chooseAllClick(1-3,iWantYes1,yes1,yesUndo1,iWantNo1,no1,noUndo1,iWantWhatever1,whatever1,whateverUndo1,member1bk1,member1bk2,member1bk3)">取消投給他 </h5>
                     </div>
                  </div>
                  <div class="col voteBlock mb-4" id="member-${id}-bk2" style="display: block;">
                     <div class="col-md-10 voteTransperencissAnimate">
                        <img id="iWantNo1" src="https://i.imgur.com/ue4ktGb.png" class="img-responsive">
                        <h5 id="no1" onclick="chooseAllClick(2,iWantYes1,yes1,yesUndo1,iWantNo1,no1,noUndo1,iWantWhatever1,whatever1,whateverUndo1,member1bk1,member1bk2,member1bk3)">我不投給他</h5>
                        <h5 class="voteUndo" id="noUndo-${id}" onclick="chooseAllClick(2-3,iWantYes1,yes1,yesUndo1,iWantNo1,no1,noUndo1,iWantWhatever1,whatever1,whateverUndo1,member1bk1,member1bk2,member1bk3)">取消不投給他 </h5>
                     </div>
                  </div>
                  <div class="col voteBlock mb-4" id="member-${id}-bk3">
                     <div class="col-md-10 voteTransperencissAnimate">
                        <img id="iWantWhatever-${id}" src="https://i.imgur.com/ue4ktGb.png" class="img-responsive" style="max-width: 0%; opacity: 0;">
                        <h5 id="whatever-${id}" onclick="chooseAllClick(3,iWantYes1,yes1,yesUndo1,iWantNo1,no1,noUndo1,iWantWhatever1,whatever1,whateverUndo1,member1bk1,member1bk2,member1bk3)" style="display: block;">我沒有意見</h5>
                        <h5 class="voteUndo" id="whateverUndo-${id}" onclick="chooseAllClick(3-3,iWantYes1,yes1,yesUndo1,iWantNo1,no1,noUndo1,iWantWhatever1,whatever1,whateverUndo1,member1bk1,member1bk2,member1bk3)" style="display: none;">取消我沒意見 </h5>
                     </div>
                  </div>
               </div>
               <div class="col-sm-4">
                  <ul class="list-group candidateItems mb-4">
                     <li class="list-group-item active candidateItemsTitle">劉彥均</li>
                     <li class="list-group-item candidateItemsTitle">中國文學學系</li>
                     <li class="list-group-item candidateItemsTitle">人文社會學院</li>
                  </ul>
                  <ul class="list-group candidateItems mb-4">
                     <li class="list-group-item active candidateItemsTitle">個人經歷</li>
                     <li class="list-group-item">1. ...</li>
                     <li class="list-group-item">2. ...</li>
                  </ul>
               </div>
               <div class="col-sm-4">
                  <ul class="list-group candidateItems">
                     <li class="list-group-item active candidateItemsTitle">個人政見</li>
                     <li class="list-group-item">1. ...</li>
                     <li class="list-group-item">2. ...</li>
                  </ul>
               </div>
            </div>
         </div>
         <div class="card-footer text-muted"></div>
      </div>
   </div>
</div>
</section>
    `;
    a.innerHTML = html;
}
