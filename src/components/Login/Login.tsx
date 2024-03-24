import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { styles } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      <Text style={styles.title}>S'inscrire </Text>
      <View style={styles.text}>
        <Text>Mon Email</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="ex : jean.dupont@mail.fr"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.text}>
        <Text>Mon Nom</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder=" ex : Jean"
        value={lastName}
        onChangeText={setLastName}
      />
      <View style={styles.text}>
        <Text>Mon Prénom</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="ex : Dupont"
        value={firstName}
        onChangeText={setFirstName}
      />
      <View style={styles.text}>
        <Text>Mot de passe</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.text}>
        <Text>Confirmer le mot de passe</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateAccount}
      >
        <Text style={styles.textButton}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;


