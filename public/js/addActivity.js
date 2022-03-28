const options = [];
const viceExp = {};
// viceExp = {
//      1:{vice1: 0, vice2: 0},
//      2:{vice1: 0, vice2: 0},
//      ...
// }
async function addAct() {
    if(confirm('確定送出嗎?')) {
        const NAME = document.getElementById("name").value;
        const RULE = document.getElementById("rule").value;
        const OPEN_FROM = document.getElementById("open_from").value.replaceAll('/', '-').replace('T', ' ');
        const OPEN_TO = document.getElementById("open_to").value.replaceAll('/', '-').replace('T', ' ');
        // console.log(jwtToken);

        if(NAME == "" || NAME == undefined) {
            alert("請將活動名稱填寫完整");
            return;
        } else if(OPEN_FROM == "" || OPEN_TO == "") {
            alert("請將開始及結束時間填寫完整");
            return;
        } else if(OPEN_FROM >= OPEN_TO) {
            alert("結束時間小於等於開始時間，請填入正確的開始及結束時間");
            return;
        }

        try {
            const resActivity = await axios.post(
                '/activities/getActivities', {
                    'filter': { name: NAME },
                }, {
                    headers: {
                        Authentication:
                        `Bearer ${document.cookie.split('service_token=')[1]} `,
                    },
                });
            // console.log(resActivity);
            if(resActivity.data.total > 0) {
                console.log("Activity Exist");
                addOption(resActivity.data.data[0]._id);
            } else {
                console.log("Activity Not Exist");
                await axios.post(
                    '/activities/addActivity', {
                        'name': NAME,
                        'type': 'candidate',
                        'rule': RULE,
                        'open_from': OPEN_FROM + ":00",
                        'open_to': OPEN_TO + ":00",
                    }, {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }).then(res => {
                        console.log(res.data);
                        const { _id } = res.data;
                        addOption(_id);
                    }).catch(err => {
                        console.log(err);
                    });
            }
        } catch (e) {
            console.log(e.response.data);
        }
    } else {
        return;
    }
}

async function addOption(activityID) {
    const CANDIDATES = [];
    const VICES = [];
    // TODO: pass valid
    const valid = await getFieldValue(CANDIDATES, VICES);
    console.log(CANDIDATES);
    console.log(options);
    console.log(VICES);
    console.log(viceExp);
    console.log(valid);
    try {
        if(options.length == 0) {
            alert("新增活動成功，請填寫候選人表格");
            return;
        } else if(!valid) {
            alert("請將表格填寫完整");
            CANDIDATES.length = 0;
            VICES.length = 0;
            return;
        }
        for (i = 1; i <= options.length; i++) {
            if(options[i-1].vice_options > 0) {
                axios.post('/options/addOption', {
                    'activity_id': activityID,
                    'type': 'candidate',
                    'candidate': CANDIDATES[i-1],
                    'vice1': VICES[i][0],
                    'vice2': VICES[i][1],
                }, {
                    headers: {
                        Authentication:
                            `Bearer ${document.cookie.split('service_token=')[1]} `,
                    },
                });
            } else {
                axios.post('/options/addOption', {
                    'activity_id': activityID,
                    'type': 'candidate',
                    'candidate': CANDIDATES[i-1],
                }, {
                    headers: {
                        Authentication:
                            `Bearer ${document.cookie.split('service_token=')[1]} `,
                    },
                });
            }
        }
        alert("送出成功!將回到上一頁");
        window.location = "/activity.html";
    } catch (e) {
        console.log(e);
    }
}

