import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { styles } from './style';

interface Category {
  id: number;
  name: string;
  image: any; 
}

export default function CategoryHome() {
  const categorys: Category[] = [
    { id: 1, name: "Culture", image: "cannard.webp" },
    { id: 2, name: "Santé physique", image: "cat.jpg" },
    { id: 3, name: "Santé mental", image: "dog.webp" },
    { id: 4, name: "Category 4", image: "italy.jpeg" },
    { id: 5, name: "Category 5", image: "pexels-photo.jpeg" },
    { id: 6, name: "Category 6", image: "pexels.jpeg" },
    { id: 7, name: "Category 7", image: "dog.webp" },
    { id: 8, name: "Category 8", image: "pexels-photo.jpeg" },
    { id: 9, name: "Category 9", image: "cat.jpg" },
    { id: 10, name: "Category 10", image: "italy.jpeg" },
    { id: 11, name: "Category 11", image: "pexels-photo.jpeg" },
    { id: 12, name: "Category 12", image: "cat.jpg" },
    { id: 13, name: "Category 13", image: "dog.webp" }
  ];

  const screenWidth = Dimensions.get('window').width;
  const flatListRef = useRef<FlatList<Category> | null>(null);

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryContainer} onPress={() => console.log(item.name)}>
      <Image
        source={item.image}
        style={styles.image}
      />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catégories</Text>
      <FlatList
        ref={flatListRef}
        horizontal
        data={categorys}
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
