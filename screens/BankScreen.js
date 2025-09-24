import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Button, TextInput, Chip, Divider } from 'react-native-paper';
import { banks, loanApplications } from '../mockData/banks';

const BankScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [loanAmount, setLoanAmount] = useState('');
  const [applications, setApplications] = useState(loanApplications);

  const calculateDynamicInterest = (baseRate, userProfile) => {
    let rate = parseFloat(baseRate);
    
    // Adjust based on user's black points (higher black points = higher interest)
    if (userProfile.blackPoints > 5) {
      rate += 1.5;
    } else if (userProfile.blackPoints > 2) {
      rate += 0.5;
    }
    
    // Adjust based on balance (higher balance = lower interest)
    if (userProfile.balance > 2000) {
      rate -= 0.5;
    } else if (userProfile.balance < 500) {
      rate += 0.8;
    }
    
    return Math.max(rate, 3.0).toFixed(1); // Minimum 3% interest
  };

  const applyForLoan = () => {
    if (!selectedBank || !selectedScheme || !loanAmount) {
      Alert.alert('Error', 'Please select a bank, scheme and enter loan amount');
      return;
    }

    const amount = parseInt(loanAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid loan amount');
      return;
    }

    if (selectedScheme.maxAmount && amount > selectedScheme.maxAmount) {
      Alert.alert('Error', `Maximum loan amount for this scheme is ${selectedScheme.maxAmount}`);
      return;
    }

    const dynamicRate = calculateDynamicInterest(selectedScheme.interest, user);
    
    const newApplication = {
      id: applications.length + 1,
      userId: user.id,
      bankId: selectedBank.id,
      schemeId: selectedScheme.id,
      amount: amount,
      status: 'pending',
      applicationDate: new Date().toISOString().split('T')[0],
      interestRate: parseFloat(dynamicRate)
    };

    setApplications(prev => [...prev, newApplication]);

    Alert.alert(
      'Loan Application Submitted',
      `Your loan application for ${amount} credits has been submitted to ${selectedBank.name}.\n\nDynamic Interest Rate: ${dynamicRate}%\n\nYou will be notified once reviewed.`,
      [{ 
        text: 'OK', 
        onPress: () => {
          setLoanAmount('');
          setSelectedBank(null);
          setSelectedScheme(null);
        }
      }]
    );
  };

  const getUserApplications = () => {
    return applications.filter(app => app.userId === user.id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#4CAF50';
      case 'rejected': return '#F44336';
      case 'pending': return '#FF9800';
      default: return '#666';
    }
  };

  const getBankByScheme = (schemeId) => {
    return banks.find(bank => bank.schemes.some(scheme => scheme.id === schemeId));
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Profile Card */}
      <Card style={styles.profileCard}>
        <Card.Content>
          <Text style={styles.welcomeText}>Banking Services for {user.name}</Text>
          <View style={styles.profileInfo}>
            <Chip style={styles.balanceChip} icon="wallet">
              Balance: {user.balance} credits
            </Chip>
            <Chip 
              style={[
                styles.creditScoreChip, 
                { backgroundColor: user.blackPoints <= 3 ? '#E8F5E8' : '#FFEBEE' }
              ]}
              icon="star"
            >
              Credit Score: {user.blackPoints <= 3 ? 'Good' : 'Fair'}
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Bank Selection */}
      <Card style={styles.bankCard}>
        <Card.Title title="Choose Your Bank" subtitle="Select from our partner banks" />
        <Card.Content>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {banks.map(bank => (
              <Card 
                key={bank.id} 
                style={[
                  styles.bankOption,
                  selectedBank?.id === bank.id && styles.selectedBankOption
                ]}
                onPress={() => setSelectedBank(bank)}
              >
                <Card.Content style={styles.bankContent}>
                  <Text style={styles.bankIcon}>{bank.logo}</Text>
                  <Text style={styles.bankName}>{bank.name}</Text>
                  <Text style={styles.schemeCount}>{bank.schemes.length} schemes</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>

      {/* Scheme Selection */}
      {selectedBank && (
        <Card style={styles.schemeCard}>
          <Card.Title title="Available Schemes" subtitle={`From ${selectedBank.name}`} />
          <Card.Content>
            {selectedBank.schemes.map(scheme => {
              const dynamicRate = calculateDynamicInterest(scheme.interest, user);
              return (
                <Card 
                  key={scheme.id}
                  style={[
                    styles.schemeOption,
                    selectedScheme?.id === scheme.id && styles.selectedSchemeOption
                  ]}
                  onPress={() => setSelectedScheme(scheme)}
                >
                  <Card.Content>
                    <View style={styles.schemeHeader}>
                      <Text style={styles.schemeName}>{scheme.name}</Text>
                      <Chip style={styles.schemeType}>{scheme.type}</Chip>
                    </View>
                    
                    <Text style={styles.schemeDescription}>{scheme.description}</Text>
                    
                    <View style={styles.schemeDetails}>
                      <View style={styles.schemeDetail}>
                        <Text style={styles.detailLabel}>Base Interest:</Text>
                        <Text style={styles.detailValue}>{scheme.interest}</Text>
                      </View>
                      <View style={styles.schemeDetail}>
                        <Text style={styles.detailLabel}>Your Rate:</Text>
                        <Text style={[styles.detailValue, styles.dynamicRate]}>{dynamicRate}%</Text>
                      </View>
                      {scheme.minBalance && (
                        <View style={styles.schemeDetail}>
                          <Text style={styles.detailLabel}>Min Balance:</Text>
                          <Text style={styles.detailValue}>{scheme.minBalance}</Text>
                        </View>
                      )}
                      {scheme.maxAmount && (
                        <View style={styles.schemeDetail}>
                          <Text style={styles.detailLabel}>Max Amount:</Text>
                          <Text style={styles.detailValue}>{scheme.maxAmount}</Text>
                        </View>
                      )}
                    </View>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Content>
        </Card>
      )}

      {/* Loan Application */}
      {selectedScheme && (
        <Card style={styles.applicationCard}>
          <Card.Title title="Apply for Loan" subtitle="Enter your loan details" />
          <Card.Content>
            <TextInput
              label="Loan Amount (credits)"
              value={loanAmount}
              onChangeText={setLoanAmount}
              keyboardType="numeric"
              style={styles.input}
            />
            
            <View style={styles.applicationSummary}>
              <Text style={styles.summaryTitle}>Application Summary:</Text>
              <Text style={styles.summaryItem}>Bank: {selectedBank.name}</Text>
              <Text style={styles.summaryItem}>Scheme: {selectedScheme.name}</Text>
              <Text style={styles.summaryItem}>
                Interest Rate: {calculateDynamicInterest(selectedScheme.interest, user)}%
              </Text>
              {loanAmount && (
                <Text style={styles.summaryItem}>
                  Monthly Payment: ~{Math.ceil((parseInt(loanAmount) * 1.1) / 12)} credits
                </Text>
              )}
            </View>
            
            <Button mode="contained" onPress={applyForLoan} style={styles.applyButton}>
              Submit Application
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* My Applications */}
      <Card style={styles.applicationsCard}>
        <Card.Title title="My Loan Applications" subtitle="Track your applications" />
        <Card.Content>
          {getUserApplications().length > 0 ? (
            getUserApplications().map(app => {
              const bank = getBankByScheme(app.schemeId);
              const scheme = bank?.schemes.find(s => s.id === app.schemeId);
              
              return (
                <View key={app.id} style={styles.applicationItem}>
                  <View style={styles.applicationHeader}>
                    <Text style={styles.applicationBank}>{bank?.name}</Text>
                    <Chip 
                      style={[styles.statusChip, { backgroundColor: getStatusColor(app.status) }]}
                      textStyle={{ color: 'white' }}
                    >
                      {app.status.toUpperCase()}
                    </Chip>
                  </View>
                  <Text style={styles.applicationScheme}>{scheme?.name}</Text>
                  <View style={styles.applicationDetails}>
                    <Text style={styles.applicationAmount}>Amount: {app.amount} credits</Text>
                    <Text style={styles.applicationRate}>Rate: {app.interestRate}%</Text>
                    <Text style={styles.applicationDate}>Applied: {app.applicationDate}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.noApplications}>No loan applications found</Text>
          )}
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
  profileCard: {
    marginBottom: 16,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    gap: 10,
  },
  balanceChip: {
    backgroundColor: '#E8F5E8',
  },
  creditScoreChip: {
    backgroundColor: '#E3F2FD',
  },
  bankCard: {
    marginBottom: 16,
    elevation: 4,
  },
  bankOption: {
    width: 120,
    marginRight: 10,
    elevation: 2,
  },
  selectedBankOption: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  bankContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  bankIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  bankName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  schemeCount: {
    fontSize: 12,
    color: '#666',
  },
  schemeCard: {
    marginBottom: 16,
    elevation: 4,
  },
  schemeOption: {
    marginBottom: 10,
    elevation: 2,
  },
  selectedSchemeOption: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  schemeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  schemeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  schemeType: {
    backgroundColor: '#E3F2FD',
  },
  schemeDescription: {
    color: '#666',
    marginBottom: 10,
  },
  schemeDetails: {
    gap: 5,
  },
  schemeDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: '#666',
  },
  detailValue: {
    fontWeight: 'bold',
  },
  dynamicRate: {
    color: '#4CAF50',
  },
  applicationCard: {
    marginBottom: 16,
    elevation: 4,
  },
  input: {
    marginBottom: 15,
  },
  applicationSummary: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
  },
  applicationsCard: {
    marginBottom: 16,
    elevation: 4,
  },
  applicationItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  applicationBank: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusChip: {
    minWidth: 80,
  },
  applicationScheme: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  applicationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applicationAmount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  applicationRate: {
    fontSize: 12,
    color: '#666',
  },
  applicationDate: {
    fontSize: 12,
    color: '#666',
  },
  noApplications: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
  bottomSpace: {
    height: 20,
  },
});

export default BankScreen;