import React, { useRef, } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, } from 'react-native';
import { styles } from './style';

interface Category {
  id: number;
  name: string;
  image: any;
  color: string;
}

export default function CategoryPage() {
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

  const groupedCategories: Category[][] = [];
  for (let i = 0; i < categorys.length; i += 2) {
    groupedCategories.push(categorys.slice(i, i + 2));
  }

  const flatListRef = useRef<FlatList<Category[]> | null>(null);

  const renderRow = ({ item }: { item: Category[] }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
      {item.map(category => (
        <TouchableOpacity key={category.id} style={[styles.categoryContainer, { backgroundColor: category.color }]} onPress={() => console.log(category.name)}>
          <Image
            source={category.image}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catégories</Text>
      <FlatList
        ref={flatListRef}
        data={groupedCategories}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
