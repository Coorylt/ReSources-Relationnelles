// Resources.tsx

import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './style';
import RessourcePresentation from '../../components/RessourcePresentation/RessourcePresentation';

const Resources = () => {
  const resourceData = {
    id: 1,
    title: "Resource Title",
    category: {
      id: 1,
      title: "Category Title"
    },
    likes: [],
    createdAt: "2024-05-25T12:00:00Z",
    viewsCount: 100
    
  };

  return (
    <ScrollView style={styles.container}>
        <View>
            <RessourcePresentation ressource={resourceData} /> 
        </View>
    </ScrollView>
  );
};

export default Resources;
