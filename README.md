# Smart City App

A React Native + Expo application for smart city data and transaction management.

## Features

🔐 **Secure Access**
- Face scan authentication (placeholder implementation)
- Voice greeting with Text-to-Speech
- Role-based access (employer/employee)

👥 **Role Management**
- **Employer Dashboard**: View team, mark attendance, reward employees, assign penalties
- **Employee Dashboard**: View balance, job details, attendance, transaction history

🏦 **Banking Module**
- Multiple bank options with various schemes
- Dynamic interest rates based on user profile
- Loan applications with real-time processing
- No cash handling - fully digital

🛍️ **Marketplace (Stalls)**
- Entertainment: VR Gaming, Smart Cinema
- Food: Smart Café, Robo Restaurant
- Accessories: Tech gadgets, Smart wear
- Digital transactions with instant balance updates
- Shopping cart functionality

❤️ **Donation Portal**
- Multiple causes: Environment, Education, Health, Healthcare
- Progress tracking for each cause
- Impact visualization
- Quick donation options

## Project Structure

```
smart-city-app/
├── App.js                 # Main app entry point
├── screens/               # All screen components
│   ├── StartScreen.js     # Login/authentication screen
│   ├── EmployerDashboard.js
│   ├── EmployeeDashboard.js
│   ├── BankScreen.js
│   ├── StallScreen.js
│   └── DonationScreen.js
├── components/            # Reusable components
│   ├── FaceScan.js       # Face scanning component
│   └── VoiceGreeting.js  # Voice greeting with TTS
├── mockData/             # Mock data for demonstration
│   ├── users.js          # User profiles and roles
│   ├── banks.js          # Bank schemes and applications
│   ├── stalls.js         # Marketplace stalls and items
│   └── transactions.js   # Transaction history and donations
└── navigation/           # Navigation configuration
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

### Installation Steps

1. **Clone/Download the project:**
   ```bash
   git clone <repository-url>
   cd smart-city-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/emulator:**
   - **Mobile Device**: Scan the QR code with Expo Go app
   - **Android Emulator**: Press 'a' in the terminal
   - **iOS Simulator**: Press 'i' in the terminal (macOS only)
   - **Web Browser**: Press 'w' in the terminal

## Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

## Demo Users

The app includes mock users for testing different roles:

### Employer (ID: 1)
- **Name**: John Manager
- **Email**: john.manager@company.com
- **Balance**: 5000 credits
- **Features**: Can view employees, mark attendance, send rewards, assign penalties

### Employees (IDs: 2-5)
- **Alice Smith** (Software Developer) - 1250 credits
- **Bob Johnson** (UI Designer) - 890 credits  
- **Carol Williams** (Data Analyst) - 1420 credits
- **David Brown** (Junior Developer) - 670 credits

## Key Features Demo

### Face Scan Authentication
- Simulated face recognition with visual scanning animation
- Random user assignment for demo purposes
- Role detection and redirection

### Voice Greetings
- Text-to-Speech welcome messages
- Personalized greetings based on user role
- Balance announcements for employees

### Banking System
- Dynamic interest rates based on:
  - User's black points (penalties)
  - Account balance
  - Credit score
- Real-time loan applications
- Multiple bank partnerships

### Marketplace Transactions
- Real-time balance updates
- Shopping cart functionality
- Category-based browsing
- Transaction history tracking

### Donation System
- Progress tracking for causes
- Impact visualization
- Community statistics
- Goal completion tracking

## Technical Implementation

### Navigation
- React Navigation v6 with stack navigator
- Screen-based routing with parameter passing

### State Management
- Local state with React hooks
- Mock data simulation for backend operations

### UI Components
- React Native Paper for Material Design
- Custom components for specialized features
- Responsive design for various screen sizes

### Text-to-Speech
- Expo Speech API integration
- Customizable voice parameters

## Future Enhancements

- Real backend integration
- Actual facial recognition API
- Push notifications
- Analytics dashboard
- Multi-language support
- Offline data synchronization

## Troubleshooting

### Common Issues

1. **Expo CLI not found**
   ```bash
   npm install -g expo-cli
   ```

2. **Metro bundler issues**
   ```bash
   expo start --clear
   ```

3. **Device not connecting**
   - Ensure both device and computer are on same network
   - Try restarting the Expo development server

4. **Build errors**
   ```bash
   rm -rf node_modules
   npm install
   expo start --clear
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes. Please check with the repository owner for usage rights.

---

**Built with ❤️ using React Native + Expo**