import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Button, TextInput, Chip, ProgressBar } from 'react-native-paper';
import { donationCauses } from '../mockData/transactions';

const DonationScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [selectedCause, setSelectedCause] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [userBalance, setUserBalance] = useState(user.balance);
  const [causes, setCauses] = useState(donationCauses);

  const makeDonation = () => {
    if (!selectedCause) {
      Alert.alert('Error', 'Please select a cause to donate to');
      return;
    }

    if (!donationAmount || isNaN(donationAmount) || parseInt(donationAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid donation amount');
      return;
    }

    const amount = parseInt(donationAmount);

    if (amount > userBalance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough credits for this donation');
      return;
    }

    Alert.alert(
      'Confirm Donation',
      `Donate ${amount} credits to ${selectedCause.name}?\n\nYour remaining balance will be ${userBalance - amount} credits.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Donate',
          onPress: () => {
            // Update user balance
            setUserBalance(prev => prev - amount);

            // Update cause raised amount
            setCauses(prev => prev.map(cause =>
              cause.id === selectedCause.id
                ? { ...cause, raised: cause.raised + amount }
                : cause
            ));

            // Create transaction record (in real app, this would be saved to backend)
            console.log(`Donation transaction: ${amount} credits to ${selectedCause.name}`);

            Alert.alert(
              'Thank You!',
              `Your donation of ${amount} credits to ${selectedCause.name} has been successful.\n\nYou're making a difference in the community!`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setDonationAmount('');
                    setSelectedCause(null);
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const getProgressPercentage = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Environment': return '#4CAF50';
      case 'Education': return '#2196F3';
      case 'Health': return '#FF5722';
      case 'Healthcare': return '#9C27B0';
      default: return '#666';
    }
  };

  const suggestDonationAmount = (percentage) => {
    const amount = Math.floor(userBalance * percentage);
    setDonationAmount(amount.toString());
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Balance Card */}
      <Card style={styles.balanceCard}>
        <Card.Content>
          <View style={styles.balanceHeader}>
            <Text style={styles.welcomeText}>Make a Difference, {user.name}</Text>
            <Chip style={styles.balanceChip} icon="wallet">
              {userBalance} credits
            </Chip>
          </View>
          <Text style={styles.balanceSubtext}>
            Every donation helps build a better smart city for everyone
          </Text>
        </Card.Content>
      </Card>

      {/* Donation Causes */}
      <View style={styles.causesSection}>
        <Text style={styles.sectionTitle}>Choose a Cause</Text>
        
        {causes.map(cause => {
          const progressPercentage = getProgressPercentage(cause.raised, cause.target);
          const isSelected = selectedCause?.id === cause.id;
          
          return (
            <Card 
              key={cause.id} 
              style={[
                styles.causeCard,
                isSelected && styles.selectedCauseCard
              ]}
              onPress={() => setSelectedCause(cause)}
            >
              <Card.Content>
                <View style={styles.causeHeader}>
                  <View style={styles.causeTitle}>
                    <Text style={styles.causeIcon}>{cause.icon}</Text>
                    <View style={styles.causeTitleText}>
                      <Text style={styles.causeName}>{cause.name}</Text>
                      <Chip 
                        style={[
                          styles.categoryChip, 
                          { backgroundColor: getCategoryColor(cause.category) }
                        ]}
                        textStyle={{ color: 'white' }}
                      >
                        {cause.category}
                      </Chip>
                    </View>
                  </View>
                </View>

                <Text style={styles.causeDescription}>{cause.description}</Text>

                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressText}>
                      {cause.raised.toLocaleString()} / {cause.target.toLocaleString()} credits
                    </Text>
                    <Text style={styles.progressPercentage}>
                      {progressPercentage.toFixed(1)}%
                    </Text>
                  </View>
                  
                  <ProgressBar
                    progress={progressPercentage / 100}
                    color={getCategoryColor(cause.category)}
                    style={styles.progressBar}
                  />
                  
                  <Text style={styles.progressRemaining}>
                    {(cause.target - cause.raised).toLocaleString()} credits remaining
                  </Text>
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </View>

      {/* Donation Form */}
      {selectedCause && (
        <Card style={styles.donationForm}>
          <Card.Title 
            title={`Donate to ${selectedCause.name}`}
            subtitle="Enter your donation amount"
          />
          <Card.Content>
            <TextInput
              label="Donation Amount (credits)"
              value={donationAmount}
              onChangeText={setDonationAmount}
              keyboardType="numeric"
              style={styles.amountInput}
              right={<TextInput.Icon icon="currency-usd" />}
            />

            {/* Quick Donation Buttons */}
            <View style={styles.quickDonationSection}>
              <Text style={styles.quickDonationTitle}>Quick Amounts:</Text>
              <View style={styles.quickDonationButtons}>
                <Button
                  mode="outlined"
                  onPress={() => suggestDonationAmount(0.01)}
                  style={styles.quickButton}
                >
                  1% ({Math.floor(userBalance * 0.01)})
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => suggestDonationAmount(0.05)}
                  style={styles.quickButton}
                >
                  5% ({Math.floor(userBalance * 0.05)})
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => suggestDonationAmount(0.1)}
                  style={styles.quickButton}
                >
                  10% ({Math.floor(userBalance * 0.1)})
                </Button>
              </View>
            </View>

            {/* Donation Impact */}
            {donationAmount && !isNaN(donationAmount) && parseInt(donationAmount) > 0 && (
              <View style={styles.impactSection}>
                <Text style={styles.impactTitle}>Your Impact:</Text>
                <Text style={styles.impactText}>
                  Your donation of {donationAmount} credits will help fund {selectedCause.name} 
                  and bring the total raised to {(selectedCause.raised + parseInt(donationAmount)).toLocaleString()} credits
                  ({((selectedCause.raised + parseInt(donationAmount)) / selectedCause.target * 100).toFixed(1)}% of target).
                </Text>
                {parseInt(donationAmount) >= (selectedCause.target - selectedCause.raised) && (
                  <Text style={styles.goalReachedText}>
                    🎉 Your donation will help this cause reach its goal!
                  </Text>
                )}
              </View>
            )}

            <Button
              mode="contained"
              onPress={makeDonation}
              style={styles.donateButton}
              icon="heart"
              disabled={!donationAmount || parseInt(donationAmount) <= 0 || parseInt(donationAmount) > userBalance}
            >
              Donate {donationAmount || '0'} Credits
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* Impact Statistics */}
      <Card style={styles.statsCard}>
        <Card.Title title="Community Impact" subtitle="See the difference donations make" />
        <Card.Content>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {causes.reduce((total, cause) => total + cause.raised, 0).toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Total Raised</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{causes.length}</Text>
              <Text style={styles.statLabel}>Active Causes</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {causes.filter(cause => (cause.raised / cause.target) >= 1).length}
              </Text>
              <Text style={styles.statLabel}>Goals Reached</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  balanceCard: {
    marginBottom: 20,
    elevation: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceChip: {
    backgroundColor: '#E8F5E8',
  },
  balanceSubtext: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  causesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  causeCard: {
    marginBottom: 15,
    elevation: 4,
  },
  selectedCauseCard: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  causeHeader: {
    marginBottom: 15,
  },
  causeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  causeIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  causeTitleText: {
    flex: 1,
  },
  causeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoryChip: {
    alignSelf: 'flex-start',
  },
  causeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  progressSection: {
    marginTop: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  progressRemaining: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  donationForm: {
    marginBottom: 20,
    elevation: 4,
  },
  amountInput: {
    marginBottom: 20,
  },
  quickDonationSection: {
    marginBottom: 20,
  },
  quickDonationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  quickDonationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickButton: {
    flex: 1,
    marginHorizontal: 3,
  },
  impactSection: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  impactText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  goalReachedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
    textAlign: 'center',
  },
  donateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
  },
  statsCard: {
    marginBottom: 20,
    elevation: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  bottomSpace: {
    height: 20,
  },
});

export default DonationScreen;