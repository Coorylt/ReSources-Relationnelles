import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import Article from '../Article/Article';

export default function ProfilCard() {
    // Créez un état pour suivre la sélection de l'utilisateur
    const [selectedOption, setSelectedOption] = useState('');

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
                        <Text style={styles.button}>Modifier mon profil</Text>
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
                            Mes ressources
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
                            Mes Likes
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {/* <Article/> */}
                </View>
            </View>
        </View>
    );
}
