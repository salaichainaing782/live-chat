import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import apiClient from '../api/client';

const { width } = Dimensions.get('window');

export default function PostCard({ post }) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [liked, setLiked] = useState(post.likes?.includes(user?.id));
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  const handleLike = async () => {
    if (!user) {
      Alert.alert('Error', 'You need to be logged in to like posts.');
      return;
    }
    try {
      const response = await apiClient.put(`/posts/${post._id}/like`);
      if (response.status === 200) {
        setLiked(!liked);
        setLikesCount(response.data.likes.length);
      }
    } catch (error) {
      console.error('Failed to like post', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to like post. Please try again.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.card,
      marginBottom: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.surface,
    },
    userInfo: {
      marginLeft: 10,
      flex: 1,
    },
    username: {
      fontWeight: 'bold',
      color: theme.text,
    },
    timestamp: {
      color: theme.textSecondary,
      fontSize: 12,
    },
    content: {
      paddingHorizontal: 15,
    },
    caption: {
      color: theme.text,
      marginBottom: 10,
    },
    image: {
      width: width,
      height: width,
      backgroundColor: theme.surface,
    },
    actions: {
      flexDirection: 'row',
      padding: 15,
      alignItems: 'center',
    },
    actionButton: {
      marginRight: 15,
    },
    likesText: {
      color: theme.text,
      fontWeight: 'bold',
      marginLeft: 'auto',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: post.author.avatar || 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{post.author.username}</Text>
          <Text style={styles.timestamp}>
            {new Date(post.createdAt).toLocaleDateString() || 'Now'}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      {post.content && (
        <View style={styles.content}>
          <Text style={styles.caption}>{post.content}</Text>
        </View>
      )}

      {post.images && post.images.length > 0 && (
        <Image source={{ uri: post.images[0] }} style={styles.image} />
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={24} 
            color={liked ? "#FF3B30" : theme.text} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="paper-plane-outline" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.likesText}>{likesCount} likes</Text>
      </View>
    </View>
  );
}
