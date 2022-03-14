const options = [];
const viceExp = {};
async function addAct() {
    const NAME = document.getElementById("name").value;
    const RULE = document.getElementById("rule").value;
    const OPEN_FROM = document.getElementById("open_from").value.replaceAll('/', '-').replace('T', ' ')+":00";
    const OPEN_TO = document.getElementById("open_to").value.replaceAll('/', '-').replace('T', ' ')+":00";
    console.log("OPEN FROM: " + OPEN_FROM);
    console.log("OPEN_TO: " + OPEN_TO);
    console.log(jwtToken);
    try {
        await axios.post(
            '/activities/addActivity', {
                'name': NAME,
                'type': 'candidate',
                'rule': RULE,
                'open_from': OPEN_FROM,
                'open_to': OPEN_TO,
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }).then(res => {
                console.log(res.data);
                const { name, _id } = res.data;
                addOption(name);
            }).catch(err => {
                console.log(err);
            });
    } catch (e) {
        console.log(e.response.data);
    }
}

async function addOption(name) {
    candidates = [];
    vices = [];
    for (i = 1; i <= options.length; i++) {
        let candidateName = document.getElementById(`option-${i}-name`).value;
        let candidateDepartment = document.getElementById(`option-${i}-department`).value;
        let candidateCollege = document.getElementById(`option-${i}-college`).value;
        let candidateAvatarUrl = document.getElementById(`option-${order}-avatar_url`).value;
        let candidatePersonalExperiences = [];
        for(j = 1; j <= options[i-1].personal_experiences; j++) {
            let ex = document.getElementById(`option-${i}-exp-${j}`).value;
            candidatePersonalExperiences.push(ex);
        }
        let candidatePoliticalOptions = [];
        for(k = 1; k <= options[i-1].political_options; k++) {
            let op = document.getElementById(`option-${i}-political-${k}`).value;
            candidatePoliticalOptions.push(`${k}. `+ op);
        }
        if(options[i-1].vice_options) {
            vice = [];
            for(l = 1; l <= 2; l++) {
                let viceName = document.getElementById(`option-vice-${i}-${l}-name`).value;
                let viceDepartment = document.getElementById(`option-vice-${i}-${l}-department`).value;
                let viceCollege = document.getElementById(`option-vice-${i}-${l}-college`).value;
                let viceAvatarUrl = document.getElementById(`option-vice-${i}-${l}-avatar_url`).value;
                let vicePersonalExperiences = [];
                if(l == 1) {
                    for(m = 1; m <= viceExp[i].vice1; m++) {
                        let vex = document.getElementById(`option-vice-${i}-${l}-exp-${m}`).value;
                        vicePersonalExperiences.push(vex);
                    }
                } else {
                    for(m = 1; m <= viceExp[i].vice2; m++) {
                        let vex = document.getElementById(`option-vice-${i}-${l}-exp-${m}`).value;
                        vicePersonalExperiences.push(vex);
                    }
                }
                vice.push({
                    "name": viceName,
                    "department": viceDepartment,
                    "college": viceCollege,
                    "avatar_url": viceAvatarUrl,
                    "personal_experiences": vicePersonalExperiences,
                });
            };
            vices[`${i}`] = vice;
        }
        candidates.push({
            "name": candidateName,
            "department": candidateDepartment,
            "college": candidateCollege,
            "avatar_url": candidateAvatarUrl,
            "personal_experiences": candidatePersonalExperiences,
            "political_opinions": candidatePoliticalOptions,
        })
    }
    console.log(candidates);
    console.log(vices);
    try {
        const resActivity = await axios.post(
            '/activities/getActivities', {
                'filter': { name: name },
            }, {
                headers: {
                    Authentication:
                    `Bearer ${document.cookie.split('service_token=')[1]} `,
                },
            });
        activityID = resActivity.data.data[0]._id;
        for (i = 1; i <= options.length; i++) {
            console.log(vices[i]);
            console.log(options[i-1].vice_options);
            if(options[i-1].vice_options > 0) {
                axios.post('/options/addOption', {
                    'activity_id': activityID,
                    'type': 'candidate',
                    'candidate': candidates[i-1],
                    'vice1': vices[i][0],
                    'vice2': vices[i][1],
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
                    'candidate': candidates[i-1],
                }, {
                    headers: {
                        Authentication:
                            `Bearer ${document.cookie.split('service_token=')[1]} `,
                    },
                });
            }
        }
        console.log("Add option success");
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

function addPersonalExpField(order) {
    optionsNode = document.getElementById(`option-${order}-exp`);
    options[order - 1].personal_experiences += 1;
    let newOrder = options[order - 1].personal_experiences;
    html = document.createElement('div');
    html.className = `exp-${order}-${newOrder}`; // class for delete
    html.innerHTML = `
        <label for='option-${order}-exp-${newOrder}'>經歷${newOrder}：</label>
        <input id='option-${order}-exp-${newOrder}' class="form-control" required="required"/>
    `;
    optionsNode.appendChild(html);
}

function addPoliticalField(order) {
    optionsNode = document.getElementById(`option-${order}-political`);
    options[order - 1].political_options += 1;
    let newOrder = options[order - 1].political_options;
    html = document.createElement('div');
    html.className = `political-${order}-${newOrder}`; // class for delete
    html.innerHTML = `
        <label for='option-${order}-political-${newOrder}'>政見${newOrder}：</label>
        <input id='option-${order}-political-${newOrder}' class="form-control" required="required"/>
    `;
    optionsNode.appendChild(html);
}

function addVicePersonalExpField(order, newOrder) {
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
    html.className = `exp-vice-${order}-${newOrder}-${idx}`; // class for delete
    html.innerHTML = `
        <label for='option-vice-${order}-${newOrder}-exp-${idx}'>經歷${idx}：</label>
        <input id='option-vice-${order}-${newOrder}-exp-${idx}' class="form-control" required="required"/>
    `;
    optionsNode.appendChild(html);
}

function addViceField(order) {
    optionsNode = document.getElementById(`option-${order}-vice`);
    options[order - 1].vice_options += 1;
    let newOrder = options[order - 1].vice_options;
    viceExp[order] = {
        vice1: 0,
        vice2: 0
    }
    html = document.createElement('div');
    html.className = `vice-${order}-${newOrder}`;
    html.innerHTML = `
        <br>
        <h4>${order}號副候選人之一：</h4>
        <label for='option-vice-${order}-1-name'>姓名：</label>
        <input id='option-vice-${order}-1-name' class="form-control" required="required"/>
        <label for='option-vice-${order}-1-department'>科系：</label>
        <input id='option-vice-${order}-1-department' class="form-control" required="required"/>
        <label for='option-vice-${order}-1-college'>院所：</label>
        <input id='option-vice-${order}-1-college' class="form-control" required="required"/>
        <label for='option-vice-${order}-1-avatar_url'>頭像：</label>
        <input id='option-vice-${order}-1-avatar_url' class="form-control" required="required"/>
        <div id='option-vice-${order}-1-exp'></div>
        <br>
        <div class="center">
        <button type="button" class="btn btn-primary btn-sm" onclick="addVicePersonalExpField(${order}, 1)">新增副候選人經歷</button>
        </div>
        <br>
        <h4>${order}號副候選人之二：</h4>
        <label for='option-vice-${order}-2-name'>姓名：</label>
        <input id='option-vice-${order}-2-name' class="form-control" required="required"/>
        <label for='option-vice-${order}-2-department'>科系：</label>
        <input id='option-vice-${order}-2-department' class="form-control" required="required"/>
        <label for='option-vice-${order}-2-college'>院所：</label>
        <input id='option-vice-${order}-2-college' class="form-control" required="required"/>
        <label for='option-vice-${order}-2-avatar_url'>頭像：</label>
        <input id='option-vice-${order}-2-avatar_url' class="form-control" required="required"/>
        <div id='option-vice-${order}-2-exp'></div>
        <br>
        <div class="center">
        <button type="button" class="btn btn-primary btn-sm" onclick="addVicePersonalExpField(${order}, 2)">新增副候選人經歷</button>
        </div>
        <br>
    `;
    optionsNode.appendChild(html);
    let hideNode = document.getElementById(`option-${order}-vice-btn`);
    hideNode.style.display = 'none';
}

function addOptionField() {
    optionsNode = document.getElementById('options');
    order = options.length + 1;
    html = document.createElement('div');
    html.className = `candidateField-${order}`;
    html.innerHTML = `
        <br>
        <h4>${order}號候選人：</h4>
        <label for='option-${order}-name'>姓名：</label>
        <input id='option-${order}-name' class="form-control" required="required"/>
        <label for='option-${order}-department'>科系：</label>
        <input id='option-${order}-department' class="form-control" required="required"/>
        <label for='option-${order}-college'>院所：</label>
        <input id='option-${order}-college' class="form-control" required="required"/>
        <label for='option-${order}-avatar_url'>頭像：</label>
        <input id='option-${order}-avatar_url' class="form-control" required="required"/>
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
