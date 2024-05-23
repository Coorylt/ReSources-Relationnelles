import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import apiServiceInstance from '../../Services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilCard from '../ProfilCard/ProfilCard';

const saveUserData = async (userData) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

const Connexion = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Veuillez saisir votre email et mot de passe.');
      return;
    }

    try {
      const data = await apiServiceInstance.login(email, password);
      setIsLoggedIn(true);
      setError('');

      await saveUserData({ token: data.token, refresh_token: data.refresh_token });

      const storedRefreshToken = await AsyncStorage.getItem('refresh_token');
    } catch (error) {
      setError('Email ou mot de passe incorrect.');
      console.error("Erreur lors de la connexion", error);
    }
  };

  const handleLogout = async () => {
    await apiServiceInstance.logout();
    await AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View>
          <ProfilCard />
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.textButton}>{t('disconect')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{t('connexion')}</Text>
          <View>
            <Text style={styles.example}>{t('email')}</Text>
            <TextInput
              style={styles.input}
              placeholder="ex : jean.dupont@mail.fr"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text style={styles.example}>{t('password')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('password')}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textButton}>{t('Login')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Connexion;
