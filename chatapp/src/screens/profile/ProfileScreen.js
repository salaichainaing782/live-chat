import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Switch, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  const [activeTab, setActiveTab] = useState('grid');
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
      { id: '6', imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=300&h=300&fit=crop' },
      { id: '7', imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=300&h=300&fit=crop' },
      { id: '8', imageUrl: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=300&h=300&fit=crop' },
      { id: '9', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop' }
    ];
    setUserPosts(mockUserPosts);
    setStats({ posts: 9, followers: 128, following: 95 });
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
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    username: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginLeft: 10,
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: 15,
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
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 86,
      height: 86,
      borderRadius: 43,
      borderWidth: 2,
      borderColor: theme.primary,
    },
    addStoryButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.primary,
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.card,
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
      marginBottom: 5,
    },
    website: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: '500',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
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
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    buttonPrimary: {
      backgroundColor: theme.primary,
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.border,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    buttonTextSecondary: {
      color: theme.text,
      fontWeight: 'bold',
    },
    highlightsContainer: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      backgroundColor: theme.card,
    },
    highlightsScroll: {
      paddingHorizontal: 5,
    },
    highlightItem: {
      alignItems: 'center',
      marginRight: 15,
    },
    highlightCircle: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 1,
      borderColor: theme.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    highlightTitle: {
      fontSize: 12,
      color: theme.textSecondary,
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
      borderBottomWidth: 1,
      borderBottomColor: theme.text,
    },
    tabIcon: {
      opacity: 0.6,
    },
    activeTabIcon: {
      opacity: 1,
    },
    postsGrid: {
      flex: 1,
    },
    postItem: {
      width: '33%',
      aspectRatio: 1,
      margin: 0.5,
    },
    postImage: {
      width: '100%',
      height: '100%',
    },
    postsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 0.5,
    },
    settingsSection: {
      backgroundColor: theme.card,
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: theme.border,
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
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    },
    emptyStateText: {
      color: theme.textSecondary,
      marginTop: 10,
    },
  });

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </TouchableOpacity>
  );

  const renderHighlight = (item, index) => (
    <TouchableOpacity key={index} style={styles.highlightItem}>
      <View style={styles.highlightCircle}>
        <Ionicons name="add-circle" size={24} color={theme.textSecondary} />
      </View>
      <Text style={styles.highlightTitle}>New</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="lock-closed-outline" size={16} color={theme.text} />
          <Text style={styles.username}>{user?.displayName || 'username'}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('CreatePost')}
          >
            <Ionicons name="add" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user?.photoURL || 'https://via.placeholder.com/86' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.addStoryButton}>
              <Ionicons name="add" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.displayName}>{user?.displayName}</Text>
            <Text style={styles.bio}>Digital creator | Photography enthusiast</Text>
            <Text style={styles.website}>www.example.com</Text>
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
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
            <Text style={styles.buttonText}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
            <Text style={styles.buttonTextSecondary}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
            <Ionicons name="person-add-outline" size={16} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.highlightsContainer}
        contentContainerStyle={styles.highlightsScroll}
      >
        {[1, 2, 3, 4].map((_, index) => renderHighlight(_, index))}
      </ScrollView>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'grid' && styles.activeTab]} 
          onPress={() => setActiveTab('grid')}
        >
          <Ionicons 
            name="grid-outline" 
            size={24} 
            color={theme.text} 
            style={[styles.tabIcon, activeTab === 'grid' && styles.activeTabIcon]} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'reels' && styles.activeTab]} 
          onPress={() => setActiveTab('reels')}
        >
          <Ionicons 
            name="play-circle-outline" 
            size={24} 
            color={theme.text} 
            style={[styles.tabIcon, activeTab === 'reels' && styles.activeTabIcon]} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tags' && styles.activeTab]} 
          onPress={() => setActiveTab('tags')}
        >
          <Ionicons 
            name="person-outline" 
            size={24} 
            color={theme.text} 
            style={[styles.tabIcon, activeTab === 'tags' && styles.activeTabIcon]} 
          />
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
            name={isSystemTheme ? "checkmark-circle" : "chevron-forward"} 
            size={20} 
            color={isSystemTheme ? theme.primary : theme.textSecondary} 
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
        <Text style={styles.logoutText}>Log Out</Text>
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
        columnWrapperStyle={styles.postsContainer}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}