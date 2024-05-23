import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { styles } from './style';

const Question = () => {
  const { t } = useTranslation();
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: number]: boolean }>({});

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const faqData: { questionKey: string; answerKey: string }[] = [
    { questionKey: "faq_questions.question_1", answerKey: "faq_answers.answer_1" },
    { questionKey: "faq_questions.question_2", answerKey: "faq_answers.answer_2" },
    { questionKey: "faq_questions.question_3", answerKey: "faq_answers.answer_3" },
    { questionKey: "faq_questions.question_4", answerKey: "faq_answers.answer_4" },
    { questionKey: "faq_questions.question_5", answerKey: "faq_answers.answer_5" },
    { questionKey: "faq_questions.question_6", answerKey: "faq_answers.answer_6" },
    { questionKey: "faq_questions.question_7", answerKey: "faq_answers.answer_7" },
    { questionKey: "faq_questions.question_8", answerKey: "faq_answers.answer_8" },
    { questionKey: "faq_questions.question_9", answerKey: "faq_answers.answer_9" },
    { questionKey: "faq_questions.question_10", answerKey: "faq_answers.answer_10" },
    { questionKey: "faq_questions.question_11", answerKey: "faq_answers.answer_11" },
    { questionKey: "faq_questions.question_12", answerKey: "faq_answers.answer_12" },
    { questionKey: "faq_questions.question_13", answerKey: "faq_answers.answer_13" },
    { questionKey: "faq_questions.question_14", answerKey: "faq_answers.answer_14" },
    { questionKey: "faq_questions.question_15", answerKey: "faq_answers.answer_15" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {faqData.map(({ questionKey, answerKey }, index) => (
        <TouchableOpacity key={index} onPress={() => toggleQuestion(index)}>
          <View style={styles.questionContainer}>
            <View style={styles.separator} />
            <View style={styles.header}>
              <Text style={styles.question}>{t(questionKey)}</Text>
              <MaterialIcons
                name={expandedQuestions[index] ? 'expand-less' : 'expand-more'}
                size={24}
                color="#005A5E"
                style={styles.icon}
              />
            </View>
            {expandedQuestions[index] && (
              <>
                <Text style={styles.answer}>{t(answerKey)}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Question;
