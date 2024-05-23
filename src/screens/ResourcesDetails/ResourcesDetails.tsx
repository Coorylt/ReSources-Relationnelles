import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import getApiUrl from '../../Services/getApiUrl';
import axios from "axios";
import moment from 'moment';
import 'moment/locale/fr';
import { WebView } from 'react-native-webview';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { styles } from './style';
import BackArrow from '../../components/BackArrow/BackArrow';


type Resource = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    viewsCount: number;
    likes: { userId: string }[];
    isPrivate: boolean;
    user: any;
    image: string;
    comments: {
        author: {
            pseudo: string;
        };
        id: string;
        parentId: string | null;
        content: string;
    }[];
    saved: { userId: string }[];
    status: string;
    category: any;
    ressourceType: any;
    relationType: any;
    file: {
        filePath: string;
        mimeType: string;
    };
};

type RouteParams = {
    id: string | null;
};

export default function ResourcesDetails() {
    const route = useRoute<{ params: RouteParams }>();
    const { id } = route.params ?? { id: null };
    const [resource, setResource] = useState<Resource | null>(null);
    const [resourceError, setResourceError] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const { t } = useTranslation();
    const { token, isLoading, role, userId } = useAuth();
    const navigation = useNavigation();

    const fetchResource = useCallback(async () => {
        if (!id) {
            setResourceError(true);
            return;
        }

        try {
            const response = await axios.get(getApiUrl(`/ressource/${id}`), {
                headers: {
                    'Content-Type': 'application/ld+json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setResource(response.data);
            setLiked(response.data.likes.some((like: { userId: string }) => like.userId === userId));
            setSaved(response.data.saved.some((save: { userId: string }) => save.userId === userId));
        } catch (err: any) {
            setResourceError(true);
        }
    }, [id, token, userId]);

    useEffect(() => {
        if (id) {
            fetchResource();
        } else {
            setResourceError(true);
        }
    }, [fetchResource, id, token]);

    const handleSave = useCallback(async () => {
        if (!id) return;

        if (saved) {
            await fetch(getApiUrl(`/ressources/${id}/unsave`), {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } else {
            await fetch(getApiUrl(`/ressources/${id}/save`), {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        fetchResource();
    }, [fetchResource, id, saved, token]);

    const handleLike = useCallback(async () => {
        if (!id) return;

        if (liked) {
            await fetch(getApiUrl(`/ressources/${id}/unlike`), {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } else {
            await fetch(getApiUrl(`/ressources/${id}/like`), {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        fetchResource();
    }, [fetchResource, id, liked, token]);

    const handleClickUpdateStatus = async (status: string) => {
        if (!id) return;

        try {
            await handleUpdateStatus(status);
            fetchResource();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleUpdateStatus = async (status: string) => {
        if (!id) return;

        try {
            const response = await axios.patch(
                getApiUrl(`/ressources/${id}/status`),
                { status },
                {
                    headers: {
                        'Content-Type': 'application/ld+json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error("Error updating status:", error);
        }
    };

    const handleDeleteResource = async () => {
        if (!id) return;

        Alert.alert(
            "Confirm",
            "Are you sure you want to delete this resource? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        try {
                            await axios.delete(getApiUrl(`/ressources/${id}`), {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            Alert.alert("Resource deleted successfully.");
                            navigation.navigate('Resources');
                        } catch (error: any) {
                            console.error("Error deleting resource:", error);
                            setResourceError(true);
                        }
                    }
                }
            ]
        );
    };

    if (!resource) {
        if (resourceError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.errorMessage}>
                        {t('resourcesDetails.resourceNotFound')}
                    </Text>
                </View>
            );
        } else {
            return (
                <LoadingScreen />
            );
        }
    }

    const renderFile = () => {
        if (resource.file) {
            switch (resource.file.mimeType) {
                case 'image/jpeg':
                case 'image/png':
                case 'image/jpg':
                case 'image/webp':
                case 'image/gif':
                    const imgfilepath = "http://localhost:8000/uploads/files/images/" + resource.file.filePath;
                    return <Image style={styles.image} source={{ uri: imgfilepath }} />;
                case 'application/pdf':
                    const pdfsfilepath = "http://localhost:8000/uploads/files/pdfs/" + resource.file.filePath;
                    return <WebView source={{ uri: pdfsfilepath }} style={styles.image} />;
                default:
                    const filepath = "http://localhost:8000/uploads/files/others/" + resource.file.filePath;
                    return (
                        <View style={styles.downloadContainer}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL(filepath)}
                                style={styles.downloadButton}
                            >
                                <Text style={styles.downloadButtonText}>
                                    {t('resourcesDetails.downloadFile')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
            }
        }
        return null;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerResources}>
                <View style={styles.header}>
                    <View style={styles.creatorInfo}>
                        <Image source={require('../../../public/img/pdp.png')} style={styles.userImage} />
                        <View style={styles.meta}>
                            <Text style={styles.metaText}>{resource.user.pseudo}</Text>
                            <View style={styles.dateViews}>
                                <Text style={styles.date}>
                                    {moment(resource.createdAt).format('LL')}
                                </Text>
                                <Icon name="eye" size={20} />
                                <Text style={styles.views}>{resource.viewsCount}</Text>
                            </View>
                        </View>
                    </View>
                    <Button
                        title={saved ? t('resourcesDetails.unsaveButton') : t('resourcesDetails.saveButton')}
                        onPress={handleSave}
                        style={styles.button}
                    />
                </View>
                <View style={styles.body}>
                    <Text style={styles.title}>{resource.title}</Text>
                    <View style={styles.likes}>
                        <Button
                            title={liked ? t('resourcesDetails.unlikeButton') : t('resourcesDetails.likeButton')}
                            onPress={handleLike}
                        />
                    </View>
                    <Text style={styles.textType}>{resource.ressourceType && t(resource.ressourceType.name)}</Text>
                    {renderFile()}
                    <Text style={styles.description}>{resource.description}</Text>
                </View>
                {token && userId === resource.user.id && (
                    <View style={styles.deleteContainer}>
                        <Button title={t('resourcesDetails.deleteButton')} onPress={handleDeleteResource} />
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
