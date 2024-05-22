import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Button, ScrollView } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import RessourcePresentation from '../RessourcePresentation/RessourcePresentation';

export default function ProfilCard() {
    const resourceData = {
        id: 1,
        title: "Les chats",
        category: {
          id: 1,
          title: ""
        },
        likes: [],
        createdAt: "2024-05-25T12:00:00Z",
        viewsCount: 100
    };

    const { t } = useTranslation();

    const [selectedOption, setSelectedOption] = useState('resources'); // Initialisation de selectedOption avec 'resources'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pseudo, setPseudo] = useState('Tony Sylvestre');

    const handleEditProfile = () => {
        setIsModalOpen(true);
    };

    const handleSaveChanges = () => {
        console.log("Sending updated profile data to backend:", pseudo);
        setIsModalOpen(false);
    };

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
                    <Text style={styles.stats}>2 ressources - 85 likes</Text>
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
                    {selectedOption === 'resources' && <RessourcePresentation ressource={resourceData} />}
                </View>
            </View>


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
                        <Button title="Enregistrer les modifications" onPress={handleSaveChanges} color="#03989E"/>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
