export const transactions = [
  {
    id: 1,
    userId: 2,
    type: 'purchase',
    amount: -45,
    description: 'Smart Sandwich - Smart Café',
    date: '2024-01-20T14:30:00Z',
    balance: 1205,
    stallId: 3,
    itemId: 8
  },
  {
    id: 2,
    userId: 2,
    type: 'salary',
    amount: 1500,
    description: 'Monthly Salary Payment',
    date: '2024-01-20T09:00:00Z',
    balance: 1250,
    source: 'employer'
  },
  {
    id: 3,
    userId: 2,
    type: 'purchase',
    amount: -25,
    description: 'AI Brewed Coffee - Smart Café',
    date: '2024-01-19T10:15:00Z',
    balance: 1275,
    stallId: 3,
    itemId: 7
  },
  {
    id: 4,
    userId: 2,
    type: 'purchase',
    amount: -80,
    description: 'Movie Ticket - Regular - Smart Cinema',
    date: '2024-01-18T19:30:00Z',
    balance: 1300,
    stallId: 2,
    itemId: 4
  },
  {
    id: 5,
    userId: 2,
    type: 'reward',
    amount: 200,
    description: 'Performance Bonus',
    date: '2024-01-18T12:00:00Z',
    balance: 1380,
    source: 'employer'
  },
  {
    id: 6,
    userId: 3,
    type: 'purchase',
    amount: -149,
    description: 'Wireless Earbuds - Tech Accessories',
    date: '2024-01-20T16:45:00Z',
    balance: 741,
    stallId: 5,
    itemId: 14
  },
  {
    id: 7,
    userId: 3,
    type: 'salary',
    amount: 1200,
    description: 'Monthly Salary Payment',
    date: '2024-01-20T09:00:00Z',
    balance: 890,
    source: 'employer'
  },
  {
    id: 8,
    userId: 4,
    type: 'donation',
    amount: -100,
    description: 'Donation to City Green Initiative',
    date: '2024-01-19T14:20:00Z',
    balance: 1320,
    donationId: 1
  },
  {
    id: 9,
    userId: 4,
    type: 'salary',
    amount: 1800,
    description: 'Monthly Salary Payment',
    date: '2024-01-20T09:00:00Z',
    balance: 1420,
    source: 'employer'
  },
  {
    id: 10,
    userId: 5,
    type: 'penalty',
    amount: -50,
    description: 'Black Points Penalty',
    date: '2024-01-19T11:00:00Z',
    balance: 720,
    source: 'system'
  }
];

export const donationCauses = [
  {
    id: 1,
    name: 'City Green Initiative',
    description: 'Plant more trees and create green spaces in the city',
    target: 50000,
    raised: 23500,
    icon: '🌳',
    category: 'Environment'
  },
  {
    id: 2,
    name: 'Smart Education Fund',
    description: 'Provide digital learning resources to underprivileged students',
    target: 75000,
    raised: 42000,
    icon: '📚',
    category: 'Education'
  },
  {
    id: 3,
    name: 'Clean Water Project',
    description: 'Install smart water purification systems in communities',
    target: 100000,
    raised: 67500,
    icon: '💧',
    category: 'Health'
  },
  {
    id: 4,
    name: 'Senior Care Tech',
    description: 'Provide smart health monitoring devices for elderly care',
    target: 30000,
    raised: 18750,
    icon: '👴',
    category: 'Healthcare'
  }
];