import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, DataTable, Chip, ProgressBar } from 'react-native-paper';
import { transactions } from '../mockData/transactions';

const EmployeeDashboard = ({ route, navigation }) => {
  const { user } = route.params;
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    // Load user's transactions
    const filteredTransactions = transactions
      .filter(t => t.userId === user.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10); // Show last 10 transactions
    
    setUserTransactions(filteredTransactions);
  }, []);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'salary': return '💰';
      case 'purchase': return '🛒';
      case 'reward': return '🎁';
      case 'penalty': return '⚠️';
      case 'donation': return '❤️';
      default: return '💳';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'salary': return '#4CAF50';
      case 'purchase': return '#FF5722';
      case 'reward': return '#2196F3';
      case 'penalty': return '#F44336';
      case 'donation': return '#9C27B0';
      default: return '#666';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 95) return '#4CAF50';
    if (attendance >= 85) return '#FF9800';
    return '#F44336';
  };

  const getBlackPointsColor = (points) => {
    if (points <= 3) return '#4CAF50';
    if (points <= 7) return '#FF9800';
    return '#F44336';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Card */}
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Text style={styles.welcomeText}>Hello, {user.name}</Text>
          <Text style={styles.roleText}>Employee Dashboard</Text>
          <View style={styles.balanceContainer}>
            <Chip style={styles.balanceChip} icon="wallet">
              Balance: {user.balance} credits
            </Chip>
            <Text style={styles.balanceNote}>Available for spending</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Current Job Info */}
      <Card style={styles.jobCard}>
        <Card.Title title="Current Assignment" subtitle="Your work details" />
        <Card.Content>
          <View style={styles.jobInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Position:</Text>
              <Text style={styles.infoValue}>{user.currentJob}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Shift:</Text>
              <Text style={styles.infoValue}>{user.shift}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Attendance:</Text>
              <View style={styles.attendanceInfo}>
                <Chip 
                  style={[styles.attendanceChip, { backgroundColor: getAttendanceColor(user.attendance) }]}
                  textStyle={{ color: 'white' }}
                >
                  {user.attendance}%
                </Chip>
                <ProgressBar 
                  progress={user.attendance / 100} 
                  color={getAttendanceColor(user.attendance)}
                  style={styles.progressBar}
                />
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Black Points:</Text>
              <Chip 
                style={[styles.blackPointsChip, { backgroundColor: getBlackPointsColor(user.blackPoints) }]}
                textStyle={{ color: 'white' }}
              >
                {user.blackPoints} points
              </Chip>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Transaction History */}
      <Card style={styles.transactionCard}>
        <Card.Title title="Recent Transactions" subtitle="Your transaction history" />
        <Card.Content>
          {userTransactions.length > 0 ? (
            <View>
              {userTransactions.map((transaction, index) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View style={styles.transactionHeader}>
                    <Text style={styles.transactionIcon}>
                      {getTransactionIcon(transaction.type)}
                    </Text>
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionDescription}>
                        {transaction.description}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {formatDate(transaction.date)}
                      </Text>
                    </View>
                    <Text 
                      style={[
                        styles.transactionAmount,
                        { color: transaction.amount > 0 ? '#4CAF50' : '#F44336' }
                      ]}
                    >
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noTransactions}>No transactions found</Text>
          )}
        </Card.Content>
      </Card>

      {/* Performance Summary */}
      <Card style={styles.performanceCard}>
        <Card.Title title="Performance Summary" subtitle="Your work metrics" />
        <Card.Content>
          <View style={styles.performanceGrid}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>{user.attendance}%</Text>
              <Text style={styles.performanceLabel}>Attendance</Text>
              <ProgressBar 
                progress={user.attendance / 100} 
                color={getAttendanceColor(user.attendance)}
                style={styles.smallProgressBar}
              />
            </View>
            
            <View style={styles.performanceItem}>
              <Text style={[styles.performanceValue, { color: getBlackPointsColor(user.blackPoints) }]}>
                {user.blackPoints}
              </Text>
              <Text style={styles.performanceLabel}>Black Points</Text>
              <Text style={styles.performanceNote}>
                {user.blackPoints <= 3 ? 'Good' : user.blackPoints <= 7 ? 'Warning' : 'Critical'}
              </Text>
            </View>
            
            <View style={styles.performanceItem}>
              <Text style={styles.performanceValue}>{user.balance}</Text>
              <Text style={styles.performanceLabel}>Credits</Text>
              <Text style={styles.performanceNote}>Available</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Bank', { user })}
          style={styles.navButton}
          icon="bank"
        >
          Banking Services
        </Button>
        
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Stalls', { user })}
          style={styles.navButton}
          icon="store"
        >
          Marketplace
        </Button>
        
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Donation', { user })}
          style={styles.navButton}
          icon="heart"
        >
          Make Donation
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 16,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  roleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  balanceContainer: {
    alignItems: 'flex-start',
  },
  balanceChip: {
    backgroundColor: '#E8F5E8',
    marginBottom: 5,
  },
  balanceNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  jobCard: {
    marginBottom: 16,
    elevation: 4,
  },
  jobInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  attendanceInfo: {
    flex: 2,
    alignItems: 'flex-end',
  },
  attendanceChip: {
    marginBottom: 5,
  },
  progressBar: {
    width: 80,
    height: 4,
  },
  blackPointsChip: {
    flex: 2,
    alignSelf: 'flex-end',
  },
  transactionCard: {
    marginBottom: 16,
    elevation: 4,
  },
  transactionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noTransactions: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
  performanceCard: {
    marginBottom: 16,
    elevation: 4,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  performanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  performanceLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  performanceNote: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  smallProgressBar: {
    width: 60,
    height: 3,
    marginTop: 5,
  },
  navButtons: {
    gap: 12,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#2196F3',
  },
});

export default EmployeeDashboard;