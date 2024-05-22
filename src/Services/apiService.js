import axios from 'axios';
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
        try {
            const response = await axios.post(getApiUrl('/login_check'), {
                email,
                password,
            });

            // Vérifier si la réponse a été réussie avant d'accéder à la propriété data
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('La requête de connexion a échoué');
            }
        } catch (error) {
            throw new Error('Une erreur est survenue lors de la connexion: ' + error.message);
        }
    }
}

const apiServiceInstance = new ApiService();
Object.freeze(apiServiceInstance);
export default apiServiceInstance;
