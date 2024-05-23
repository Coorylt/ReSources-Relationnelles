import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { styles } from './style';

const About = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{t('about.title')}</Text>
        <Text style={styles.textMain}>{t('about.intro')}</Text>
        <Text style={styles.paragraph}>{t('about.introDetails')}</Text>
        <Text style={styles.textMain}>{t('about.objective')}</Text>
        <Text style={styles.paragraph}>{t('about.objectiveDetails')}</Text>
        <Text style={styles.textMain}>{t('about.content')}</Text>
        <Text style={styles.paragraph}>{t('about.contentDetails')}</Text>
        <Text style={styles.textMain}>{t('about.benefits')}</Text>
        <Text style={styles.paragraph}>{t('about.benefitsDetails')}</Text>
        <Text style={styles.textMain}>{t('about.teamEngagement')}</Text>
        <Text style={styles.paragraph}>{t('about.teamEngagementDetails')}</Text>
        <Text style={styles.textMain}>{t('about.explore')}</Text>
        <Text style={styles.paragraph}>{t('about.exploreDetails')}</Text>
        <Text style={styles.textMain}>{t('about.contactSupport')}</Text>
        <Text style={styles.paragraph}>{t('about.contactSupportDetails')}</Text>
      </View>
    </ScrollView>
  );
}

export default About;
