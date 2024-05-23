import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList,  } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import getApiUrl from '../../Services/getApiUrl';
import { styles } from './style';

type Category = {
    id: number;
    title: string;
};

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

// Colors for each category
const categoryColors = {
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

export default function CategorysHome() {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesResponse = await axios.get(getApiUrl('/categories?page=1'), {
                    headers: {
                        'Content-Type': 'application/ld+json',
                    },
                });
                setCategories(categoriesResponse.data['hydra:member']);
            } catch (err: any) {
                setCategoriesError(err.message || 'Erreur lors de la récupération des ressources');
            }
        };

        fetchCategories();
    }, []);

    if (!categories) return <LoadingScreen />;
    if (categoriesError) return <View><Text>{categoriesError}</Text></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("categories.home")}</Text>
            <FlatList
                data={categories}
                horizontal
                renderItem={({ item }) => (
                    <View key={item.id} style={[styles.categoryContainer, { backgroundColor: categoryColors[item.title] || '#ccc' }]}>
                        <Image source={categoryImages[item.title]} style={styles.image} />
                        <Text style={styles.text}>{t("category." + item.title)}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

