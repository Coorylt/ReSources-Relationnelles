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

    async register(email, firstName, lastName, password, dateOfBirth, pseudo) {
        const data = {
            "@context": "/api/contexts/User",
            "@type": "User",
            email,
            firstName,
            lastName,
            password,
            dateOfBirth,
            pseudo,
        };

        try {
            const response = await axios.post(
                getApiUrl('/users'),
                data,
                {
                    headers: {
                        "Content-Type": "application/ld+json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('API register error:', error.response);
            throw error;
        }
    }

    async logout() {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refresh_token');
    }

    async fetchData(endpoint) {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        
        const response = await axios.get(getApiUrl(endpoint), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    }

    async postData(endpoint, data) {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.post(getApiUrl(endpoint), data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    }
}

const apiServiceInstance = new ApiService();
Object.freeze(apiServiceInstance);
export default apiServiceInstance;
