import history from '../axios/history'

export function logOut() {
    localStorage.removeItem('user');
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=";
    document.cookie = "authHash=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=";
    history.push('/')
}