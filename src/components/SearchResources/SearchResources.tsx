import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import getApiUrl from '../../Services/getApiUrl';

const SearchForm = () => {
    const { t } = useTranslation();

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(getApiUrl("/categories"));
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setData(data['hydra:member']);
            setFilteredData(data['hydra:member']);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = data.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.title}</Text>
            {/* Afficher d'autres informations sur la ressource si nécessaire */}
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={searchText}
                onChangeText={handleSearch}
                placeholder={t("searchPlaceholder")}
            />
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default SearchForm;
