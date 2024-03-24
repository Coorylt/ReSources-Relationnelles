import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import Question from '../../components/Question/Question';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Foire aux questions
      </Text>
      <Question/>
    </ScrollView>
  );
};

export default Home;
