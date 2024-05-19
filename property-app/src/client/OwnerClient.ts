import axios from "axios";

function getHeaders() {
    const token = localStorage.getItem('JWT');
    return { headers: { "Authorization": `Bearer ${token}` } };
}

const PropertyClient = {

    findByProperty(propertyId) {
        return axios.get(`/api/properties/${propertyId}/owner`)
            .then(res => res.data);
    },

}

export default PropertyClient;