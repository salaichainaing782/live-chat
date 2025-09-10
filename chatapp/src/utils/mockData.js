// Mock data for UI examples without Firebase
export const mockUser = {
  uid: 'user123',
  displayName: 'John Doe',
  email: 'john@example.com',
  photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
};

export const mockPosts = [
  {
    id: '1',
    caption: 'Beautiful sunset at the beach! 🌅',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    userId: 'user456',
    userName: 'Sarah Wilson',
    userPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    likes: ['user123', 'user789'],
    comments: [],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    caption: 'Coffee time ☕ Perfect way to start the morning!',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    userId: 'user789',
    userName: 'Mike Chen',
    userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    likes: ['user123'],
    comments: [],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: '3',
    caption: 'Working from home setup 💻 #productivity',
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    userId: 'user101',
    userName: 'Emma Davis',
    userPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    likes: ['user123', 'user456', 'user789'],
    comments: [],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
  }
];

export const mockChats = [
  {
    id: 'chat1',
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Hey! How are you doing?',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    unreadCount: 2,
    participants: ['user123', 'user456']
  },
  {
    id: 'chat2',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Thanks for the help!',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    unreadCount: 0,
    participants: ['user123', 'user789']
  },
  {
    id: 'chat3',
    name: 'Team Group',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop',
    lastMessage: 'Meeting at 3 PM today',
    lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    unreadCount: 5,
    participants: ['user123', 'user456', 'user789', 'user101']
  }
];

export const mockMessages = [
  {
    _id: '1',
    text: 'Hello! How are you?',
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    user: {
      _id: 'user456',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
  },
  {
    _id: '2',
    text: 'I\'m doing great! Thanks for asking 😊',
    createdAt: new Date(Date.now() - 8 * 60 * 1000),
    user: {
      _id: 'user123',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
  },
  {
    _id: '3',
    text: 'What are you up to today?',
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    user: {
      _id: 'user456',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
  },
  {
    _id: '4',
    text: 'Just working on some projects. How about you?',
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    user: {
      _id: 'user123',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
  }
];

export const mockStories = [
  { id: 'add', type: 'add' },
  { 
    id: '1', 
    user: 'Sarah Wilson', 
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 
    viewed: false 
  },
  { 
    id: '2', 
    user: 'Mike Chen', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 
    viewed: true 
  },
  { 
    id: '3', 
    user: 'Emma Davis', 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 
    viewed: false 
  },
  { 
    id: '4', 
    user: 'Alex Johnson', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 
    viewed: false 
  }
];