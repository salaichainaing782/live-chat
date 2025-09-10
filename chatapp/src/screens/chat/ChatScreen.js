import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import AIAssistant from '../../components/AIAssistant';
import { mockMessages } from '../../utils/mockData';

export default function ChatScreen({ route, navigation }) {
  const { chatId, chatName } = route.params;
  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState('');
  const [showAI, setShowAI] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      title: chatName,
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            onPress={() => setShowAI(!showAI)}
            style={{ marginRight: 15 }}
          >
            <Ionicons 
              name="sparkles-outline" 
              size={24} 
              color={showAI ? theme.primary : theme.text} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Ionicons name="videocam-outline" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Ionicons name="call-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [chatName, showAI, theme]);

  useEffect(() => {
    setMessages(mockMessages);
  }, [chatId]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage = {
      _id: Math.random().toString(),
      text: inputText,
      createdAt: new Date(),
      user: {
        _id: user?.uid || 'user123',
        name: user?.displayName || 'You',
        avatar: user?.photoURL,
      },
    };
    
    setMessages(prev => [newMessage, ...prev]);
    setInputText('');
  };

  const onSend = (newMessages = []) => {
    setMessages(prev => [...newMessages, ...prev]);
  };

  const renderMessage = ({ item }) => {
    const isMyMessage = item.user._id === (user?.uid || 'user123');
    
    return (
      <View style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessage : styles.otherMessage
      ]}>
        {!isMyMessage && (
          <Image 
            source={{ uri: item.user.avatar || 'https://via.placeholder.com/30' }}
            style={styles.avatar}
          />
        )}
        <View style={[
          styles.messageBubble,
          { backgroundColor: isMyMessage ? theme.primary : theme.surface }
        ]}>
          <Text style={[
            styles.messageText,
            { color: isMyMessage ? '#ffffff' : theme.text }
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.messageTime,
            { color: isMyMessage ? 'rgba(255,255,255,0.7)' : theme.textSecondary }
          ]}>
            {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    messagesList: {
      flex: 1,
      paddingHorizontal: 10,
    },
    messageContainer: {
      flexDirection: 'row',
      marginVertical: 5,
      alignItems: 'flex-end',
    },
    myMessage: {
      justifyContent: 'flex-end',
    },
    otherMessage: {
      justifyContent: 'flex-start',
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginRight: 8,
    },
    messageBubble: {
      maxWidth: '70%',
      padding: 12,
      borderRadius: 18,
      marginHorizontal: 5,
    },
    messageText: {
      fontSize: 16,
      marginBottom: 4,
    },
    messageTime: {
      fontSize: 12,
      alignSelf: 'flex-end',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: theme.card,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginRight: 10,
      backgroundColor: theme.surface,
      color: theme.text,
      maxHeight: 100,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    aiContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.background,
      zIndex: 1000,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
        style={styles.messagesList}
        inverted
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor={theme.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
      
      {showAI && (
        <View style={styles.aiContainer}>
          <AIAssistant 
            onClose={() => setShowAI(false)}
            onSendMessage={onSend}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}