import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Switch, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

export default function PublishResource() {
  const { t } = useTranslation();

  const [categories, setCategories] = useState<Array<{ id: number; title: string }>>([]);
  const [resourceTypes, setResourceTypes] = useState<Array<{ id: number; name: string }>>([]);
  const [relationTypes, setRelationTypes] = useState<Array<{ id: number; title: string }>>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [resourceTypeId, setResourceTypeId] = useState('');
  const [relationshipTypeIds, setRelationshipTypeIds] = useState<string[]>([]);

  // État pour stocker l'image
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    // Remplacement des requêtes API par des données fictives
    setCategories([
      { id: 1, title: 'Category 1' },
      { id: 2, title: 'Category 2' },
    ]);

    setResourceTypes([
      { id: 1, name: 'Resource Type 1' },
      { id: 2, name: 'Resource Type 2' },
    ]);

    setRelationTypes([
      { id: 1, title: 'Relation Type 1' },
      { id: 2, title: 'Relation Type 2' },
    ]);
  }, []);

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setImage(selectedImage || null);
      }
    });
  };

  const handleSubmit = () => {
    if (!title || !description || !categoryId || !resourceTypeId || !relationshipTypeIds.length) {
      setError(t('publishResource.fillAllFields'));
      return;
    }

    // Remplacer par la logique de soumission réelle
    Alert.alert(t('publishResource.resourceCreated'));
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
          <Text style={styles.label}>{t('publishResource.image')}:</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
            <Text style={styles.uploadButtonText}>{t('publishResource.chooseFile')}</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.formActions}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t('publishResource.submit')}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});
