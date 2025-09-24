export const users = [
  {
    id: 1,
    name: 'John Manager',
    role: 'employer',
    email: 'john.manager@company.com',
    balance: 5000,
    currentJob: 'Operations Manager',
    shift: 'Day Shift (9 AM - 6 PM)',
    employees: [2, 3, 4, 5]
  },
  {
    id: 2,
    name: 'Alice Smith',
    role: 'employee',
    email: 'alice.smith@company.com',
    balance: 1250,
    currentJob: 'Software Developer',
    shift: 'Day Shift (9 AM - 6 PM)',
    managerId: 1,
    attendance: 95,
    blackPoints: 2
  },
  {
    id: 3,
    name: 'Bob Johnson',
    role: 'employee',
    email: 'bob.johnson@company.com',
    balance: 890,
    currentJob: 'UI Designer',
    shift: 'Day Shift (9 AM - 6 PM)',
    managerId: 1,
    attendance: 88,
    blackPoints: 5
  },
  {
    id: 4,
    name: 'Carol Williams',
    role: 'employee',
    email: 'carol.williams@company.com',
    balance: 1420,
    currentJob: 'Data Analyst',
    shift: 'Evening Shift (2 PM - 11 PM)',
    managerId: 1,
    attendance: 92,
    blackPoints: 1
  },
  {
    id: 5,
    name: 'David Brown',
    role: 'employee',
    email: 'david.brown@company.com',
    balance: 670,
    currentJob: 'Junior Developer',
    shift: 'Night Shift (10 PM - 7 AM)',
    managerId: 1,
    attendance: 85,
    blackPoints: 8
  }
];

// Current logged in user - can be changed for testing
export const currentUser = users[0]; // Default to employer for testing