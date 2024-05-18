import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthClient = {

    register(data) {
        return axios.post('/api/auth/local/register', data);
    },

    login(identifier, password) {
        return axios.post('/api/auth/local', {
            identifier: identifier,
            password: password
        }).then(res => {
            localStorage.setItem('JWT', res.data.jwt);
            localStorage.setItem('USER', JSON.stringify(res.data.user));
        });
    },

    isSignedIn: function () {
        const JWT = localStorage.getItem('JWT');
        if (JWT) {
            const decoded = jwtDecode(JWT);
            if (decoded) {
                const current_time = Date.now() / 1000;
                if (decoded.exp > current_time) {
                    return true;
                }
            }
        }
        return false;
    },

    logout() {
        localStorage.removeItem('JWT');
        localStorage.removeItem('USER');
    }
}

export default AuthClient;