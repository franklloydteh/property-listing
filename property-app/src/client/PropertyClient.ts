import axios from "axios";
import qs from "qs";

function getHeaders() {
    const token = localStorage.getItem('JWT');
    return { headers: { "Authorization": `Bearer ${token}` } };
}

const PropertyClient = {

    create(data, files) {
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));

        if (files && files.length)
            files.forEach((file) => {
                // 'images' will be the Model Attribute
                formData.append(`files.images`, file, file.name);
            });

        return fetch('/api/properties', {
            method: 'post',
            headers: getHeaders().headers,
            body: formData
        });
    },

    update(id, data, files) {
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));

        if (files && files.length)
            files.forEach((file) => {
                if (file.objectURL) // check if file is for upload and not already uploaded
                    formData.append(`files.images`, file, file.name);
            });

        return fetch('/api/properties/' + id, {
            method: 'put',
            headers: getHeaders().headers,
            body: formData
        });
    },

    findMine() {
        return axios.get('/api/properties/mine', getHeaders())
            .then(res => res.data);
    },

    findOne(id) {
        return axios.get(`/api/properties/${id}?populate=*`, getHeaders())
            .then(res => res.data);
    },

    find(query: any) {
        query.populate = ['images'];
        const queryString = qs.stringify(query, { encodeValuesOnly: true })
        console.log(queryString)
        return axios.get('/api/properties?' + queryString)
            .then(res => res.data);
    },

    delete(propertyId) {
        return axios.delete('/api/properties/' + propertyId, getHeaders())
            .then(res => res.data);
    }
}

export default PropertyClient;