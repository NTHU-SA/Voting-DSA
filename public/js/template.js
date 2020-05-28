const candidateTempl = [];
const vicePresidentsTempl = [];
let VPperCandidate = 0; let countCandidate = 0;
let candidates;
let vicePresidents;
// for choose_all
async function getCandidates(opt, name) {
    chooseType.chooseAll = 1;
    try {
        const resCandidate = await axios.post(
            '/options/getOptions', {
                'filter': { 'activity_id': opt },
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
        candidates = resCandidate.data.data;
        // construct remark
        for (let i = 0; i < candidates.length; i++) remarks[`remarkmember${i + 1}`] = undefined;
        // add h1
        document.getElementById('h1').innerHTML = name;
        voteName = name;
        // construct candidates
        for (let i = 0; i < Object.keys(remarks).length; i++) {
            candidateTempl.push(
                [{
                    'member': 'member' + (i + 1),
                    'cardTitle': (i + 1) + '號候選人',
                    'name': candidates[i].candidate.name,
                    'department': candidates[i].candidate.department,
                    'college': candidates[i].candidate.college,
                    'img': candidates[i].candidate.avatar_url,
                    'personalExperiences': candidates[i].candidate.personal_experiences,
                    'politicalOpinions': candidates[i].candidate.political_opinions,
                }]
            );
            // 是正副會長投票
            if (candidates[0].vice1 !== undefined) {
                for (const [k, v] of Object.entries(candidates[i])) {
                    if (k.split('')[0] === 'v') {
                        vicePresidentsTempl.push([v]);
                        VPperCandidate += 1;
                    };
                }
            }
        }
        VPperCandidate /= candidates.length;
        Promise.resolve('Success').then(() => {
            candidatesAppend(voteName);
        }, () => {
            console.log('Fail to call chooseAll function');
        });
    } catch (e) {
        $('#modalTokan-title').innerHTML = "失敗";
        $('.modalToken').html(`<p>出錯了&#128563 ${e}</p>`);
        $('#modalToken').modal('show');
    }
}

// for choose_one
async function getCandidate(opt) {
    chooseType.chooseAll = 0;
    try {
        const resCandidate = await axios.post(
            '/options/getOptions', {
                'type': 'candidate',
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
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
        $.tmpl(`<p>出錯了&#128563 ${e}</p>`, '').appendTo('.modalInfo');
        $('.modalInfo').show();
    }
}

// for choose_one
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
        const candidatesMarkup = `
<div class="container">
<div class="listBullteinBox">
   <div class="card card-text-center">
      <div class="card-header cardTitle">${cardTitles}</div>
      <div class="card-body">
         <div class="row memberInfo">
            <div class="col-sm-4">
               <div class="candidate-img"><img src="${imgs}"/></div>
               <div class="col voteBlock mb-4" id="${votebk1}">
                  <div class="col-md-10 voteTransperencissAnimate">
                     <img id="${iWantYes}" src="${imgIwantThis}" class="img-responsive" />
                     <h5 id="${yesS}" onclick="chooseOneClick(1,${iWantYes},${yesS},${yesUndoS},${votebk1})">我要投給他</h5>
                     <h5 class="voteUndo" id="${yesUndoS}" onclick="chooseOneClick(0,${iWantYes},${yesS},${yesUndoS},${votebk1})">取消投給他 </h5>
                  </div>
               </div>
            </div>
            <div class="col-sm-4">
               <ul class="list-group candidateItems mb-4">
                  <li class="list-group-item active candidateItemsTitle ">${names}</li>
                  <li class="list-group-item candidateItemsTitle">${departments}</li>
                  <li class="list-group-item candidateItemsTitle">${colleges}</li>
               </ul>
               <ul class="list-group candidateItems mb-4">
                  <li class="list-group-item active candidateItemsTitle">個人經歷</li>
                  {{each(i,exps) personalExperiences}}
                  <li class="list-group-item">\${exps}</li>
                  {{/each}}
               </ul>
            </div>
            <div class="col-sm-4">
               <ul class="list-group candidateItems">
                  <li class="list-group-item active candidateItemsTitle">個人政見</li>
                  {{each(i,opis) politicalOpinions}}
                  <li class="list-group-item">\${opis}</li>
                  {{/each}}
               </ul>
            </div>
         </div>
      </div>
      <div class="card-footer text-muted"></div>
   </div>
</div>
</div>
</div>
`;

        $.template('candidatesTemplate', candidatesMarkup);

        $.tmpl('candidatesTemplate', candidateTempl[idx]).appendTo('.' + members);
    };
};

const candidatesAppend = (actName) => {
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

        $.tmpl(`<section class=${members}></section>`, '').insertBefore('.btn-result');
        const candidatesMarkup = `
<div class="container">
<div class="listBullteinBox">
   <div class="card card-text-center">
      <div class="card-header cardTitle">${cardTitles}</div>
      <div class="card-body">
         <div class="row memberInfo memberInfo${idx}">
            <div class="col-sm-8">
            <div class="row VPContent${idx} ">
               <div class="col-8 col-sm-6">
                  <div class="candidate-img"><img src="${imgs}"/></div>
                  
               </div>
               <div class="col-4 col-sm-6">
                  <ul class="list-group candidateItems mb-4">
                     <li class="list-group-item active candidateItemsTitle ${members}Name">${names}</li>
                     <li class="list-group-item candidateItemsTitle">${departments}</li>
                     <li class="list-group-item candidateItemsTitle">${colleges}</li>
                  </ul>
                  <ul class="list-group candidateItems mb-4">
                     <li class="list-group-item active candidateItemsTitle">個人經歷</li>
                     {{each(i,exps) personalExperiences}}
                     <li class="list-group-item">\${exps}</li>
                     {{/each}}
                  </ul>
               </div>
            </div>
            </div>
            <div class="col-sm-4">
               <ul class="list-group candidateItems">
                  <li class="list-group-item active candidateItemsTitle">個人政見</li>
                  {{each(i,opis) politicalOpinions}}
                  <li class="list-group-item">\${opis}</li>
                  {{/each}}
               </ul>
            </div>
        </div>
      </div>
      <div class="card-footer text-muted"></div>
   </div>
</div>
</div>
</div>
`;
        let voteMarkup = `<div class="col voteBlock mb-4" id="${votebk1}">
        <div class="col-md-10 voteTransperencissAnimate">
           <img id="${iWantYes}" src="${imgIwantThis}" class="img-responsive" />
           <h5 id="${yesS}" onclick="chooseAllClick(1,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3},'${names}')">我要投給他</h5>
           <h5 class="voteUndo" id="${yesUndoS}" onclick="chooseAllClick(1-3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">取消投給他 </h5>
        </div>
     </div>
     <div class="col voteBlock mb-4" id="${votebk2}">
        <div class="col-md-10 voteTransperencissAnimate">
           <img id="${iWantNo}" src="${imgIwantThis}" class="img-responsive" />
           <h5 id="${noS}" onclick="chooseAllClick(2,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3},'${names}')">我不投給他</h5>
           <h5 class="voteUndo" id="${noUndoS}" onclick="chooseAllClick(2-3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">取消不投給他 </h5>
        </div>
      </div>
      <div class="col voteBlock mb-4" id="${votebk3}">
         <div class="col-md-10 voteTransperencissAnimate">
            <img id="${iWantWhatever}" src="${imgIwantThis}" class="img-responsive" />
            <h5 id="${whateverS}" onclick="chooseAllClick(3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3},'${names}')">我沒有意見</h5>
            <h5 class="voteUndo" id="${whateverUndoS}" onclick="chooseAllClick(3-3,${iWantYes},${yesS},${yesUndoS},${iWantNo},${noS},${noUndoS},${iWantWhatever},${whateverS},${whateverUndoS},${votebk1},${votebk2},${votebk3})">取消我沒意見 </h5>
         </div>
      </div>
        `;
        $.template(`candidatesTemplate`, candidatesMarkup);
        $.template(`voteTemplate`, voteMarkup);
        $.tmpl(`candidatesTemplate`, candidateTempl[idx]).appendTo('.' + members);
        // 是正副會長投票
        if (candidates[0].vice1 !== undefined) {
            for (let j = 0; j < VPperCandidate; j++) {
                vps = `${members}vp${VPperCandidate - j}`;
                $.tmpl(`<div class=${vps}></div>`, '').insertAfter(`.VPContent${idx}`);
            };
            for (let j = 0; j < VPperCandidate; j++) {
                vps = `${members}vp${j + 1}`;
                VPTmpl = vicePresidentsTempl[j+countCandidate][0];

                const VPMarkup = `
<div class="row VPInfo">
    <div class="col-sm-6">
    <div class="candidate-img"><img src="${VPTmpl.avatar_url}"/></div>
    </div>
    <div class="col-sm-6">
        <ul class="list-group candidateItems mb-4">
            <li class="list-group-item candidateItemsTitle list-group-item-info ${vps}Name">${VPTmpl.name}</li>
            <li class="list-group-item candidateItemsTitle">${VPTmpl.department}</li>
            <li class="list-group-item candidateItemsTitle">${VPTmpl.college}</li>
        </ul>
        <ul class="list-group candidateItems mb-4">
            <li class="list-group-item candidateItemsTitle list-group-item-info">個人經歷</li>
            {{each(i,exps) VPTmpl.personal_experiences}}
            <li class="list-group-item">\${exps}</li>
            {{/each}}
        </ul>
    </div>
</div> `;
                $.template(`${vicePresidentsTempl}`, VPMarkup);
                $.tmpl(`${vicePresidentsTempl}`, '').appendTo(`.${vps}`);
                if (j===(VPperCandidate-1)) countCandidate += VPperCandidate;
            }
        }
        $.tmpl(`voteTemplate`, candidateTempl[idx]).appendTo(`.memberInfo${idx}`);
    };
};

async function getAvailableActivities() {
    try {
        const resActivities = await axios.post(
            '/activities/getAvailableActivities', {}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
        Promise.resolve('Success').then(() => {
            const node = document.getElementById('activityList');
            resActivities.data.available.forEach((activity) => {
                node.innerHTML += `<button type="button" class="btn btn-link btn-chooseType btn-chooseOne" value="chooseOne" data-dismiss="modal"
            onclick="getCandidates('${activity._id}', '${activity.name}');">${activity.name}</button>`;
            });
            resActivities.data.unavailable.forEach((activity) => {
                node.innerHTML += `<span class="d-inline-block" data-toggle="popover" data-content="尚未開始或已經結束"><button type="button" class="btn btn-link disabled">${activity.name}</button></span>`;
            });
            $('.d-inline-block').popover(options);
        }, () => {
            console.log('Fail to call getAvailableActivities function');
        });
    } catch (e) {
        console.log(e.response.data);
        $('#modalTokan-title').innerHTML = "失敗";
        $('.modalToken').html(`<p>出錯了&#128563 ${e}</p>`);
        $('#modalToken').modal('show');
    }
}
