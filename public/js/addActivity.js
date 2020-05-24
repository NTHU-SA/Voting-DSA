const options = [];
async function addAct() {
    try {
        await axios.post(
            '/activities/addActivity', {
                'name': '第28屆學生議會議員補選',
                'type': 'candidate',
                'rule': 'choose_all',
            });
    } catch (e) {
        console.log(e.response.data);
    }
}

async function addOption() {
    try {
        const resActivity = await axios.post(
            '/activities/getActivities', {
                'filter': { name: '第28屆學生議會議員補選' },
            }, {
                headers: {
                    Authentication:
                    `Bearer ${document.cookie.split('service_token=')[1]} `,
                },
            });
        activityID = mongoObjOfObj2ID(resActivity);
        for (i = 0; i < Object.keys(remarks).length; i++) {
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
    } catch (e) {
        console.log(e.response.data);
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
                    Authentication:
                    `Bearer ${document.cookie.split('service_token=')[1]} `,
                },
            }
        );
    } catch (e) {
        console.log(e.response.data);
    }
}

function addPersonalExpField(order) {
    console.log(order);
    optionsNode = document.getElementById(`option-${order}-exp`);
    options[order-1].personal_experiences += 1;
    newOrder = options[order-1].personal_experiences;
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
    options[order-1].political_options += 1;
    newOrder = options[order-1].political_options;
    html = [];
    html.push(`
        <label for='option-${order}-political-${newOrder}'>政見${newOrder}：</label>
        <input id='option-${order}-political-${newOrder}' class="form-control" />
    `);
    optionsNode.innerHTML += html.join('');
}

function addOptionField() {
    optionsNode = document.getElementById('options');
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
        <button class="btn btn-primary" onclick="addPersonalExpField(${order})">新增經歷</button>
        <button class="btn btn-primary" onclick="addPoliticalField(${order})">新增政見</button>
    `);
    options.push({personal_experiences: 0, political_options: 0});
    optionsNode.innerHTML += html.join('');
};
