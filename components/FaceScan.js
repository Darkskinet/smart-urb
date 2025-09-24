import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const FaceScan = ({ onScanComplete }) => {
  const [scanProgress] = useState(new Animated.Value(0));
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    
    // Animate the scan progress
    Animated.timing(scanProgress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      setIsScanning(false);
      setScanComplete(true);
      setTimeout(() => {
        onScanComplete && onScanComplete();
      }, 500);
    });
  };

  const resetScan = () => {
    setScanComplete(false);
    scanProgress.setValue(0);
  };

  useEffect(() => {
    return () => {
      scanProgress.setValue(0);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.scanArea}>
        <Text style={styles.faceIcon}>👤</Text>
        
        {isScanning && (
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [{
                  translateY: scanProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 100],
                  })
                }]
              }
            ]}
          />
        )}
        
        {scanComplete && (
          <View style={styles.successOverlay}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successText}>Scan Complete</Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.scanButton, 
          scanComplete && styles.scanButtonSuccess
        ]} 
        onPress={scanComplete ? resetScan : startScan}
        disabled={isScanning}
      >
        <Text style={styles.scanButtonText}>
          {isScanning ? 'Scanning...' : scanComplete ? 'Scan Again' : 'Start Face Scan'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scanArea: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    position: 'relative',
  },
  faceIcon: {
    fontSize: 80,
    color: '#666',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  successOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    fontSize: 50,
  },
  successText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 10,
  },
  scanButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  scanButtonSuccess: {
    backgroundColor: '#4CAF50',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FaceScan;