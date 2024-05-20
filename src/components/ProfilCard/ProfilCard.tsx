import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import Article from '../Article/Article';
import { useTranslation } from 'react-i18next';
import RessourcePresentation from '../RessourcePresentation/RessourcePresentation'; // Importer le composant RessourcePresentation

export default function ProfilCard() {
    const resourceData = {
        id: 1,
        title: "Resource Title",
        category: {
          id: 1,
          title: "Category Title"
        },
        likes: [],
        createdAt: "2024-05-25T12:00:00Z",
        viewsCount: 100
        
      };
        const [selectedOption, setSelectedOption] = useState('');
    const { t } = useTranslation();

    return (
        <View>
            <View style={styles.containerCard}>
                <View>
                    <Image
                        source={require('../../../public/img/pdp.png')}
                        style={styles.profileImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.pseudo}>John Doe</Text>
                    <Text style={styles.stats}>2 ressources - 85 likes</Text>
                    <TouchableOpacity>
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

                <View>
                    {selectedOption === 'resources' && <RessourcePresentation ressource={resourceData}  />} 
                </View>
            </View>
        </View>
    );
}
