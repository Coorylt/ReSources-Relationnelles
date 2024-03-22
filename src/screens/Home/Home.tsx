import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import CategoryHome from '../../components/CategoryHome/CategoryHome';

const Home = () => {
  return (
    <View style={styles.container}>
      <CategoryHome />
    </View>
  );
};

export default Home;
