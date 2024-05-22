import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './style';
import PublishResource from '../../components/PublishRessource/PublishRessource';

const NewResources = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <PublishResource/>
      </View>
    </ScrollView>
  );
};

export default NewResources;
