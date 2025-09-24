import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Button, DataTable, Chip, TextInput } from 'react-native-paper';
import { users } from '../mockData/users';

const EmployerDashboard = ({ route, navigation }) => {
  const { user } = route.params;
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [rewardAmount, setRewardAmount] = useState('');
  const [blackPoints, setBlackPoints] = useState('');

  useEffect(() => {
    // Load employees under this employer
    const employeeList = users.filter(u => u.role === 'employee' && user.employees?.includes(u.id));
    setEmployees(employeeList);
  }, []);

  const markAttendance = (employeeId, present) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, lastAttendance: present ? 'Present' : 'Absent', attendanceUpdated: true }
        : emp
    ));
    
    Alert.alert(
      'Attendance Updated', 
      `Employee marked as ${present ? 'Present' : 'Absent'}`,
      [{ text: 'OK' }]
    );
  };

  const rewardEmployee = () => {
    if (!selectedEmployee || !rewardAmount) {
      Alert.alert('Error', 'Please select an employee and enter reward amount');
      return;
    }

    const amount = parseInt(rewardAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee.id 
        ? { ...emp, balance: emp.balance + amount }
        : emp
    ));

    Alert.alert(
      'Reward Sent', 
      `${amount} credits sent to ${selectedEmployee.name}`,
      [{ text: 'OK', onPress: () => { setRewardAmount(''); setSelectedEmployee(null); } }]
    );
  };

  const assignBlackPoints = () => {
    if (!selectedEmployee || !blackPoints) {
      Alert.alert('Error', 'Please select an employee and enter black points');
      return;
    }

    const points = parseInt(blackPoints);
    if (isNaN(points) || points <= 0) {
      Alert.alert('Error', 'Please enter valid black points');
      return;
    }

    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee.id 
        ? { ...emp, blackPoints: emp.blackPoints + points }
        : emp
    ));

    Alert.alert(
      'Black Points Assigned', 
      `${points} black points assigned to ${selectedEmployee.name}`,
      [{ text: 'OK', onPress: () => { setBlackPoints(''); setSelectedEmployee(null); } }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Text style={styles.welcomeText}>Welcome, {user.name}</Text>
          <Text style={styles.roleText}>Employer Dashboard</Text>
          <Chip style={styles.balanceChip} icon="wallet">
            Balance: {user.balance} credits
          </Chip>
        </Card.Content>
      </Card>

      <Card style={styles.employeeCard}>
        <Card.Title title="Team Overview" subtitle="Manage your employees" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Attendance</DataTable.Title>
              <DataTable.Title>Black Points</DataTable.Title>
              <DataTable.Title>Actions</DataTable.Title>
            </DataTable.Header>

            {employees.map((employee, index) => (
              <DataTable.Row key={employee.id}>
                <DataTable.Cell style={styles.nameCell}>
                  <Text style={styles.employeeName}>{employee.name}</Text>
                  <Text style={styles.employeeJob}>{employee.currentJob}</Text>
                </DataTable.Cell>
                
                <DataTable.Cell>
                  <Chip 
                    style={[
                      styles.attendanceChip,
                      employee.lastAttendance === 'Present' && styles.presentChip,
                      employee.lastAttendance === 'Absent' && styles.absentChip
                    ]}
                  >
                    {employee.lastAttendance || `${employee.attendance}%`}
                  </Chip>
                </DataTable.Cell>
                
                <DataTable.Cell>
                  <Chip 
                    style={[
                      styles.blackPointsChip,
                      employee.blackPoints > 5 && styles.highBlackPoints
                    ]}
                  >
                    {employee.blackPoints}
                  </Chip>
                </DataTable.Cell>
                
                <DataTable.Cell>
                  <View style={styles.actionButtons}>
                    <Button 
                      mode="contained" 
                      style={styles.presentButton}
                      onPress={() => markAttendance(employee.id, true)}
                    >
                      ✓
                    </Button>
                    <Button 
                      mode="contained" 
                      style={styles.absentButton}
                      onPress={() => markAttendance(employee.id, false)}
                    >
                      ✗
                    </Button>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.actionCard}>
        <Card.Title title="Employee Actions" subtitle="Reward or penalize employees" />
        <Card.Content>
          <View style={styles.employeeSelector}>
            <Text style={styles.selectorLabel}>Select Employee:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.employeeChips}>
              {employees.map(emp => (
                <Chip
                  key={emp.id}
                  selected={selectedEmployee?.id === emp.id}
                  onPress={() => setSelectedEmployee(emp)}
                  style={styles.employeeChip}
                >
                  {emp.name}
                </Chip>
              ))}
            </ScrollView>
          </View>

          <View style={styles.actionSection}>
            <Text style={styles.actionTitle}>💰 Reward Employee</Text>
            <TextInput
              label="Reward Amount (credits)"
              value={rewardAmount}
              onChangeText={setRewardAmount}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button mode="contained" onPress={rewardEmployee} style={styles.rewardButton}>
              Send Reward
            </Button>
          </View>

          <View style={styles.actionSection}>
            <Text style={styles.actionTitle}>⚠️ Assign Black Points</Text>
            <TextInput
              label="Black Points"
              value={blackPoints}
              onChangeText={setBlackPoints}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button mode="contained" onPress={assignBlackPoints} style={styles.blackPointButton}>
              Assign Points
            </Button>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.navButtons}>
        <Button mode="outlined" onPress={() => navigation.navigate('Bank', { user })}>
          Banking Services
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('Stalls', { user })}>
          Marketplace
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('Donation', { user })}>
          Donations
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
  balanceChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E8',
  },
  employeeCard: {
    marginBottom: 16,
    elevation: 4,
  },
  nameCell: {
    flex: 2,
  },
  employeeName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  employeeJob: {
    fontSize: 12,
    color: '#666',
  },
  attendanceChip: {
    backgroundColor: '#E3F2FD',
  },
  presentChip: {
    backgroundColor: '#E8F5E8',
  },
  absentChip: {
    backgroundColor: '#FFEBEE',
  },
  blackPointsChip: {
    backgroundColor: '#FFF3E0',
  },
  highBlackPoints: {
    backgroundColor: '#FFEBEE',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 5,
  },
  presentButton: {
    backgroundColor: '#4CAF50',
    minWidth: 35,
  },
  absentButton: {
    backgroundColor: '#F44336',
    minWidth: 35,
  },
  actionCard: {
    marginBottom: 16,
    elevation: 4,
  },
  employeeSelector: {
    marginBottom: 20,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  employeeChips: {
    flexDirection: 'row',
  },
  employeeChip: {
    marginRight: 8,
  },
  actionSection: {
    marginBottom: 20,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  rewardButton: {
    backgroundColor: '#4CAF50',
  },
  blackPointButton: {
    backgroundColor: '#FF5722',
  },
  navButtons: {
    gap: 10,
    marginBottom: 20,
  },
});

export default EmployerDashboard;