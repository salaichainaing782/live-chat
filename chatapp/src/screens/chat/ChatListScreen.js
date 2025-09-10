import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { mockChats } from '../../utils/mockData';

export default function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState(mockChats);
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    // Load mock chats
    setChats(mockChats);
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
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
    },
    chatItem: {
      flexDirection: 'row',
      padding: 15,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.surface,
    },
    chatInfo: {
      flex: 1,
      marginLeft: 15,
    },
    chatName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 2,
    },
    lastMessage: {
      color: theme.textSecondary,
      fontSize: 14,
    },
    timeContainer: {
      alignItems: 'flex-end',
    },
    time: {
      color: theme.textSecondary,
      fontSize: 12,
    },
    unreadBadge: {
      backgroundColor: theme.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },
    unreadText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
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
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      color: theme.textSecondary,
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
    },
  });

  const renderChatItem = ({ item }) => {
    // Safely find the other participant only if the user object exists
    const otherParticipant = user ? item.participants.find(p => p !== user.uid) : null;

    const getDisplayTime = () => {
      if (!item.lastMessageTime) return '';
      const date = new Date(item.lastMessageTime);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    return (
      <TouchableOpacity 
        style={styles.chatItem}
        onPress={() => navigation.navigate('Chat', { chatId: item.id, chatName: item.name })}
      >
        <Image 
          source={{ uri: item.avatar || 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>{item.name || 'Chat'}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage || 'No messages yet'}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{getDisplayTime()}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {chats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubbles-outline" size={64} color={theme.textSecondary} />
          <Text style={styles.emptyText}>
            No chats yet.{'\n'}Start a conversation with someone!
          </Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
        />
      )}

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="create-outline" size={28} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}