import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Switch, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  const { user, logout } = useAuth();
  const { theme, isDark, toggleTheme, isSystemTheme, setSystemTheme } = useTheme();

  useEffect(() => {
    // Mock user posts
    const mockUserPosts = [
      { id: '1', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop' },
      { id: '2', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop' },
      { id: '3', imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop' },
      { id: '4', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop' },
      { id: '5', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop' },
      { id: '6', imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=300&h=300&fit=crop' }
    ];
    setUserPosts(mockUserPosts);
    setStats({ posts: 6, followers: 128, following: 95 });
  }, []);

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
    username: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
    },
    profileSection: {
      padding: 20,
      backgroundColor: theme.card,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.surface,
    },
    profileInfo: {
      flex: 1,
      marginLeft: 20,
    },
    displayName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    bio: {
      color: theme.textSecondary,
      fontSize: 14,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    statLabel: {
      color: theme.textSecondary,
      fontSize: 12,
      marginTop: 2,
    },
    actionButtons: {
      flexDirection: 'row',
      marginTop: 15,
    },
    button: {
      flex: 1,
      backgroundColor: theme.primary,
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    buttonSecondary: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    buttonTextSecondary: {
      color: theme.text,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    tab: {
      flex: 1,
      padding: 15,
      alignItems: 'center',
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: theme.primary,
    },
    postsGrid: {
      flex: 1,
      paddingHorizontal: 2,
    },
    postItem: {
      width: '32%',
      aspectRatio: 1,
      backgroundColor: theme.surface,
      borderRadius: 8,
      marginBottom: 4,
    },
    postImage: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    settingsSection: {
      backgroundColor: theme.card,
      marginTop: 10,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingText: {
      marginLeft: 15,
      fontSize: 16,
      color: theme.text,
    },
    logoutButton: {
      backgroundColor: theme.notification,
      margin: 15,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    logoutText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.postItem}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      ) : (
        <View style={[styles.postImage, { justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name="text" size={24} color={theme.textSecondary} />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.username}>{user?.displayName || 'Profile'}</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: user?.photoURL || 'https://via.placeholder.com/80' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.displayName}>{user?.displayName}</Text>
            <Text style={styles.bio}>Living life to the fullest ✨</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Share Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Ionicons name="grid-outline" size={20} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Ionicons name="bookmark-outline" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Ionicons name="person-outline" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>
    </>
  );

  const renderFooter = () => (
    <>
      <View style={styles.settingsSection}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon-outline" size={20} color={theme.text} />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={setSystemTheme}>
          <View style={styles.settingLeft}>
            <Ionicons name="phone-portrait-outline" size={20} color={theme.text} />
            <Text style={styles.settingText}>Use System Theme</Text>
          </View>
          <Ionicons 
            name={isSystemTheme ? "checkmark" : "chevron-forward"} 
            size={20} 
            color={theme.textSecondary} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={20} color={theme.text} />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="shield-outline" size={20} color={theme.text} />
            <Text style={styles.settingText}>Privacy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingHorizontal: 2 }}
      />
    </View>
  );
}