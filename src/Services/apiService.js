import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from './getApiUrl';

class ApiService {
    static instance = null;

    constructor() {
        if (!ApiService.instance) {
            ApiService.instance = this;
        }
        return ApiService.instance;
    }

    async login(email, password) {
        const response = await axios.post(getApiUrl('/login_check'), {
            email,
            password,
        });

        const { token, refresh_token } = response.data;
        
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('refresh_token', refresh_token);

        return response.data;
    }

    async logout() {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refresh_token');
    }

    async fetchData(endpoint) {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(getApiUrl(endpoint), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
}

const apiServiceInstance = new ApiService();
Object.freeze(apiServiceInstance);
export default apiServiceInstance;
