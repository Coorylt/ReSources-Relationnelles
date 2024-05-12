import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import Category from '../../components/Category/Category';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
        <Category/>
    </ScrollView>
  );
};

export default Home;
