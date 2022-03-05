
function uploadList() {
    if (document.getElementById("voterList").value == "") {
        alert("請選擇檔案");
        return;
    }
    var formData = new FormData();
    var imagefile = document.querySelector('#voterList');
    formData.append("file", imagefile.files[0]);
    axios.post('/voter/uploadList', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => alert(response.data))
        .catch((error) => alert("上傳失敗 status=" + error.response.status));

}

function restore() {
    var res = confirm("是否要還原選舉人名單到上一版本?");

    if (res) {
        axios.post('/voter/restore').then((response) => alert(response.data))
            .catch((error) => alert("還原失敗 status=" + error.response.status))
    }
}
