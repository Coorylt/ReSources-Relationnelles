import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Button, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import RessourcePresentation from '../RessourcePresentation/RessourcePresentation';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import getApiUrl from '../../Services/getApiUrl';

type Resource = {
    id: number;
    title: string;
    ressourceType: {
        name: string;
    };
    category: {
        title: string;
    };
    image: string;
    views: string;
    likes: string;
    date: string;
    relationshipType: [
        {
            title: string;
        }
    ];
};

export default function ProfilCard() {
    const { t } = useTranslation();

    const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
    const [selectedOption, setSelectedOption] = useState('resources');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pseudo, setPseudo] = useState('Tony Sylvestre');
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const route = useRoute();
    const searchParams = useMemo(() => new URLSearchParams(route.params?.search || ""), [route.params?.search]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [allResources, setAllResources] = useState<Resource[]>([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const url = getApiUrl(`/public/ressources?page=${currentPage}`);
                console.log(`Fetching resources from URL: ${url}`);
                const response = await axios.get(url);

                console.log('Full response:', response);
                const newResources = response.data;

                if (newResources.length < 5) {
                    setHasMore(false);
                }
                setAllResources(prevResources => currentPage === 1 ? newResources : [...prevResources, ...newResources]);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des ressources", error);
                Alert.alert("Erreur", "Erreur lors de la récupération des ressources");
                setLoading(false);
            }
        };

        fetchResources();
    }, [currentPage]);

    const handleEditProfile = () => {
        setIsModalOpen(true);
    };

    const handleResourceClick = (id: number) => {
        navigation.navigate('ResourceDetail', { id });
    };

    const handleSaveChanges = () => {
        console.log("Sending updated profile data to backend:", pseudo);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const categoryId = searchParams.get('category');
        const resourceType = searchParams.get('type');
        const relationType = searchParams.get('relation');
        const keyword = searchParams.get('keyword') || "";

        console.log('Filtering resources with:', { categoryId, resourceType, relationType, keyword });

        const filtered = allResources.filter(resource => {
            let matchesCategory = true;
            let matchesType = true;
            let matchesRelation = true;
            let matchesKeyword = true;

            if (categoryId) {
                matchesCategory = resource.category.title === categoryId;
            }
            if (resourceType) {
                matchesType = resource.ressourceType.name === resourceType;
            }
            if (relationType) {
                matchesRelation = resource.relationshipType[0].title === relationType;
            }
            if (keyword) {
                matchesKeyword = resource.title.toLowerCase().includes(keyword.toLowerCase());
            }

            return matchesCategory && matchesType && matchesRelation && matchesKeyword;
        });

        setFilteredResources(filtered);
    }, [allResources, searchParams]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.containerCard}>
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../../../public/img/pdp.png')}
                        style={styles.profileImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.pseudo}>{pseudo}</Text>
                    <Text style={styles.stats}>{`${filteredResources.length} ressources - 85 likes`}</Text>
                    <TouchableOpacity onPress={handleEditProfile}>
                        <Text style={styles.button}>{t('edit_profil')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.centeredTextContainer}>
                    <TouchableOpacity onPress={() => setSelectedOption('resources')}>
                        <Text
                            style={[
                                styles.centeredText,
                                selectedOption === 'resources' && styles.underlined,
                            ]}
                        >
                            {t('my_ressources')}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.divider}>|</Text>

                    <TouchableOpacity onPress={() => setSelectedOption('likes')}>
                        <Text
                            style={[
                                styles.centeredText,
                                selectedOption === 'likes' && styles.underlined,
                            ]}
                        >
                            {t('my_likes')}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.resources}>
                    {selectedOption === 'resources' && filteredResources.map(resource => (
                        <RessourcePresentation
                            key={resource.id}
                            ressource={resource}
                            onClick={() => handleResourceClick(resource.id)}
                        />
                    ))}
                    {loading && hasMore && <ActivityIndicator size="large" color="#0000ff" />}
                </View>
            </View>

            {/* Modal */}
            <Modal
                visible={isModalOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalOpen(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Modifier le profil</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nouveau pseudo"
                            value={pseudo}
                            onChangeText={setPseudo}
                        />
                        <Button title="Enregistrer les modifications" onPress={handleSaveChanges} color="#03989E" />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
