import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { styles } from './style';

interface Ressource {
  id: number;
  name: string;
  image: any;
}

export default function QuoiDeNeuf() {
  const Ressources: Ressource[] = [
    { id: 1, name: "Le bien être au travail", image: require('../../../public/img/cannard.webp/') },
    { id: 2, name: "Le bien être au travail", image: require('../../../public/img/cat.jpg/') },
    { id: 3, name: "Le bien être au travail", image: require('../../../public/img/dog.webp/') },
  ];

  const screenWidth = Dimensions.get('window').width;
  const flatListRef = useRef<FlatList<Ressource> | null>(null);

  const renderItem = ({ item }: { item: Ressource }) => (
    <TouchableOpacity style={styles.RessourceContainer} onPress={() => console.log(item.name)}>
      <Image
        source={item.image}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quoi de neuf ?</Text>
      <FlatList
        ref={flatListRef}
        horizontal
        data={Ressources}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={screenWidth}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
