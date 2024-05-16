import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './style';

interface FAQItem {
  question: string;
  answer: string;
}

const Question = () => {
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: number]: boolean }>({});

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const faqData: FAQItem[] = [
    { question: "Comment puis-je me connecter à mon compte ?", answer: "Vous pouvez vous connecter à votre compte en cliquant sur le bouton 'Connexion' situé en haut à droite de la page. Vous devrez ensuite saisir votre adresse e-mail et votre mot de passe pour vous connecter." },
    { question: "Comment puis-je réinitialiser mon mot de passe ?", answer: "Si vous avez oublié votre mot de passe, vous pouvez le réinitialiser en cliquant sur le lien 'Mot de passe oublié ?' situé sous le formulaire de connexion. Vous recevrez alors un e-mail contenant un lien vous permettant de réinitialiser votre mot de passe." },
    { question: "Comment puis-je m'inscrire sur le site ?", answer: "Vous pouvez vous inscrire sur le site en cliquant sur le bouton 'Inscription' situé en haut à droite de la page. Vous devrez ensuite saisir votre adresse e-mail, votre prénom, votre nom et votre mot de passe pour créer un compte." },
    { question: "Comment puis-je contacter le service client ?", answer: "Vous pouvez contacter le service client en envoyant un e-mail à l'adresse suivante : service.client@example.com." },
    { question: "Quelle est la politique de confidentialité du site ?", answer: "Vous pouvez consulter notre politique de confidentialité en cliquant sur le lien 'Politique de confidentialité' situé en bas de la page." },
    { question: "Puis-je modifier mon adresse e-mail dans mon profil ?", answer: "Oui, vous pouvez modifier votre adresse e-mail dans votre profil en accédant à la section 'Paramètres' de votre compte." },
    { question: "Comment puis-je supprimer mon compte ?", answer: "Pour supprimer votre compte, veuillez contacter notre service clientèle via l'adresse e-mail service.client@example.com et fournir les informations nécessaires pour vérification." },
    { question: "Y a-t-il des frais d'inscription sur le site ?", answer: "Non, l'inscription sur notre site est entièrement gratuite." },
    { question: "Comment puis-je changer mon mot de passe ?", answer: "Vous pouvez changer votre mot de passe en accédant à la section 'Paramètres' de votre compte et en sélectionnant l'option 'Changer le mot de passe'." },
    { question: "Combien de temps faut-il pour recevoir une réponse du service client ?", answer: "Nous nous efforçons de répondre à toutes les demandes dans les 24 heures ouvrables." },
    { question: "Est-il possible de changer mon nom d'utilisateur ?", answer: "Non, une fois que votre nom d'utilisateur est créé, il ne peut pas être modifié." },
    { question: "Comment puis-je supprimer mon compte ?", answer: "Pour supprimer votre compte, veuillez contacter notre service clientèle via l'adresse e-mail service.client@example.com et fournir les informations nécessaires pour vérification." },
    { question: "Quelles sont les méthodes de paiement acceptées sur le site ?", answer: "Nous acceptons les paiements par carte de crédit, carte de débit et PayPal." },
    { question: "Comment puis-je modifier mes préférences de notification ?", answer: "Vous pouvez modifier vos préférences de notification en accédant à la section 'Paramètres' de votre compte et en sélectionnant l'option 'Préférences de notification'." },
    { question: "Puis-je utiliser mon compte sur plusieurs appareils ?", answer: "Oui, vous pouvez utiliser votre compte sur plusieurs appareils en vous connectant avec les mêmes identifiants." },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {faqData.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => toggleQuestion(index)}>
          <View style={styles.questionContainer}>
            <View style={styles.separator} />
            <View style={styles.header}>
              <Text style={styles.question}>{item.question}</Text>
              <MaterialIcons
                name={expandedQuestions[index] ? 'expand-less' : 'expand-more'}
                size={24}
                color="#005A5E"
                style={styles.icon}
              />
            </View>
            {expandedQuestions[index] && (
              <>
                <Text style={styles.answer}>{item.answer}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Question;
