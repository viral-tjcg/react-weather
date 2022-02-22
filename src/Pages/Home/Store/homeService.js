import axios from 'axios';

class homeService {

    getWeatherJSON = () => {
        return new Promise((resolve, reject) => {
            const request = axios.get('/sample.json')
            request.then((response) => {
                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                }
                else {
                    reject({ message: 'Error in retrive data' });
                }
            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };
}

const service = new homeService();
export default service;
