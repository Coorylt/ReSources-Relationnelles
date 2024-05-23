import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Switch, StyleSheet, Image, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import getApiUrl from '../../Services/getApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function PublishResource() {
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [relationTypes, setRelationTypes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [resourceTypeId, setResourceTypeId] = useState('');
  const [relationshipTypeIds, setRelationshipTypeIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
  }, []);

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

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      return;
    }

    if (!title || !description || !categoryId || !resourceTypeId || relationshipTypeIds.length === 0) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("isPrivate", isPrivate.toString());
      formData.append("categoryId", categoryId);
      formData.append("ressourceTypeId", resourceTypeId);
      relationshipTypeIds.forEach(id => {
        formData.append("relationshipTypeIds[]", id.toString());
      });

      if (file) {
        formData.append("file", {
          uri: file.uri,
          type: file.type,
          name: fileName,
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
      setIsModalVisible(true); // Show modal on success

      // Réinitialiser le formulaire
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
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });

      if (result.type === 'success') {
        setFile(result);
        setFileName(result.name);
      }
    } catch (error) {
      console.error('Error picking document: ', error);
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.publishResource}>
        <Text style={styles.title}>{t('publishResource.createResource')}</Text>
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
            style={styles.textArea}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('publishResource.category')}:</Text>
          <Picker
            selectedValue={categoryId}
            style={styles.picker}
            onValueChange={(itemValue) => setCategoryId(itemValue)}
          >
            <Picker.Item label={t('publishResource.chooseCategory')} value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={t(`categories.${cat.title}`)} value={cat.id.toString()} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('publishResource.resourceType')}:</Text>
          <Picker
            selectedValue={resourceTypeId}
            style={styles.picker}
            onValueChange={(itemValue) => setResourceTypeId(itemValue)}
          >
            <Picker.Item label={t('publishResource.chooseResourceType')} value="" />
            {resourceTypes.map((rt) => (
              <Picker.Item key={rt.id} label={t(`resourceTypes.${rt.name}`)} value={rt.id.toString()} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('publishResource.relationType')}:</Text>
          <Picker
            selectedValue={relationshipTypeIds}
            style={styles.picker}
            onValueChange={(itemValue) => setRelationshipTypeIds([itemValue])}
          >
            <Picker.Item label={t('publishResource.chooseRelationType')} value="" />
            {relationTypes.map((rt) => (
              <Picker.Item key={rt.id} label={t(`relationTypes.${rt.title}`)} value={rt.id.toString()} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('publishResource.private')}</Text>
          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('publishResource.file')}:</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleFilePicker}>
            <Text style={styles.uploadButtonText}>{t('publishResource.chooseFile')}</Text>
          </TouchableOpacity>
          {fileName ? <Text>{fileName}</Text> : null}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.formActions}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t('publishResource.submit')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for success message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Félicitations, la ressource a été publiée !</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  publishResource: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  switch: {
    alignSelf: 'flex-start',
  },
  uploadButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  imagePreview: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  formActions: {
    marginTop: 20,
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
