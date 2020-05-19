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

//TODO: addImg function is a needed
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
