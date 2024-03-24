import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import Login from '../../components/Login/Login';


const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Login/>
    </ScrollView>
  );
};

export default Home;
