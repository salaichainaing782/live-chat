import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { mockStories } from '../utils/mockData';

export default function StoryBar() {
  const { theme } = useTheme();
  const { user } = useAuth();

  const stories = mockStories;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.card,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    storyItem: {
      alignItems: 'center',
      marginHorizontal: 8,
    },
    storyImageContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      padding: 2,
      marginBottom: 5,
    },
    storyImage: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.surface,
    },
    addStoryContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.border,
      borderStyle: 'dashed',
    },
    storyText: {
      fontSize: 12,
      color: theme.text,
      textAlign: 'center',
    },
    unviewedBorder: {
      borderWidth: 2,
      borderColor: theme.primary,
    },
    viewedBorder: {
      borderWidth: 2,
      borderColor: theme.textSecondary,
    },
  });

  const renderStory = ({ item: story }) => {
    if (story.type === 'add') {
      return (
        <TouchableOpacity style={styles.storyItem}>
          <View style={styles.storyImageContainer}>
            <View style={styles.addStoryContainer}>
              <Ionicons name="add" size={24} color={theme.textSecondary} />
            </View>
          </View>
          <Text style={styles.storyText}>Your Story</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.storyItem}>
        <View style={[
          styles.storyImageContainer,
          story.viewed ? styles.viewedBorder : styles.unviewedBorder
        ]}>
          <Image source={{ uri: story.image }} style={styles.storyImage} />
        </View>
        <Text style={styles.storyText}>{story.user}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        renderItem={renderStory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}