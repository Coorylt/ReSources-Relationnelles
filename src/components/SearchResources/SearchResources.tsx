import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styles } from './style';

interface Option {
    label: string;
    value: string;
}

interface DropdownPickerProps {
    label: string;
    options: Option[];
    selectedValue: string;
    onValueChange: (value: string) => void;
}

const DropdownPicker: React.FC<DropdownPickerProps> = ({ label, options, selectedValue, onValueChange }) => {

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.dropdownHeader}>
                <Text style={styles.filterLabel}>{t(label)}:</Text>
                <Text style={styles.filterValue}>{selectedValue ? t(selectedValue) : t('all')}</Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.dropdownList}>
                    <FlatList
                        data={options}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    onValueChange(item.value);
                                    setIsOpen(false);
                                }}
                                style={styles.dropdownOption}
                            >
                                <Text style={styles.dropdownOptionText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )}
        </View>
    );
};

export default function SearchResources() {
    const { t } = useTranslation();

    const [searchQuery, setSearchQuery] = useState('');
    const [resourceType, setResourceType] = useState('');
    const [relationType, setRelationType] = useState('');
    const [category, setCategory] = useState('');

    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        console.log("Search Query:", searchQuery);
        console.log("Resource Type:", resourceType);
        console.log("Relation Type:", relationType);
        console.log("Category:", category);
        // Add logic to perform search here
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('find_resources')}</Text>

            <TextInput
                style={styles.searchBar}
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.filtersButton}>
                <Text style={styles.filtersButtonText}>{t('filters')}</Text>
            </TouchableOpacity>

            {showFilters && (
                <View style={styles.filtersContainer}>
                    <DropdownPicker
                        label="resource_type"
                        options={[
                            { label: t('all'), value: '' },
                            { label: t('type1'), value: 'type1' },
                            { label: t('type2'), value: 'type2' },
                        ]}
                        selectedValue={resourceType}
                        onValueChange={setResourceType}
                    />

                    <DropdownPicker
                        label="relation_type"
                        options={[
                            { label: t('all'), value: '' },
                            { label: t('relation1'), value: 'relation1' },
                            { label: t('relation2'), value: 'relation2' },
                        ]}
                        selectedValue={relationType}
                        onValueChange={setRelationType}
                    />

                    <DropdownPicker
                        label="category"
                        options={[
                            { label: t('all'), value: '' },
                            { label: t('category1'), value: 'category1' },
                            { label: t('category2'), value: 'category2' },
                        ]}
                        selectedValue={category}
                        onValueChange={setCategory}
                    />
                </View>
            )}

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>{t('search')}</Text>
            </TouchableOpacity>
        </View>
    );
}