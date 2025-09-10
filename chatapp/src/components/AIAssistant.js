import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function AIAssistant({ onClose, onSendMessage }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    "How's your day going?",
    "What are you up to?",
    "Let's catch up soon!",
    "Thanks for your help!",
    "Sounds good to me!",
    "I'll get back to you on that.",
  ]);
  const { theme } = useTheme();

  const handleSuggestion = (suggestion) => {
    onSendMessage([{
      _id: Math.random().toString(),
      text: suggestion,
      createdAt: new Date(),
    }]);
    onClose();
  };

  const generateAIResponse = async () => {
    if (!input.trim()) return;
    
    // Simulate AI response generation
    const aiResponses = [
      "That's a great question! Let me think about that.",
      "I understand what you're looking for. Here's my suggestion:",
      "Based on the context, I'd recommend:",
      "That's an interesting point. Consider this:",
      "I can help with that. Here's what I think:",
    ];
    
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    
    onSendMessage([{
      _id: Math.random().toString(),
      text: `${randomResponse} ${input}`,
      createdAt: new Date(),
    }]);
    
    setInput('');
    onClose();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    title: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginLeft: 10,
    },
    content: {
      flex: 1,
      padding: 15,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
    },
    suggestionItem: {
      backgroundColor: theme.surface,
      padding: 12,
      borderRadius: 20,
      marginBottom: 8,
      alignSelf: 'flex-start',
    },
    suggestionText: {
      color: theme.text,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginTop: 15,
    },
    input: {
      flex: 1,
      color: theme.text,
      fontSize: 16,
    },
    sendButton: {
      marginLeft: 10,
      padding: 5,
    },
    aiFeature: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    featureIcon: {
      marginRight: 15,
    },
    featureText: {
      flex: 1,
    },
    featureTitle: {
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 2,
    },
    featureDescription: {
      color: theme.textSecondary,
      fontSize: 12,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>AI Assistant</Text>
        <Ionicons name="sparkles" size={24} color={theme.primary} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Replies</Text>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleSuggestion(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Features</Text>
          
          <TouchableOpacity style={styles.aiFeature}>
            <Ionicons name="language-outline" size={24} color={theme.primary} style={styles.featureIcon} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Smart Translation</Text>
              <Text style={styles.featureDescription}>Translate messages in real-time</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aiFeature}>
            <Ionicons name="bulb-outline" size={24} color={theme.primary} style={styles.featureIcon} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Message Suggestions</Text>
              <Text style={styles.featureDescription}>Get contextual reply suggestions</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aiFeature}>
            <Ionicons name="happy-outline" size={24} color={theme.primary} style={styles.featureIcon} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Tone Analysis</Text>
              <Text style={styles.featureDescription}>Analyze message sentiment</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generate Custom Message</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Describe what you want to say..."
              placeholderTextColor={theme.textSecondary}
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={generateAIResponse}>
              <Ionicons name="send" size={20} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}