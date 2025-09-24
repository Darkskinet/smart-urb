import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper';
import FaceScan from '../components/FaceScan';
import VoiceGreeting from '../components/VoiceGreeting';
import { users, currentUser } from '../mockData/users';

const StartScreen = ({ navigation }) => {
  const [scanCompleted, setScanCompleted] = useState(false);
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [detectedUser, setDetectedUser] = useState(null);

  const handleFaceScanComplete = () => {
    setScanCompleted(true);
    
    // Simulate face recognition - randomly select a user for demo
    const randomUser = users[Math.floor(Math.random() * users.length)];
    setDetectedUser(randomUser);
    
    Alert.alert(
      'Face Recognition Complete', 
      `Welcome ${randomUser.name}! Role detected: ${randomUser.role}`,
      [{ text: 'Continue', onPress: () => {} }]
    );
  };

  const handleGreetingComplete = () => {
    setGreetingPlayed(true);
  };

  const navigateToDashboard = () => {
    if (!detectedUser) {
      Alert.alert('Please complete face scan first');
      return;
    }
    
    if (detectedUser.role === 'employer') {
      navigation.navigate('EmployerDashboard', { user: detectedUser });
    } else {
      navigation.navigate('EmployeeDashboard', { user: detectedUser });
    }
  };

  const navigateToService = (service) => {
    if (!detectedUser) {
      Alert.alert('Please complete face scan first');
      return;
    }
    navigation.navigate(service, { user: detectedUser });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏙️ Smart City Hub</Text>
        <Text style={styles.subtitle}>Secure Access Portal</Text>
      </View>

      <Card style={styles.scanCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Identity Verification</Text>
          <FaceScan onScanComplete={handleFaceScanComplete} />
        </Card.Content>
      </Card>

      {scanCompleted && detectedUser && (
        <Card style={styles.greetingCard}>
          <Card.Content>
            <VoiceGreeting 
              user={detectedUser} 
              onGreetingComplete={handleGreetingComplete} 
            />
          </Card.Content>
        </Card>
      )}

      {detectedUser && (
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          
          <Button
            mode="contained"
            style={[styles.navButton, styles.primaryButton]}
            onPress={navigateToDashboard}
            icon="view-dashboard"
          >
            Go to {detectedUser.role === 'employer' ? 'Employer' : 'Employee'} Dashboard
          </Button>

          <View style={styles.serviceButtons}>
            <Button
              mode="outlined"
              style={styles.serviceButton}
              onPress={() => navigateToService('Bank')}
              icon="bank"
            >
              Banking
            </Button>
            
            <Button
              mode="outlined"
              style={styles.serviceButton}
              onPress={() => navigateToService('Stalls')}
              icon="store"
            >
              Marketplace
            </Button>
            
            <Button
              mode="outlined"
              style={styles.serviceButton}
              onPress={() => navigateToService('Donation')}
              icon="heart"
            >
              Donations
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  scanCard: {
    marginBottom: 20,
    elevation: 4,
  },
  greetingCard: {
    marginBottom: 20,
    elevation: 4,
  },
  navigationSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  navButton: {
    marginVertical: 10,
    paddingVertical: 5,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  serviceButtons: {
    marginTop: 20,
  },
  serviceButton: {
    marginVertical: 5,
    borderColor: '#2196F3',
  },
});

export default StartScreen;