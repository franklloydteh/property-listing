import axios from "axios";
import qs from "qs";

function getHeaders() {
    const token = localStorage.getItem('JWT');
    return { headers: { "Authorization": `Bearer ${token}` } };
}

const PropertyClient = {

    create(data) {
        return axios.post('/api/properties', { data: data }, getHeaders());
    },

    update(id, data) {
        return axios.put('/api/properties/' + id, { data: data }, getHeaders());
    },

    findMine() {
        return axios.get('/api/properties/mine', getHeaders())
            .then(res => res.data);
    },

    findOne(id) {
        return axios.get('/api/properties/' + id, getHeaders())
            .then(res => res.data);
    },

    find(query: any) {
        const queryString = qs.stringify(query, { encodeValuesOnly: true })
        return axios.get('/api/properties?' + queryString)
            .then(res => res.data);
    }
}

export default PropertyClient;