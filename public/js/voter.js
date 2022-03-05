function uploadList() {
    var formData = new FormData();
    var imagefile = document.querySelector('#voterList');
    formData.append("file", imagefile.files[0]);
    axios.post('/voter/uploadList', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then( (response) => alert("上傳成功"))
    .catch( (error) => alert("上傳失敗 status=" + error.response.status));
    
}

function restore() {
    var res = axios.post('/voter/restore');
}