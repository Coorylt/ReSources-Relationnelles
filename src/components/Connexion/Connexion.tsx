import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import apiServiceInstance from '../../Services/apiService';

const Connexion = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Veuillez saisir votre email et mot de passe.');
      return;
    }

    try {
      const data = await apiServiceInstance.login(email, password);
      console.log(data);
      
      // Handle successful login, maybe store user data in AsyncStorage
      console.log("Connexion réussie", data);
    } catch (error) {
      setError('Email ou mot de passe incorrect.');
      console.error("Erreur lors de la connexion", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('connexion')}</Text>
      <View style={styles.inputContainer}>
        <Text>{t('email')}</Text>
        <TextInput
          style={styles.input}
          placeholder="ex : jean.dupont@mail.fr"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>{t('password')}</Text>
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
        <Text style={styles.textButton}>{t('Se Connecter')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Connexion;
