function uploadList() {
    var formData = new FormData();
    var imagefile = document.querySelector('#voterList');
    formData.append("file", imagefile.files[0]);
    var res = axios.post('/voter/uploadList', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

function restore() {
    var res = axios.post('/voter/restore');
}