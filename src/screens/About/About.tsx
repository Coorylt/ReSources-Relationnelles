import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './style';


export default function About() {
    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>A propos</Text>
                <Text style={styles.textMain}>Introduction :</Text>
                <Text style={styles.paragraph}>
                    Bienvenue sur "(RE)Sources Relationnelles" ! Notre portail est dédié à aider les citoyens à améliorer leurs relations personnelles pour favoriser leur bien-être et leur épanouissement. Nous croyons fermement que des relations sociales solides sont essentielles pour une vie épanouissante et équilibrée.
                </Text>
                <Text style={styles.textMain}>Objectif du Portail :</Text>
                <Text style={styles.paragraph}>
                    Notre objectif principal est de fournir aux utilisateurs une gamme variée de ressources et d'outils qui les aideront à créer, renforcer et enrichir leurs relations avec les autres. Que ce soit pour améliorer la communication dans le cadre familial, renforcer les liens avec les amis ou développer des relations professionnelles, "(RE)Sources Relationnelles" est là pour vous soutenir à chaque étape de votre parcours relationnel.
                </Text>
                <Text style={styles.textMain}>Contenu du Portail :</Text>
                <Text style={styles.paragraph}>
                    Sur "(RE)Sources Relationnelles", vous trouverez une multitude de ressources, telles que des articles, des vidéos, des conseils pratiques et des exercices interactifs, pour vous aider à améliorer la qualité de vos relations personnelles. Explorez nos catégories variées, allant de la communication et de la résolution de conflits à la gestion du stress et au développement personnel, pour trouver les outils qui correspondent le mieux à vos besoins.
                </Text>
                <Text style={styles.textMain}>Avantages pour les Utilisateurs :</Text>
                <Text style={styles.paragraph}>
                    En utilisant notre portail, vous pourrez ressentir une augmentation du sentiment de connexion sociale, une réduction de l'isolement et un renforcement des liens familiaux et amicaux, ce qui contribuera à une meilleure qualité de vie. Nous croyons en l'importance des interactions sociales positives et nous nous efforçons de fournir des ressources qui vous aideront à cultiver des relations saines et épanouissantes.
                </Text>
                <Text style={styles.textMain}>Engagement de l'Équipe :</Text>
                <Text style={styles.paragraph}>
                    L'équipe derrière "(RE)Sources Relationnelles" s'engage à fournir un contenu de qualité et des outils utiles pour soutenir les utilisateurs dans leurs interactions sociales, afin de les aider à atteindre leurs objectifs relationnels. Nous sommes passionnés par l'amélioration des relations humaines et nous nous engageons à vous fournir le meilleur soutien possible dans votre parcours vers des relations plus enrichissantes et satisfaisantes.
                </Text>
                <Text style={styles.textMain}>A vous d'Explorer :</Text>
                <Text style={styles.paragraph}>
                    Nous vous invitons à explorer notre portail et à découvrir les nombreuses ressources disponibles qui vous aideront à développer des relations personnelles épanouissantes et enrichissantes. Que vous cherchiez des conseils pratiques, des techniques de communication ou des exercices de développement personnel, vous trouverez ici tout ce dont vous avez besoin pour cultiver des relations plus fortes et plus significatives.
                </Text>
                <Text style={styles.textMain}>Contact et Support :</Text>
                <Text style={styles.paragraph}>
                    Si vous avez besoin d'aide ou si vous avez des questions, n'hésitez pas à nous contacter. Nous sommes là pour vous fournir le soutien nécessaire et répondre à toutes vos préoccupations. Notre équipe dévouée est disponible pour vous aider à tirer le meilleur parti de "(RE)Sources Relationnelles" et à surmonter les défis relationnels que vous pourriez rencontrer.
                </Text>
            </View>
        </ScrollView>
    );
}