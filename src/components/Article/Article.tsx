import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style'

export default function Article() {
    return (
        <View >
            <View>
                <Image
                    source={require('../../../public/img/article.png')}
                    style={styles.articleImage}
                    resizeMode="contain"
                />
            </View>
            <View>
                <Text style={styles.articleText}>Article de fou</Text>
            </View>
            <View>
                <Text style={styles.mental}>Santé mentale</Text>
                <Text style={styles.culture}>Culture</Text>
            </View>
        </View>
    );
}
