import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';

const VoiceGreeting = ({ user, onGreetingComplete }) => {
  const greetings = {
    employer: `Welcome back, ${user?.name}. You have new employee updates waiting for your review.`,
    employee: `Hello ${user?.name}. Your current balance is ${user?.balance} credits. Have a productive day!`
  };

  const speakGreeting = () => {
    const greeting = greetings[user?.role] || 'Welcome to Smart City App';
    
    Speech.speak(greeting, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
      onDone: () => {
        onGreetingComplete && onGreetingComplete();
      }
    });
  };

  useEffect(() => {
    // Auto-play greeting after component mounts
    const timer = setTimeout(() => {
      speakGreeting();
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  const stopSpeaking = () => {
    Speech.stop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingIcon}>🔊</Text>
      <Text style={styles.greetingText}>
        {greetings[user?.role] || 'Welcome to Smart City App'}
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.speakButton} onPress={speakGreeting}>
          <Text style={styles.buttonText}>🔊 Play Greeting</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.stopButton} onPress={stopSpeaking}>
          <Text style={styles.buttonText}>⏹️ Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    margin: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  greetingIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1976D2',
    marginBottom: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  speakButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  stopButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default VoiceGreeting;