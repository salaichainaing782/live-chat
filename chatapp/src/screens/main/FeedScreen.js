import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import PostCard from '../../components/PostCard';
import StoryBar from '../../components/StoryBar';
import apiClient from '../../api/client'; // Import apiClient

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]); // Start with empty array
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();

  const fetchPosts = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await apiClient.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to load posts. Please try again.');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
    logo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    headerIcons: {
      flexDirection: 'row',
    },
    iconButton: {
      marginLeft: 15,
    },
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
  });

  const renderPost = ({ item }) => (
    <PostCard post={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>ChatApp</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Camera')}
          >
            <Ionicons name="camera-outline" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="paper-plane-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id} // Changed from item.id to item._id
        ListHeaderComponent={<StoryBar />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchPosts} // Call fetchPosts on refresh
            tintColor={theme.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}