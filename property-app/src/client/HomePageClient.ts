import axios from "axios";

const HomePageClient = {

    get() {
        return axios.get('/api/home-page?populate[components][populate]=*')
            .then(response => {
                return response.data;
            });
    }
}

export default HomePageClient;