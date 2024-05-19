import axios from "axios";

function getHeaders() {
    const token = localStorage.getItem('JWT');
    return { headers: { "Authorization": `Bearer ${token}` } };
}

const PropertyClient = {

    create(data) {
        return axios.post('/api/properties', { data: data }, getHeaders());
    },

}

export default PropertyClient;