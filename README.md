# TEXTOPIA - Chat Application

A modern, real-time chat application built with React + Vite and Firebase. TEXTOPIA brings users together with an intuitive interface and seamless messaging capabilities powered by Firebase Authentication and Database. Built for speed with Vite's lightning-fast build tooling.

## 🚀Features

- **Real-Time Messaging**: Send and receive messages with instant updates
- **User Profiles**: View and manage user information
- **Chat Lists**: Organized view of all your conversations
- **Add Users**: Search and add new users to your contacts
- **User Details**: View detailed information about chat participants
- **Mock Data Integration**: Pre-configured with sample data for development
- <!-- - **Responsive Design**: Works seamlessly on desktop and mobile devices -->
<!-- - **Status Indicators**: See user online/offline status -->

💻 Tech Stack

Framework: React (with JSX)
Build Tool: Vite
Styling: CSS & Tailwind CSS
Backend & Database: Firebase Database
Authentication: Firebase Authentication
State Management: Zustand
Hosting: Netlify
Package Manager: npm 
Architecture: Component-based modular structure

## 📁Project Structure

```
src/
├── App.jsx                         # Main application component 
├── components/
│   ├── chat/
│   │   ├── Chat.jsx                # Chat display component 
│   │   └── chat.css                # Chat styling
│   ├── detail/
│   │   ├── Detail.jsx              # Chat detail view 
│   │   └── detail.css              # Detail styling
│   ├── list/
│   │   ├── List.jsx                # Main list container
│   │   ├── list.css                # List styling
│   │   ├── chatList/
│   │   │   ├── ChatList.jsx        # Chat list display 
│   │   │   ├── chatList.css        # ChatList styling
│   │   │   └── addUser/
│   │   │     ├── addUser.jsx       # Add user functionality 
│   │   │     └── addUser.css       # AddUser styling
│   │   └── userInfo/
│   │       ├── Userinfo.jsx        # User info display 
│   │       └── userInfo.css        # UserInfo styling
│   ├── login/
│   │   ├── Login.jsx               # Login page 
│   │   └── login.css               # Login styling
│   └── notification/
│       └── Notification.jsx        # Notification component
├── lib/
│   ├── userStore.js                # User state management 
│   ├── chatStore.js                # Chat state management 
│   ├── firebase.js                 # Firebase config 
│   └──upload.js                    # Uploading 
└── index.css                       # Global styles
```

<!-- ## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mukulsharnagat01/TEXTOPIA-CHAT-APP.git
   cd TEXTOPIA-CHAT-APP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Usage

1. **View Chats**: Browse your conversation list in the left sidebar
2. **Select a Chat**: Click on any chat to view the conversation
3. **Send Messages**: Type and send messages in the chat window
4. **View Details**: Click on user info to see chat participant details
5. **Add Users**: Use the "Add User" feature to start new conversations
6. **User Profile**: Access your profile information from the user info section -->

<!-- ## Component Overview

### Chat Components

**Chat.jsx** - Displays the active conversation with messages and input field
- Shows message history
- Handles message input and sending
- Uses mock data for development

**Detail.jsx** - Shows detailed information about the selected chat
- Displays participant information
- Chat metadata and settings
- Mock data integration

**ChatList.jsx** - Lists all available conversations
- Search and filter conversations
- Quick access to any chat
- Mock chat data

### User Management

**Userinfo.jsx** - Displays current user information
- User profile details
- Status indicators
- Mock user data

**addUser.jsx** - Interface for adding new users to conversations
- Search for users
- Add users to your contact list
- Mock user suggestions

### State Management

**userStore.js** - Manages user-related state (To be replaced)
- Current user information
- User preferences

**chatStore.js** - Manages chat-related state (To be replaced)
- Active chat selection
- Message history
- Chat metadata -->

<!-- ## Development Notes

### Current Status

- ✅ Core chat UI components implemented with mock data
- ✅ Component structure and styling complete
- ⏳ Login functionality (Pending)
- ⏳ Notification system (Pending)
- 🔄 State management stores need replacement/update

### To-Do Items

1. **Replace Mock Data**: Integrate with real backend/database
2. **Remove Firebase**: Delete `lib/firebase.js` once data layer is updated
3. **Complete Login**: Implement authentication in `Login.jsx`
4. **Notification System**: Finish `Notification.jsx` component
5. **Update Stores**: Replace userStore.js and chatStore.js with production implementation
6. **Add Error Handling**: Implement error boundaries and validation
7. **Optimize Performance**: Add code splitting and lazy loading -->

<!-- ## Available Scripts

```bash
npm start           # Run development server
npm build           # Build for production
npm test            # Run tests (if configured)
npm eject           # Eject from create-react-app (if used)
``` -->

## 🤝Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeatureName`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeatureName`)
6. Open a Pull Request

<!-- ## Future Roadmap

- [ ] Connect to real backend API
- [ ] Implement user authentication
- [ ] Add voice and video calling
- [ ] File sharing capabilities
- [ ] Message encryption
- [ ] Dark mode theme
- [ ] Mobile app (iOS/Android)
- [ ] Message reactions and emojis
- [ ] Channel/Community support
- [ ] Message search and filtering -->

<!-- ## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, open an issue on GitHub or contact the maintainers. -->

## 📱Acknowledgments

- Built with React and Vite for speed and efficiency
- Real-time capabilities powered by Firebase
- Inspired by popular chat applications
- Created by Mukul Sharnagat

---
<!-- 
**Last Updated**: October 2025  
**Status**: In Development -->
