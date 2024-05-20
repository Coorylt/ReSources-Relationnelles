import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { styles } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t } = useTranslation();


  const handleCreateAccount = () => {
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      Alert.alert('Tous les champs sont requis');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Envoi des données au backend ou gestion de la création de compte
    console.log('Email:', email);
    console.log('Prénom:', firstName);
    console.log('Nom:', lastName);
    console.log('Mot de passe:', password);
  };

  return (
    <View style={[styles.container, styles.formContainer]}>
      <Text style={styles.title}>{t('signin')} </Text>
      <View style={styles.text}>
        <Text>{t('email')}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="ex : jean.dupont@mail.fr"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.text}>
        <Text>{t('my_name')}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder=" ex : Jean"
        value={lastName}
        onChangeText={setLastName}
      />
      <View style={styles.text}>
        <Text>{t('my_firstName')}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="ex : Dupont"
        value={firstName}
        onChangeText={setFirstName}
      />
      <View style={styles.text}>
        <Text>{t('password')}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.text}>
        <Text>{t('confirm_password')}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={t('confirm_password')}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateAccount}
      >
        <Text style={styles.textButton}>{t('create_account')}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;


