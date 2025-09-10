import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import apiClient from '../../api/client';

export default function CreatePostScreen({ route, navigation }) {
  const { imageUri } = route.params || {};
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();

  const createPost = async () => {
    if (!caption.trim() && !imageUri) {
      Alert.alert('Error', 'Please add a caption or image');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', caption);
      
      // Also append location if it exists
      if (location) {
        formData.append('location', location);
      }

      if (imageUri) {
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('image', { uri: imageUri, name: filename, type });
      }

      const response = await apiClient.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Post created successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.data.message || 'Failed to create post.');
      }
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerButton: {
      padding: 5,
    },
    headerButtonText: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    content: {
      flex: 1,
      padding: 15,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.surface,
    },
    username: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
    },
    imageContainer: {
      marginBottom: 20,
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 10,
      backgroundColor: theme.surface,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      backgroundColor: theme.surface,
      color: theme.text,
      textAlignVertical: 'top',
    },
    captionInput: {
      height: 100,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    locationInput: {
      flex: 1,
      marginLeft: 10,
    },
    optionsContainer: {
      backgroundColor: theme.card,
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    optionText: {
      marginLeft: 15,
      fontSize: 16,
      color: theme.text,
    },
    aiSuggestions: {
      backgroundColor: theme.surface,
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
    },
    aiTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
    },
    suggestionItem: {
      backgroundColor: theme.card,
      padding: 10,
      borderRadius: 20,
      marginBottom: 8,
      alignSelf: 'flex-start',
    },
    suggestionText: {
      color: theme.primary,
      fontSize: 14,
    },
  });

  const aiSuggestions = [
    "Perfect moment captured! ✨",
    "Living my best life 🌟",
    "Good vibes only 😊",
    "Making memories 📸",
    "Blessed and grateful 🙏",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerButtonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>New Post</Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={createPost}
          disabled={loading}
        >
          <Text style={styles.headerButtonText}>
            {loading ? 'Posting...' : 'Share'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: user.avatar || 'https://via.placeholder.com/40' }} 
            style={styles.avatar}
          />
          <Text style={styles.username}>{user.username}</Text>
        </View>

        {imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        )}

        <TextInput
          style={[styles.input, styles.captionInput]}
          placeholder="Write a caption..."
          placeholderTextColor={theme.textSecondary}
          value={caption}
          onChangeText={setCaption}
          multiline
        />

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.input, styles.locationInput]}
            placeholder="Add location"
            placeholderTextColor={theme.textSecondary}
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.aiSuggestions}>
          <Text style={styles.aiTitle}>✨ AI Caption Suggestions</Text>
          {aiSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => setCaption(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="people-outline" size={20} color={theme.textSecondary} />
            <Text style={styles.optionText}>Tag People</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="musical-notes-outline" size={20} color={theme.textSecondary} />
            <Text style={styles.optionText}>Add Music</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="happy-outline" size={20} color={theme.textSecondary} />
            <Text style={styles.optionText}>Feeling/Activity</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
