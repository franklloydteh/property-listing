import axios from "axios";
import { jwtDecode } from "jwt-decode";

function getHeaders() {
    const token = localStorage.getItem('JWT');
    return { headers: { "Authorization": `Bearer ${token}` } };
}

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
        return axios.get('/api/users/me', getHeaders())
    },

    updateMe(data) {
        return axios.put('/api/user/me', data, getHeaders())
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