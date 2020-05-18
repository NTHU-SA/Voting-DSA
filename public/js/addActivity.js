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
            'limit': 0,
            'skip': 0,
            'sort': 0,
        });
        activityID = resActivity.data.data[0]._id;
        await axios.post('/options/addOption', {
            'activity_id': activityID,
            'type': 'candidate',
            'candidate': candidate1,
        });
        await axios.post('/options/addOption', {
            'activity_id': activityID,
            'type': 'candidate',
            'candidate': candidate2,
        });
        await axios.post('/options/addOption', {
            'activity_id': activityID,
            'type': 'candidate',
            'candidate': candidate3,
        });
    } catch (e) {
        console.log(e.response.data);
    }
}
