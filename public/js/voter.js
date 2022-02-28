function uploadFile() {
    var formData = new FormData();
    var imagefile = document.querySelector('#voterList');
    formData.append("file", imagefile.files[0]);
    axios.post('/files/uploadFile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}