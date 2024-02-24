
export function getToken() {
    return localStorage.getItem('token');
}

export function insertToken(token) {
    localStorage.setItem('token', token);
}

export function clearToken() {
    localStorage.removeItem('token');
}