// TODO: addImg function is a needed
async function addImg(src) {
    try {
        await axios.post(
            '/files/uploadFile', {
                'mode': 'formdata',
                'formdata': [
                    {
                        'key': 'file',
                        'type': 'file',
                        'src': `'../uploads/${src}'`,
                    },
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    } catch (e) {
        console.log(e.response.data);
    }
}

async function getFieldValue(CANDIDATES, VICES) {
    let valid = true;
    for (i = 1; i <= options.length; i++) {
        let candidateName = document.getElementById(`option-${i}-name`).value;
        let candidateDepartment = document.getElementById(`option-${i}-department`).value;
        let candidateCollege = document.getElementById(`option-${i}-college`).value;
        let candidateAvatarUrl = document.getElementById(`option-${i}-avatar_url`).value;
        // check valid : candidate's field
        if(candidateName == "" || candidateDepartment == "" || candidateCollege == "" || candidateAvatarUrl == "") {
            valid = false;
            return;
        }
        let candidatePersonalExperiences = [];
        for(j = 1; j <= options[i-1].personal_experiences; j++) {
            let ex = document.getElementById(`option-exp-${i}-${j}`).value;
            // check valid : candidate's exp
            if(ex == "") {
                valid = false;
                return;
            }
            candidatePersonalExperiences.push(ex);
        }
        let candidatePoliticalOptions = [];
        for(k = 1; k <= options[i-1].political_options; k++) {
            let op = document.getElementById(`option-political-${i}-${k}`).value;
            // check valid : candidate's opt
            if(op == "") {
                valid = false;
                return;
            }
            candidatePoliticalOptions.push(`${k}. `+ op);
        }
        console.log(options[i-1].vice_options);
        if(options[i-1].vice_options > 0) {
            vice = [];
            for(l = 1; l <= 2; l++) {
                let viceName = document.getElementById(`option-vice-${i}-${l}-name`).value;
                let viceDepartment = document.getElementById(`option-vice-${i}-${l}-department`).value;
                let viceCollege = document.getElementById(`option-vice-${i}-${l}-college`).value;
                let viceAvatarUrl = document.getElementById(`option-vice-${i}-${l}-avatar_url`).value;
                // check valid : vice candidate's field
                if(viceName == "" || viceDepartment == "" || viceCollege == "" || viceAvatarUrl == "") {
                    valid = false;
                    return;
                }

                let vicePersonalExperiences = [];
                if(l == 1) {
                    for(m = 1; m <= viceExp[i].vice1; m++) {
                        let vex = document.getElementById(`option-vice-exp-${i}-${l}-${m}`).value;
                        // check valid : vice candidate's exp
                        if(vex == "") {
                            valid = false;
                            return;
                        }
                        vicePersonalExperiences.push(vex);
                    }
                } else {
                    for(m = 1; m <= viceExp[i].vice2; m++) {
                        let vex = document.getElementById(`option-vice-exp-${i}-${l}-${m}`).value;
                        // check valid : vice candidate's opt
                        if(vex == "") {
                            valid = false;
                            return;
                        }
                        vicePersonalExperiences.push(vex);
                    }
                }
                // if not valid
                if(!valid) return;
                // if valid
                vice.push({
                    "name": viceName,
                    "department": viceDepartment,
                    "college": viceCollege,
                    "avatar_url": viceAvatarUrl,
                    "personal_experiences": vicePersonalExperiences,
                });
            };
            // if not valid
            if(!valid) return;
            VICES[`${i}`] = vice;
        }
        // if not valid
        if(!valid) return;
        // if valid
        CANDIDATES.push({
            "name": candidateName,
            "department": candidateDepartment,
            "college": candidateCollege,
            "avatar_url": candidateAvatarUrl,
            "personal_experiences": candidatePersonalExperiences,
            "political_opinions": candidatePoliticalOptions,
        })
    }
    // not valid
    if(!valid) return false;
    // valid
    return true;
}

// <div class="exp-{candidate_index}-{exp_index}">
//      <label for="option-exp-{candidate_index}-{exp_index}"></label>
//      <input id="option-exp-{candidate_index}-{exp_index}"/>
// </div>
function addPersonalExpField(order) {
    // check last personal exp valid
    const  current = options[order - 1].personal_experiences;
    if(current > 0) {
        const valid = document.getElementById(`option-exp-${order}-${current}`).value;
        if(valid == "") {
            alert("請先填完上一個候選人經歷");
            return;
        }
    }
    // add new personal exp field
    optionsNode = document.getElementById(`option-${order}-exp`);
    options[order - 1].personal_experiences += 1;
    let newOrder = options[order - 1].personal_experiences;
    html = document.createElement('div');
    html.setAttribute("id", `exp-${order}-${newOrder}`);
    html.innerHTML = `
        <label for='option-exp-${order}-${newOrder}'>經歷${newOrder}：</label>
        <input id='option-exp-${order}-${newOrder}' class="form-control" required/>
    `;
    optionsNode.appendChild(html);
}

// <div class="political-{candidate_index}-{pol_index}">
//      <label for="option-political-{candidate_index}-{pol_index}"></label>
//      <input id="option-political-{candidate_index}-{pol_index}"/>
// </div>
function addPoliticalField(order) {
    // check last political opinion valid
    const current = options[order - 1].political_options;
    if(current > 0) {
        const valid = document.getElementById(`option-political-${order}-${current}`).value;
        if(valid == "") {
            alert("請先填完上一個候選人政見");
            return;
        }
    }
    // add new political field
    optionsNode = document.getElementById(`option-${order}-political`);
    options[order - 1].political_options += 1;
    let newOrder = options[order - 1].political_options;
    html = document.createElement('div');
    html.setAttribute("id", `political-${order}-${newOrder}`);
    html.innerHTML = `
        <label for='option-political-${order}-${newOrder}'>政見${newOrder}：</label>
        <input id='option-political-${order}-${newOrder}' class="form-control" required/>
    `;
    optionsNode.appendChild(html);
}

// <div class="exp-vice-{candidate_index}-{candidate's_vice_index}-{vice_exp_index}">
//      <label for="option-vice-exp-{candidate_index}-{candidate's_vice_index}-{vice_exp_index}"></label>
//      <input id="option-vice-exp-{candidate_index}-{candidate's_vice_index}-{vice_exp_index}"/>
// </div>
function addVicePersonalExpField(order, newOrder) {
    // check last vice personal exp valid
    let current;
    if(newOrder == 1) {
        current = viceExp[order].vice1;
    } else {
        current = viceExp[order].vice2;
    }
    if(current > 0) {
        const valid = document.getElementById(`option-vice-exp-${order}-${newOrder}-${current}`).value;
        if(valid == "") {
            alert("請先填完上一個副候選人經歷");
            return;
        }
    }
    // add new vice personal exp field
    let idx;
    optionsNode = document.getElementById(`option-vice-${order}-${newOrder}-exp`);
    if(newOrder == 1) {
        viceExp[order].vice1 += 1;
        idx = viceExp[order].vice1;
    } else {
        viceExp[order].vice2 += 1;
        idx = viceExp[order].vice2;
    }
    html = document.createElement('div');
    html.setAttribute("id", `exp-vice-${order}-${newOrder}-${idx}`); // class for delete
    html.innerHTML = `
        <label for='option-vice-exp-${order}-${newOrder}-${idx}'>經歷${idx}：</label>
        <input id='option-vice-exp-${order}-${newOrder}-${idx}' class="form-control" required />
    `;
    optionsNode.appendChild(html);
}

// <div class="vice-{candidate_index}-{vice_index}">
//      ...
//      <label for="option-vice-{candidate_idx}-{1 or 2}-{vice_candidate's_label}"></label>
//      <input id="option-vice-{candidate_idx}-{1 or 2}-{vice_candidate's_label}"/>
//      ...
// </div>
function addViceField(order) {
    optionsNode = document.getElementById(`option-${order}-vice`);
    options[order - 1].vice_options += 2;
    let newOrder = options[order - 1].vice_options;
    viceExp[order] = {
        vice1: 0,
        vice2: 0
    }
    html = document.createElement('div');
    html.setAttribute("id", `vice-${order}-${newOrder}`);
    html.innerHTML = `
        <br>
        <h4>${order}號副候選人之一：</h4>
        <label for='option-vice-${order}-1-name'>姓名：</label>
        <input id='option-vice-${order}-1-name' class="form-control" required />
        <label for='option-vice-${order}-1-department'>科系：</label>
        <input id='option-vice-${order}-1-department' class="form-control" required />
        <label for='option-vice-${order}-1-college'>院所：</label>
        <input id='option-vice-${order}-1-college' class="form-control" required />
        <label for='option-vice-${order}-1-avatar_url'>頭像：</label>
        <input id='option-vice-${order}-1-avatar_url' class="form-control" required />
        <div id='option-vice-${order}-1-exp'></div>
        <br>
        <div class="center">
        <button type="button" class="btn btn-primary btn-sm" onclick="addVicePersonalExpField(${order}, 1)">新增副候選人經歷</button>
        </div>
        <br>
        <h4>${order}號副候選人之二：</h4>
        <label for='option-vice-${order}-2-name'>姓名：</label>
        <input id='option-vice-${order}-2-name' class="form-control" required />
        <label for='option-vice-${order}-2-department'>科系：</label>
        <input id='option-vice-${order}-2-department' class="form-control" required />
        <label for='option-vice-${order}-2-college'>院所：</label>
        <input id='option-vice-${order}-2-college' class="form-control" required />
        <label for='option-vice-${order}-2-avatar_url'>頭像：</label>
        <input id='option-vice-${order}-2-avatar_url' class="form-control" required />
        <div id='option-vice-${order}-2-exp'></div>
        <br>
        <div class="center">
        <button type="button" class="btn btn-primary btn-sm" onclick="addVicePersonalExpField(${order}, 2)">新增副候選人經歷</button>
        </div>
        <button type="button" class="btn btn-info" onclick="closeVicePersonalExpField(${order}, ${newOrder})">刪除副候選人</button>
        <br>
    `;
    optionsNode.appendChild(html);
    let hideNode = document.getElementById(`option-${order}-vice-btn`);
    hideNode.style.display = 'none';
}

function closeVicePersonalExpField(order, newOrder) {
    // remove candidate's vice
    options[order - 1].vice_options -= 2;
    // remove vice's exp
    viceExp[`${order}`].vice1 = 0;
    viceExp[`${order}`].vice2 = 0;

    const deleteNode = document.getElementById(`vice-${order}-${newOrder}`);
    deleteNode.remove();

    const showNode = document.getElementById(`option-${order}-vice-btn`);
    showNode.style.display = 'block';
}

// <div class="candidateField-{candidate_index}">
//      ...
//      <label for="option-{candidate_index}-{candidate's_label}"></label>
//      <input id="option-{candidate_index}-{candidate's_label}"/>
//      ...
// </div>
function addOptionField() {
    // check if last candidate field valid
    if(options.length > 0) {
        let name_valid = document.getElementById(`option-${options.length}-name`).value;
        let department_valid = document.getElementById(`option-${options.length}-department`).value;
        let college_valid = document.getElementById(`option-${options.length}-college`).value;
        let avatar_url_valid = document.getElementById(`option-${options.length}-avatar_url`).value;
        if(name_valid == "" || department_valid == "" || college_valid == "" || avatar_url_valid == "") {
            alert('請先填完上一位候選人');
            return;
        }
    }
    // add new candidate field
    optionsNode = document.getElementById('options');
    order = options.length + 1;
    html = document.createElement('div');
    html.setAttribute("id", `candidateField-${order}`);
    html.innerHTML = `
        <br>
        <h4>${order}號候選人：</h4>
        <label for='option-${order}-name'>姓名：</label>
        <input id='option-${order}-name' class="form-control" required />
        <label for='option-${order}-department'>科系：</label>
        <input id='option-${order}-department' class="form-control" required />
        <label for='option-${order}-college'>院所：</label>
        <input id='option-${order}-college' class="form-control" required />
        <label for='option-${order}-avatar_url'>頭像：</label>
        <input id='option-${order}-avatar_url' class="form-control" required />
        <div id='option-${order}-exp'></div>
        <div id='option-${order}-political'></div>
        <br>
        <div class="center">
        <button type="button" class="btn btn-primary btn-sm" onclick="addPersonalExpField(${order})">新增候選人經歷</button>
        <div class="divider"></div>
        <button type="button" class="btn btn-primary btn-sm" onclick="addPoliticalField(${order})">新增候選人政見</button>
        </div>
        <div id='option-${order}-vice'></div>
        <button type="button" id='option-${order}-vice-btn' class="btn btn-info" onclick="addViceField(${order})">新增副候選人</button>
    `;
    options.push({ personal_experiences: 0, political_options: 0, vice_options: 0 });
    optionsNode.appendChild(html);
};
