import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import getApiUrl from '../Services/getApiUrl';

const fetchRefreshToken = async (refreshToken: string) => {
    const url = getApiUrl('/token/refresh');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: refreshToken, // Envoie le refresh token dans le corps de la requête
            }),
        });

        if (!response.ok) {
            throw new Error('Erreur lors du rafraîchissement du token');
        }

        const data = await response.json();

        return data.token; // Retourne le nouveau token
    } catch (error) {
        console.error('Erreur lors du rafraîchissement du token:', error);
        throw error;
    }
};

interface MyToken {
    exp: number;
    username: string;
    roles: string[];
    id: string;
}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [role, setRole] = useState<string[]>([]);
    const [username, setUsername] = useState('');
    const storedRefreshToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '').refresh_token : '';

    useEffect(() => {
        const checkTokenValidity = async () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                setToken(parsedUserData.token);

                if (parsedUserData.token.split('.').length === 3) {
                    try {
                        const decoded: MyToken = jwtDecode(parsedUserData.token);
                        setRole(decoded.roles);
                        setUsername(decoded.username);
                        setUserId(decoded.id);
                        setIsAuthenticated(true);

                        const expirationTime = decoded.exp * 1000;
                        const currentTime = new Date().getTime();
                        if (expirationTime < currentTime) {
                            try {
                                const newToken = await fetchRefreshToken(storedRefreshToken); // Utilise le refresh token
                                const decodedNewToken: MyToken = jwtDecode(newToken);
                                setToken(newToken);
                                setRole(decodedNewToken.roles);
                                setUsername(decodedNewToken.username);
                                setUserId(decodedNewToken.id);
                                setIsAuthenticated(true);
                            } catch (error) {
                                console.error('Erreur lors du rafraîchissement du token: ', error);
                            }
                        }
                    } catch (error) {
                        console.error('Token invalide: ', error);
                        setIsAuthenticated(false);
                    }
                } else {
                    console.error('Token invalide: Format incorrect');
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };

        checkTokenValidity();

        // Nettoyage
        return () => {
            // Vous pouvez effectuer des nettoyages ici si nécessaire
        };
    }, []);

    return {
        isAuthenticated,
        isLoading,
        userId,
        token,
        role,
        username,
    };
};

export default useAuth;