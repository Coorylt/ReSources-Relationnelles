import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

interface Category {
  id: number;
  name: string;
  image: any; 
  color: string;
}

export default function CategoryHome() {

  const {t} = useTranslation();


  const categorys: Category[] = [
    { id: 1, name: "Culture", image: require('../../../public/img/cannard.webp/'), color: '#03989E' },
    { id: 2, name: "Santé physique", image: require('../../../public/img/cat.jpg/'),color: '#F7A932' },
    { id: 3, name: "Santé mentale", image: require('../../../public/img/dog.webp/'),color: '#4CAF50'  },
    { id: 4, name: "Category 4", image: require('../../../public/img/italy.jpeg/'),color: '#4CAF50' },
    { id: 5, name: "Category 5", image: require('../../../public/img/pexels-photo.jpeg/'),color: '#F7A932' },
    { id: 6, name: "Category 6", image: require('../../../public/img/pexels.jpeg/'), color: '#03989E' },
    { id: 7, name: "Category 7", image: require('../../../public/img/cannard.webp/'),color: '#4CAF50'  },
    { id: 8, name: "Category 8", image: require('../../../public/img/cannard.webp/'),color: '#F7A932'},
    { id: 9, name: "Category 9", image: require('../../../public/img/italy.jpeg/'),color: '#F7A932' },
    { id: 10, name: "Category 10", image: require('../../../public/img/italy.jpeg/'), color: '#03989E' },
    { id: 11, name: "Category 11", image: require('../../../public/img/italy.jpeg/') , color: '#F7A932'},
    { id: 12, name: "Category 12", image: require('../../../public/img/italy.jpeg/'), color: '#4CAF50' },
    { id: 13, name: "Category 13", image: require('../../../public/img/italy.jpeg/'), color: 'red' },
  ];

  const screenWidth = Dimensions.get('window').width;
  const flatListRef = useRef<FlatList<Category> | null>(null);

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={[styles.categoryContainer, { backgroundColor: item.color }]} onPress={() => console.log(item.name)}>
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
      <Text style={styles.title}>{t('categories.home')}</Text>
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