import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserClient = {

    register(data) {
        return axios.post('/api/auth/local/register', data)
            .then(res => {
                localStorage.setItem('JWT', res.data.jwt);
                localStorage.setItem('USER', JSON.stringify(res.data.user));
                return res;
            });
    },

    login(identifier, password) {
        return axios.post('/api/auth/local', {
            identifier: identifier,
            password: password
        }).then(res => {
            localStorage.setItem('JWT', res.data.jwt);
            localStorage.setItem('USER', JSON.stringify(res.data.user));
            return res;
        });
    },

    isSignedIn: function () {
        const JWT = localStorage.getItem('JWT');
        if (JWT) {
            const decoded = jwtDecode(JWT);
            if (decoded) {
                const currentTime = Date.now() / 1000;
                if (decoded.exp && decoded.exp > currentTime) {
                    return true;
                }
            }
        }
        return false;
    },

    me() {
        const token = localStorage.getItem('JWT');
        return axios.get('/api/users/me', { headers: { "Authorization": `Bearer ${token}` } })
    },

    updateMe(data) {
        const token = localStorage.getItem('JWT');
        return axios.put('/api/user/me', data, { headers: { "Authorization": `Bearer ${token}` } })
    },

    currentUser() {
        const userString = localStorage.getItem('USER');
        return JSON.parse(userString ? userString : "");
    },

    logout() {
        localStorage.removeItem('JWT');
        localStorage.removeItem('USER');
    }
}

export default UserClient;