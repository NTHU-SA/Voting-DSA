function getCookie(cname) {
    let cookies = document.cookie.split(";");
    let bearer;
    cookies.forEach(cookie=>{
        [k, v] = cookie.split('=');
        if (k.trim() === cname) bearer = v.trim();
    });
    return bearer;
}

const jwtToken = getCookie('service_token');
