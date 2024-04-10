import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './style';
import ProfilCard from '../../components/ProfilCard/ProfilCard';

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
        <View>
            <ProfilCard/>
        </View>
    </ScrollView>
  );
};

export default Profile;
