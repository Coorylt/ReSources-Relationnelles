import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';

export default function ProfilCard() {
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
                    <Text style={styles.stats}>2 ressources - 85 likes </Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.button}>Modifier mon profil</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Mes ressources </Text>
                    <Text>Mes Likes</Text>
                </View>
            </View>
        </View>
    );
}
