import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RessourcePresentationProps {
    ressource: {
      title?: string;
      category?: {
        title?: string;
      };
      likes?: any[]; 
      createdAt?: string;
      viewsCount?: number; 
      id:number;
    };
  }
  

  export default function RessourcePresentation({ ressource }: RessourcePresentationProps) {
    const { t } = useTranslation();

  function handlePress() {
    console.log("Navigating to resource details page:", ressource.id);
  }

  const title = ressource.title || "Untitled";
  const category = ressource.category?.title || "Unknown";
  const likesLength = ressource.likes?.length || 0;
  const publishDate = ressource.createdAt ? new Date(ressource.createdAt) : new Date();
  const viewsCount = ressource.viewsCount || 0;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: 'chemin/vers/image' }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.categoryContainer}>
          <Text style={[styles.category, styles.colorCategory]}>{t(`categories.${category}`)}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="eye-outline" size={20} color="black" />
            <Text>{viewsCount}</Text>
          </View>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="bookmark-outline" size={20} color="black" />
            <Text>{likesLength}</Text>
          </View>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="calendar" size={20} color="black" />
            <Text>{publishDate.toLocaleDateString("fr-FR")}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    marginRight: 5,
  },
  colorCategory: {
    color: '#03989E',
  },
  statsContainer: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});
