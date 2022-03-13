const options = [];
async function addAct() {
    const NAME = document.getElementById("name").value;
    const RULE = document.getElementById("rule").value;
    const OPEN_FROM = '2022/03/01 12:00:00';
    const OPEN_TO = '2022/06/30 12:00:00';
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
    console.log(name);
    candidates = [];
    for (i = 1; i <= options.length; i++) {
        let candidateName = document.getElementById(`option-${i}-name`).value;
        let candidateDepartment = document.getElementById(`option-${i}-department`).value;
        let candidateCollege = document.getElementById(`option-${i}-college`).value;
        let candidateAvatar_url = document.getElementById(`option-${order}-avatar_url`).value;
        let candidatePersonalExperiences = "";
        let candidatePoliticalOpinions = "";

        candidates.push({
            "name": candidateName,
            "department": candidateDepartment,
            "college": candidateCollege,
            "avatar_url": candidateAvatar_url,
            "personal_experiences": candidatePersonalExperiences,
            "political_opinions": candidatePoliticalOpinions,
        }
        )
    }
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
        // activityID = mongoObjOfObj2ID(resActivity);
        // for (i = 0; i < Object.keys(remarks).length; i++) {
        for (i = 0; i < options.length; i++) {
            axios.post('/options/addOption', {
                'activity_id': activityID,
                'type': 'candidate',
                'candidate': candidates[i],
            }, {
                headers: {
                    Authentication:
                        `Bearer ${document.cookie.split('service_token=')[1]} `,
                },
            });
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
    newOrder = options[order - 1].personal_experiences;
    html = [];
    html.push(`
        <label for='option-${order}-exp-${newOrder}'>經歷${newOrder}：</label>
        <input id='option-${order}-exp-${newOrder}' class="form-control" />
    `);
    optionsNode.innerHTML += html.join('');
}

function addPoliticalField(order) {
    console.log(order);
    optionsNode = document.getElementById(`option-${order}-political`);
    options[order - 1].political_options += 1;
    newOrder = options[order - 1].political_options;
    html = [];
    html.push(`
        <label for='option-${order}-political-${newOrder}'>政見${newOrder}：</label>
        <input id='option-${order}-political-${newOrder}' class="form-control" />
    `);
    optionsNode.innerHTML += html.join('');
}

function addOptionField() {
    optionsNode = document.getElementById('options');
    // optionsNode = document.querySelector('#options');
    order = options.length + 1;
    html = [];
    html.push(`
        <br>
        <h4>候選人${order}：</h4>
        <label for='option-${order}-name'>姓名：</label>
        <input id='option-${order}-name' class="form-control" />`
    );
    html.push(`
        <label for='option-${order}-department'>科系：</label>
        <input id='option-${order}-department' class="form-control" />`
    );
    html.push(`
        <label for='option-${order}-college'>院所：</label>
        <input id='option-${order}-college' class="form-control" />`
    );
    html.push(`
        <label for='option-${order}-avatar_url'>頭像：</label>
        <input id='option-${order}-avatar_url' class="form-control" />`
    );
    html.push(`
        <div id='option-${order}-exp'></div>
        <div id='option-${order}-political'></div>
        <br>
        <button type="button" class="btn btn-primary" onclick="addPersonalExpField(${order})">新增經歷</button>
        <button type="button" class="btn btn-primary" onclick="addPoliticalField(${order})">新增政見</button>
    `);
    options.push({ personal_experiences: 0, political_options: 0 });
    optionsNode.innerHTML += html.join('');
    // optionsNode.appendChild(html.join(''));
};
