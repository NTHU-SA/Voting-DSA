function getCookie(cname) {
    const cookies = document.cookie.split(';');
    let bearer;
    cookies.forEach((cookie)=>{
        [k, v] = cookie.split('=');
        if (k.trim() === cname) bearer = v.trim();
    });
    return bearer;
}

const jwtToken = getCookie('service_token');


async function logout() {
    try {
        await axios.post('/auth/logout');

    } catch (e) {
        document.getElementById('modalTokan-title').innerHTML='失敗';
        $('.modalToken').html(`<p>出錯了&#128563 ${e}</p>`);
        $('#modalToken').modal('show');
        console.log(e);
    }
}
