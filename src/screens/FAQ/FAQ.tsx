import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import Question from '../../components/Question/Question';
import { useTranslation } from 'react-i18next';


const Home = () => {

  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
      {t('frequently_asked_questions')}      
      </Text>
      <Question />
    </ScrollView>
  );
};

export default Home;
