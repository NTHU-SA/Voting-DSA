function getCookie(cname) {
    const cookies = document.cookie.split(';');
    let bearer;
    cookies.forEach((cookie) => {
        [k, v] = cookie.split('=');
        if (k.trim() === cname) bearer = v.trim();
    });
    return bearer;
}

const jwtToken = getCookie('service_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
axios.defaults.headers.post['Authorization'] = `Bearer ${jwtToken}`;
axios.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response;
        console.log(status);
        if (status === 401) {
            alert('驗證失敗，請重新登入');
            logout();
        }
        return Promise.reject(error);
    }
);

async function logout() {
    window.location = "/auth/logout";
}
