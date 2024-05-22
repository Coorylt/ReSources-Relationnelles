import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import getApiUrl from '../../Services/getApiUrl';
import { styles } from './style';

type Category = {
    id: number;
    title: string;
    image:string;
};

export default function CategorysPage() {
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
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.heading}>Catégories</Text>
                <View style={styles.categoryContainer}>
                    {categories ? (
                        categories.map((category) => (
                            <View key={category.id} style={[styles.categoryBox, { backgroundColor: `color${category.title}` }]}>
                                <Image source={{ uri: `./public/img${category.title}.jpg` }} style={styles.categoryImage} />
                                <Text style={styles.categoryTitle}>{t("category." + category.title)}</Text>
                            </View>
                        ))
                    ) : (
                        <LoadingScreen />
                    )}
                </View>


            </View>
        </ScrollView>
    );
}

