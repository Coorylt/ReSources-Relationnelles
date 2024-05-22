// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import axios from "axios";
// import LoadingScreen from '../LoadingScreen/LoadingScreen';

// type Category = {
//     id: number;
//     title: string;
// };

// export default function CategorysPage() {
//     const [categories, setCategories] = useState<Category[] | null>(null);
//     const [categoriesError, setCategoriesError] = useState<string | null>(null);
//     const { t } = useTranslation();

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/categories?page=1', {
//                     headers: {
//                         'Content-Type': 'application/ld+json',
//                     },
//                 });
//                 setCategories(categoriesResponse.data['hydra:member']); 
//             } catch (err: any) {
//                 setCategoriesError(err.message || 'Erreur lors de la récupération des ressources');
//             }
//         };

//         fetchCategories();
//     }, []); 

//     // if (!categories) return <LoadingScreen />;
//     if (categoriesError) return <View><Text>{categoriesError}</Text></View>;

//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <Text style={styles.heading}>Catégories</Text>
//                 <View style={styles.categoryContainer}>
//                     {categories.map((category) => (
//                         <View key={category.id} style={[styles.categoryBox, { backgroundColor: `color${category.title}` }]}>
//                             <Image source={{ uri: `/img/${category.title}.jpg` }} style={styles.categoryImage} />
//                             <Text style={styles.categoryTitle}>{t("categories."+category.title)}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     heading: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     categoryContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//     },
//     categoryBox: {
//         width: '45%',
//         aspectRatio: 1, // To maintain aspect ratio
//         borderRadius: 10,
//         marginBottom: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     categoryImage: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 10,
//     },
//     categoryTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//         textAlign: 'center',
//     },
// });
