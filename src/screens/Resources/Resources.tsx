import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './style';
import ProfilCard from '../../components/ProfilCard/ProfilCard';
import PublishResource from '../../components/PublishRessource/PublishRessource';

const Resources = () => {
  return (
    <ScrollView style={styles.container}>
        <View>
            <PublishResource/>
        </View>
    </ScrollView>
  );
};

export default Resources;
