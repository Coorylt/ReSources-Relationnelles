// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import apiServiceInstance from '../../Services/apiService';

// const  Login = ({ navigation }) => {
//     const [email, setEmail] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [dateOfBirth, setDateOfBirth] = useState('');
//     const [pseudo, setPseudo] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [error, setError] = useState('');
//     const { t } = useTranslation();

//     const formatDate = (dateString) => {
//         const [day, month, year] = dateString.split('/');
//         return `${year}-${month}-${day}`;
//     };

//     const handleSubmit = async () => {
//       if (password !== confirmPassword) {
//           setError("Les mots de passe ne correspondent pas.");
//           return;
//       }
  
//       try {
//           const formattedDateOfBirth = formatDate(dateOfBirth);
//           const userData = {
//               email: email,
//               firstName: firstName,
//               lastName: lastName,
//               password: password,
//               dateOfBirth: formattedDateOfBirth,
//               pseudo: pseudo
//           };
  
//           console.log("User data to be sent:", userData);
  
//           const response = await apiServiceInstance.register(userData);
//           console.log("Inscription réussie :", response);
//           navigation.navigate('Login'); // Navigate to the login screen
//       } catch (error) {
//           console.error("Erreur lors de l'inscription :", error.response || error.message);
//           if (error.response && error.response.status === 400) {
//               setError("Erreur de validation des données. Veuillez vérifier les informations fournies.");
//           } else {
//               setError("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
//           }
//       }
//   };
  
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{t('signin')} </Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="ex : jean.dupont@mail.fr"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="ex : Jean"
//                 value={firstName}
//                 onChangeText={setFirstName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="ex : Dupont"
//                 value={lastName}
//                 onChangeText={setLastName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="ex : MonPseudo"
//                 value={pseudo}
//                 onChangeText={setPseudo}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="ex : 01/01/2000"
//                 value={dateOfBirth}
//                 onChangeText={setDateOfBirth}
//             />
//             <View style={styles.passwordContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder={t('password')}
//                     secureTextEntry={!showPassword}
//                     value={password}
//                     onChangeText={setPassword}
//                 />
//                 <TouchableOpacity onPress={togglePasswordVisibility}>
//                     <Text>{showPassword ? t('Hide') : t('Show')}</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.passwordContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder={t('confirm_password')}
//                     secureTextEntry={!showConfirmPassword}
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                 />
//                 <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
//                     <Text>{showConfirmPassword ? t('Hide') : t('Show')}</Text>
//                 </TouchableOpacity>
//             </View>
//             {error ? <Text style={styles.error}>{error}</Text> : null}
//             <Button title={t('create_account')} onPress={handleSubmit} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginVertical: 10,
//     },
//     passwordContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     error: {
//         color: 'red',
//         marginBottom: 10,
//     },
// });

// export default Login;
