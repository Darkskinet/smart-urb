import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';

// Import screens
import StartScreen from './screens/StartScreen';
import EmployerDashboard from './screens/EmployerDashboard';
import EmployeeDashboard from './screens/EmployeeDashboard';
import BankScreen from './screens/BankScreen';
import StallScreen from './screens/StallScreen';
import DonationScreen from './screens/DonationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Start" 
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="EmployerDashboard" 
            component={EmployerDashboard}
            options={{ title: 'Employer Dashboard' }}
          />
          <Stack.Screen 
            name="EmployeeDashboard" 
            component={EmployeeDashboard}
            options={{ title: 'Employee Dashboard' }}
          />
          <Stack.Screen 
            name="Bank" 
            component={BankScreen}
            options={{ title: 'Banking Services' }}
          />
          <Stack.Screen 
            name="Stalls" 
            component={StallScreen}
            options={{ title: 'Marketplace' }}
          />
          <Stack.Screen 
            name="Donation" 
            component={DonationScreen}
            options={{ title: 'Donations' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}