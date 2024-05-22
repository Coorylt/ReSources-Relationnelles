import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import CategoryHome from '../../components/CategoryHome/CategoryHome';
import QuoiDeNeuf from '../../components/QuoiDeNeuf/QuoiDeNeuf';
import Connexion from '../../components/Connexion/Connexion';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <QuoiDeNeuf/>
      <CategoryHome/>
    </ScrollView>
  );
};

export default Home;
