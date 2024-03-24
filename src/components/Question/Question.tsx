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
    { question: "Question 1 ?", answer: "Réponse à la question 1." },
    { question: "Question 2 ?", answer: "Réponse à la question 2." },
    { question: "Question 3 ?", answer: "Réponse à la question 3." },
    { question: "Question 4 ?", answer: "Réponse à la question 4." },
    { question: "Question 5 ?", answer: "Réponse à la question 5." },
    { question: "Question 6 ?", answer: "Réponse à la question 6." },
    { question: "Question 7 ?", answer: "Réponse à la question 7." },
    { question: "Question 8 ?", answer: "Réponse à la question 8." },
    { question: "Question 9 ?", answer: "Réponse à la question 9." },
    { question: "Question 10 ?", answer: "Réponse à la question 10." },
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
