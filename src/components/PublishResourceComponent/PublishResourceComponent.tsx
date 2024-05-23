import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import getApiUrl from '../../Services/getApiUrl';
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

interface OptionType {
    label: string;
    value: number | string;
}

export default function PublishResourceComponent() {
    const { t } = useTranslation();
    const { isAuthenticated, token } = useAuth();

    const [categories, setCategories] = useState<Array<{ id: number; title: string }>>([]);
    const [resourceTypes, setResourceTypes] = useState<Array<{ id: number; name: string }>>([]);
    const [relationTypes, setRelationTypes] = useState<Array<{ id: number; title: string }>>([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [error, setError] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [resourceTypeId, setResourceTypeId] = useState('');
    const [relationshipTypeIds, setRelationshipTypeIds] = useState<Array<OptionType>>([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [fadeOut, setFadeOut] = useState(false);
    const [file, setFile] = useState<DocumentPicker.DocumentPickerSuccessResult | null>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleSubmit = async () => {
        if (!title || !description || !categoryId || !resourceTypeId || relationshipTypeIds.length === 0) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("isPrivate", isPrivate.toString());
            formData.append("categoryId", categoryId);
            formData.append("ressourceTypeId", resourceTypeId);
            relationshipTypeIds.forEach(id => {
                formData.append("relationshipTypeIds[]", id.value.toString());
            });

            if (file && file.type === 'success') {
                formData.append("file", {
                    uri: file.uri,
                    name: file.name,
                    type: file.mimeType,
                });
            }

            const response = await axios.post(
                getApiUrl("/ressources"),
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setSuccessMessage("La ressource a été créée avec succès !");
            setError('');

            setTitle('');
            setDescription('');
            setCategoryId('');
            setResourceTypeId('');
            setRelationshipTypeIds([]);
            setFile(null);
            setFileName('');
            setIsPrivate(false);

        } catch (error) {
            console.error("Erreur lors de la création de la ressource :", error);
            setError("Erreur lors de la création de la ressource.");
            setSuccessMessage('');
        }
    };

    const handleFilePicker = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "image/*,video/*,application/pdf",
        });

        if (result.type === "success") {
            setFile(result);
            setFileName(result.name);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileName('');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, resourceTypesResponse, relationTypesResponse] = await Promise.all([
                    axios.get(getApiUrl('/categories')),
                    axios.get(getApiUrl('/ressource_types')),
                    axios.get(getApiUrl('/relationship_types'))
                ]);

                setCategories(categoriesResponse.data['hydra:member']);
                setResourceTypes(resourceTypesResponse.data['hydra:member']);
                setRelationTypes(relationTypesResponse.data['hydra:member']);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer1 = setTimeout(() => {
                setFadeOut(true);
            }, 4000);

            const timer2 = setTimeout(() => {
                setSuccessMessage('');
                setFadeOut(false);
            }, 5000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [successMessage]);
    if (!isAuthenticated) {
        return <Text>Veuillez vous connecter pour créer une ressource.</Text>;
    }
    if (!categories.length || !resourceTypes.length || !relationTypes.length) {
        return <LoadingScreen />;
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.publishResource}>
                <Text style={styles.heading}>{t('publishResource.createResource')}</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{t('publishResource.title')}:</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{t('publishResource.description')}:</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
                <View style={styles.pickerGroup}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{t('publishResource.category')}</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setCategoryId(value)}
                            items={categories.map(cat => ({ label: t("categories." + cat.title), value: cat.id.toString() }))}
                            value={categoryId}
                            placeholder={{ label: t('publishResource.chooseCategory'), value: '' }}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{t('publishResource.resourceType')}</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setResourceTypeId(value)}
                            items={resourceTypes.map(rt => ({ label: t("resourceTypes." + rt.name), value: rt.id.toString() }))}
                            value={resourceTypeId}
                            placeholder={{ label: t('publishResource.chooseResourceType'), value: '' }}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>{t('publishResource.relationType')}</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setRelationshipTypeIds(value)}
                            items={relationTypes.map(rt => ({ label: t("relationTypes." + rt.title), value: rt.id }))}
                            value={relationshipTypeIds.map(rt => rt.value)}
                            placeholder={{ label: t('publishResource.chooseRelationType'), value: '' }}
                        />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{t("publishResource.private")}</Text>
                    <TouchableOpacity style={styles.toggle} onPress={() => setIsPrivate(!isPrivate)}>
                        <View style={[styles.toggleSwitch, isPrivate ? styles.toggleSwitchActive : {}]} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>{t('publishResource.file')}:</Text>
                    <TouchableOpacity onPress={handleFilePicker} style={styles.uploadButton}>
                        <Text>{t('publishResource.chooseFile')}</Text>
                    </TouchableOpacity>
                    {fileName ? (
                        <View style={styles.fileInfo}>
                            <Text style={styles.fileName}>{fileName}</Text>
                            <TouchableOpacity onPress={handleRemoveFile}>
                                <Icon name="trash" type="font-awesome" color="#f50" />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {successMessage ? (
                    <Text style={[styles.success, fadeOut ? styles.fadeOut : null]}>{successMessage}</Text>
                ) : null}
                <View style={styles.formActions}>
                    <Button title={t('publishResource.submit')} onPress={handleSubmit} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    publishResource: {
        width: '100%',
        maxWidth: 600,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 16,
    },
    pickerGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    toggle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleSwitch: {
        width: 40,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ccc',
        position: 'relative',
    },
    toggleSwitchActive: {
        backgroundColor: '#4CAF50',
    },
    uploadButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    fileName: {
        fontSize: 16,
        marginRight: 8,
    },
    error: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
    },
    success: {
        color: 'green',
        marginBottom: 16,
        textAlign: 'center',
    },
    fadeOut: {
        opacity: 0,
    },
    formActions: {
        marginTop: 16,
        alignItems: 'center',
    },
});
