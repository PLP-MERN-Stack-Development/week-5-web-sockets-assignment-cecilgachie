# Chat App Client

This is the React frontend for the real-time chat application.

## Features

- **Real-time messaging** using Socket.io
- **User authentication** with username
- **Multiple chat rooms** (general, random, help, off-topic)
- **Private messaging** between users
- **Real-time notifications** for various events
- **Typing indicators** showing when users are typing
- **Read receipts** showing message delivery status
- **User presence** showing online/offline status
- **Responsive design** that works on mobile and desktop

## Advanced Features Implemented

1. **Typing Indicators** - Shows when other users are typing
2. **Read Receipts** - Shows when messages have been delivered and read
3. **User Presence** - Real-time online/offline status
4. **Private Messaging** - Direct messages between users
5. **Multiple Chat Rooms** - Different channels for different topics
6. **Real-time Notifications** - Toast notifications for various events

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. The app will open at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the client directory:

```
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Usage

1. Enter your username to join the chat
2. Select a room from the sidebar or start a private chat with another user
3. Type messages and see them appear in real-time
4. See typing indicators when others are typing
5. View read receipts for your sent messages
6. See online users and their status

## Components

- `App.js` - Main application component
- `Auth.js` - Login/authentication component
- `Chat.js` - Main chat interface
- `Sidebar.js` - User list and room selection
- `MessageList.js` - Message display with typing indicators
- `Message.js` - Individual message component with read receipts
- `MessageInput.js` - Message input with typing detection
- `Notification.js` - Toast notification component

## Socket Events

The client handles the following socket events:
- `connect`/`disconnect` - Connection status
- `receive_message` - Incoming messages
- `private_message` - Private messages
- `user_list` - Online users
- `user_joined`/`user_left` - User presence
- `typing_users` - Typing indicators 