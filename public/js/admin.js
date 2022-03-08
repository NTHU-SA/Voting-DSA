var adminList = [];

async function setAdmin(toAdmin) {
    const remark = toAdmin ? "admin" : "";
    const stuId = document.getElementById("stuId").value;

    try {
        await axios.post('/users/modifyUser', {
            "student_id": stuId,
            "remark": remark,
            "byStuId": true //指定以 student_id 為 key update，ref: pullrequest #4
        }).then((resp) => {
            if(resp.data["success"]);
                alert(`成功新增 ${stuId} 為管理員`);
        });
    } catch (error) {
        alert("ERROR" + error);
    }
}

async function getAdmin() {
    try {
        await axios.post('/users/getUsers', { filter: { "remark": "admin" } }).then((resp) => {
            adminList = resp.data["data"];
            return resp.data["data"];
        });
    } catch (error) {
        alert(error);
    }
}

function renderTable(adminList) {


}
