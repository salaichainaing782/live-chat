# ChatApp - React Native Expo Mobile Chat Application

A comprehensive mobile chat application built with React Native Expo featuring AI integration, real-time messaging, social media features, and dark mode support.

## Features

### 🚀 Core Features
- **Real-time Chat System**: One-on-one and group messaging with Firebase
- **Social Media Feed**: Instagram/Facebook-like posts with images and captions
- **Stories**: 24-hour expiring stories functionality
- **AI Integration**: Smart replies, message suggestions, and AI chat assistant
- **Dark/Light Mode**: System-level theme detection with manual toggle
- **Camera Integration**: In-app camera for photos and quick sharing

### 💬 Chat Features
- Real-time messaging with Firebase Firestore
- Message status indicators (sent, delivered, read)
- Typing indicators
- Media sharing (images, videos, documents)
- AI-powered chat assistant with smart suggestions
- Message translation and tone analysis

### 📱 Social Features
- Create and share posts with images and captions
- Like, comment, and share functionality
- User profiles with post galleries
- Follow/unfollow system
- Stories with 24-hour expiration
- Hashtag and discovery features
- News feed with algorithmic sorting

### 🤖 AI Features
- AI chat assistant with contextual responses
- Smart reply suggestions
- Auto-generated captions for posts
- Content recommendation algorithm
- Image recognition for automatic tagging
- Sentiment analysis for messages

### 🎨 UI/UX Features
- Responsive design for iOS and Android
- Dark/Light mode with system detection
- Smooth animations and transitions
- Accessibility support
- Instagram/Facebook-inspired interface

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Real-time**: Firebase Realtime Database
- **Navigation**: React Navigation 6
- **UI Components**: React Native Elements, Vector Icons
- **Camera**: Expo Camera
- **Image Handling**: Expo Image Picker
- **State Management**: React Context API
- **Authentication**: Firebase Auth

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Authentication, Firestore, and Storage
   - Copy your Firebase config to `src/services/firebase.js`

4. **Run the application**
   ```bash
   npm start
   ```

## Firebase Setup

1. **Authentication**
   - Enable Email/Password authentication
   - Optional: Enable Google, Facebook sign-in

2. **Firestore Database**
   ```javascript
   // Collections structure:
   users: {
     uid: {
       email, displayName, photoURL, createdAt,
       followers: [], following: [], postsCount: 0
     }
   }
   
   posts: {
     postId: {
       caption, imageUrl, location, userId, userName, userPhoto,
       likes: [], comments: [], createdAt
     }
   }
   
   chats: {
     chatId: {
       participants: [], name, avatar, lastMessage,
       lastMessageTime, unreadCount
     }
   }
   
   messages: {
     messageId: {
       text, createdAt, user: { _id, name, avatar },
       image, video
     }
   }
   ```

3. **Storage**
   - Create folders: `posts/`, `profiles/`, `messages/`
   - Set appropriate security rules

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PostCard.js     # Social media post component
│   ├── StoryBar.js     # Stories horizontal scroll
│   └── AIAssistant.js  # AI chat assistant
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── ThemeContext.js # Theme management
├── navigation/         # Navigation configuration
│   └── AppNavigator.js # Main navigation setup
├── screens/           # Application screens
│   ├── auth/          # Authentication screens
│   ├── main/          # Main app screens
│   ├── chat/          # Chat-related screens
│   ├── profile/       # Profile screens
│   ├── camera/        # Camera functionality
│   └── post/          # Post creation
├── services/          # External services
│   └── firebase.js    # Firebase configuration
└── utils/             # Utility functions
```

## Key Components

### Authentication
- Email/password registration and login
- User profile creation with Firebase
- Persistent authentication state

### Real-time Chat
- Firebase Firestore for message storage
- Real-time message updates
- Typing indicators and message status

### Social Features
- Post creation with image upload
- Real-time likes and comments
- User profiles and following system

### AI Integration
- Smart reply suggestions
- AI chat assistant
- Auto-generated content

### Theme System
- System-level dark/light mode detection
- Manual theme toggle
- Persistent theme preferences

## Configuration

### Firebase Configuration
Update `src/services/firebase.js` with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Permissions
The app requires the following permissions:
- Camera access for photo capture
- Photo library access for image selection
- Notifications for real-time updates
- Location access for geotagging (optional)

## Development

### Running on Device
```bash
# iOS
npm run ios

# Android
npm run android

# Web (for testing)
npm run web
```

### Building for Production
```bash
# Build for app stores
expo build:android
expo build:ios
```

## Features Roadmap

- [ ] Video calling integration
- [ ] Advanced AI features (translation, moderation)
- [ ] Push notifications
- [ ] Story creation and viewing
- [ ] Advanced search and discovery
- [ ] Message encryption
- [ ] Voice messages
- [ ] File sharing
- [ ] Group management features
- [ ] Advanced privacy controls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.