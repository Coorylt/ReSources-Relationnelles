import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles } from './style'

const categoryImages = {
  Communication: require('../../../public/img/Communication.jpg'),
  Cultures: require('../../../public/img/Cultures.jpg'),
  PersonnalDev: require('../../../public/img/PersonnalDev.jpg'),
  EmotionalIntelligence: require('../../../public/img/EmotionalIntelligence.jpg'),
  Hobbies: require('../../../public/img/Hobbies.jpg'),
  ProfessionalWorld: require('../../../public/img/ProfessionalWorld.jpg'),
  Parenthood: require('../../../public/img/Parenthood.jpg'),
  LifeQuality: require('../../../public/img/LifeQuality.jpg'),
  SearchingForMeaning: require('../../../public/img/SearchingForMeaning.jpg'),
  PhysicHealth: require('../../../public/img/PhysicHealth.jpg'),
  MentalHealth: require('../../../public/img/MentalHealth.jpg'),
  Spirituality: require('../../../public/img/Spirituality.jpg'),
  AffectiveLife: require('../../../public/img/AffectiveLife.jpg'),
};

export default function RessourcePresentation(props: any) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  function handleSubmit() {
    navigation.navigate('ResourceDetail', { id: props.ressource.id });
  }

  const resource = props.ressource;
  const title = resource.title || "Untitled";
  const category = resource.category.title ? resource.category.title : "Unknown";
  const likesLength = resource.likes ? resource.likes.length : 0;
  const publishDate = resource.createdAt ? new Date(resource.createdAt) : new Date();
  const viewsCount = resource.viewsCount ? resource.viewsCount : 0;

  return (
    <TouchableOpacity style={styles.container} onPress={handleSubmit}>
      <View style={styles.imageContainer}>
        <ImageBackground source={categoryImages[category]} style={styles.image} imageStyle={styles.imageStyle}>
          <View style={styles.overlay} />
        </ImageBackground>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.categoryContainer}>
          <Text style={[styles.category, { backgroundColor: getColorByCategory(category) }]}>
            {t(`categories.${category}`)}
          </Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.stat}><Icon name="eye" size={14} /> {viewsCount}</Text>
          <Text style={styles.stat}><Icon name="bookmark" size={14} /> {likesLength}</Text>
          <Text style={styles.stat}><Icon name="calendar" size={14} /> {publishDate.toLocaleDateString("fr-FR")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function getColorByCategory(category: string) {
  const colors = {
    Communication: '#FF5733',
    Cultures: '#C70039',
    PersonnalDev: '#900C3F',
    EmotionalIntelligence: '#581845',
    Hobbies: '#FF5733',
    ProfessionalWorld: '#FFC300',
    Parenthood: '#DAF7A6',
    LifeQuality: '#FFC300',
    SearchingForMeaning: '#FF5733',
    PhysicHealth: '#C70039',
    MentalHealth: '#900C3F',
    Spirituality: '#581845',
    AffectiveLife: '#DAF7A6',
  };
  return colors[category] || '#ccc';
}

