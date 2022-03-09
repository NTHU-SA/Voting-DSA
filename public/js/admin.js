var adminList = [];

async function rewriteTable() {
    try {
        await getAdmin();
        $('#adminTable > tbody').empty();
        renderTable();
    } catch (error) {
        alert(error);
    }
}
async function setAdmin(stuId, toAdmin) {
    if (stuId == "") {
        alert("請輸入學號");
        return;
    }
    const remark = toAdmin ? "admin" : "";
    const msg = toAdmin ? `成功新增 ${stuId} 為管理員` : `成功將 ${stuId} 從管理員刪除`;

    try {
        await axios.post('/users/modifyUser', {
            "student_id": stuId,
            "remark": remark,
            "byStuId": true //指定以 student_id 為 key update，ref: pullrequest #4
        }).then((resp) => {
            if (resp.data["success"]) {
                alert(msg);
                document.getElementById("stuId").value = ""; //清空Input
            } else {
                alert(`無法新增 ${stuId}，可能此帳號不存在`);
            }
        });
    } catch (error) {
        alert("ERROR" + error);
    }
}

async function getAdmin() {
    try {
        await axios.post('/users/getUsers', { filter: { "remark": "admin" } }).then((resp) => {
            adminList = resp.data;
            console.log(resp.data);
        });
    } catch (error) {
        alert(error);
    }
}

function renderTable() {
    for (var i in adminList["data"]) {
        console.log(adminList["data"][i]["_id"]);
        $('#adminTable').append(`<tr> \
        <td>${adminList["data"][i]["student_id"]}</td> \
        <td>${adminList["data"][i]["updated_at"]}</td> \
        <td><div style="cursor: pointer;" onclick="removeAdmin('${adminList["data"][i]["student_id"]}')"> \
        <ion-icon name="remove-circle-outline" size="large"> \
        </ion-icon></div></td> \
        </tr >`);
    }

}

function addAdmin() {
    const stuId = document.getElementById("stuId").value;
    setAdmin(stuId, true).then(value => {
        rewriteTable();
    }, reason => {
        console.log(reason); // Error!
    });
}

function removeAdmin(stuId) {
    setAdmin(stuId, false).then(value => {
        rewriteTable();
    }, reason => {
        console.log(reason); // Error!
    });
}