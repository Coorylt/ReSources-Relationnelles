import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import getApiUrl from '../../Services/getApiUrl';
import { useTranslation } from 'react-i18next';
import SearchResources from '../../components/SearchResources/SearchResources';
import RessourcePresentation from '../../components/RessourcePresentation/RessourcePresentation';

type Resource = {
  id: number;
  title: string;
  ressourceType: {
    name: string;
  };
  category: {
    title: string;
  };
  image: string;
  views: string;
  likes: string;
  date: string;
  relationshipType: [
    {
      title: string;
    }
  ];
};

export default function Resources() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const searchParams = useMemo(() => new URLSearchParams(route.params?.search || ""), [route.params?.search]);

  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(searchParams.get('category'));
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>(searchParams.get('keyword') || "");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const url = getApiUrl(`/public/ressources?page=${currentPage}`);
        console.log(`Fetching resources from URL: ${url}`);
        const response = await axios.get(url);
        
        console.log('Full response:', response);
        const newResources = response.data;

        if (newResources.length < 5) {
          setHasMore(false);
        }
        setAllResources(prevResources => currentPage === 1 ? newResources : [...prevResources, ...newResources]);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des ressources", error);
        Alert.alert("Erreur", "Erreur lors de la récupération des ressources");
        setLoading(false);
      }
    };

    fetchResources();
  }, [currentPage]);

  useEffect(() => {
    const categoryId = searchParams.get('category');
    const resourceType = searchParams.get('type');
    const relationType = searchParams.get('relation');
    const keyword = searchParams.get('keyword') || "";

    console.log('Filtering resources with:', { categoryId, resourceType, relationType, keyword });

    const filtered = allResources.filter(resource => {
      let matchesCategory = true;
      let matchesType = true;
      let matchesRelation = true;
      let matchesKeyword = true;

      if (categoryId) {
        matchesCategory = resource.category.title === categoryId;
      }
      if (resourceType) {
        matchesType = resource.ressourceType.name === resourceType;
      }
      if (relationType) {
        matchesRelation = resource.relationshipType[0].title === relationType;
      }
      if (keyword) {
        matchesKeyword = resource.title.toLowerCase().includes(keyword.toLowerCase());
      }

      return matchesCategory && matchesType && matchesRelation && matchesKeyword;
    });

    setFilteredResources(filtered);
  }, [allResources, searchParams]);

  const handleResourceClick = (id: number) => {
    navigation.navigate('ResourceDetail', { id });
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
    const newParams = { ...route.params, category: categoryId };
    navigation.setParams(newParams);
  };

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword);
    const newParams = { ...route.params, keyword };
    navigation.setParams(newParams);
  };

  return (
    <View style={styles.ressourcesMainDiv}>
      <View style={styles.ressourcesMainContainer}>
        {/* <SearchResources selectedCategoryId={selectedCategoryId} onCategoryChange={handleCategoryChange} onKeywordChange={handleKeywordChange} /> */}
        <ScrollView 
          contentContainerStyle={styles.ressourcesDisplay}
          onScroll={({ nativeEvent }) => {
            if (hasMore && !loading && nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height) {
              setCurrentPage(prevPage => prevPage + 1);
            }
          }}
          scrollEventThrottle={400}
        >
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <RessourcePresentation
                key={resource.id}
                ressource={resource}
                onClick={() => handleResourceClick(resource.id)}
              />
            ))
          ) : (
            <Text>{t("noResourcesFound")}</Text>
          )}
          {loading && hasMore && <ActivityIndicator size="large" color="#0000ff" />}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ressourcesMainDiv: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ressourcesMainContainer: {
    flex: 1,
    padding: 10,
  },
  ressourcesDisplay: {
    flexGrow: 1,
  },
});
