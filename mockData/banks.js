export const banks = [
  {
    id: 1,
    name: 'Smart City Bank',
    logo: '🏦',
    schemes: [
      {
        id: 1,
        name: 'Smart Saver',
        type: 'Savings',
        interest: '4.5%',
        minBalance: 1000,
        description: 'High interest savings account for smart city residents'
      },
      {
        id: 2,
        name: 'Quick Loan',
        type: 'Personal Loan',
        interest: '8.9%',
        maxAmount: 50000,
        description: 'Quick personal loans with minimal documentation'
      }
    ]
  },
  {
    id: 2,
    name: 'Digital First Bank',
    logo: '💳',
    schemes: [
      {
        id: 3,
        name: 'Tech Professional Account',
        type: 'Checking',
        interest: '2.1%',
        minBalance: 500,
        description: 'Specialized account for tech professionals'
      },
      {
        id: 4,
        name: 'Home Loan Express',
        type: 'Home Loan',
        interest: '7.2%',
        maxAmount: 500000,
        description: 'Fast approval home loans for smart city projects'
      }
    ]
  },
  {
    id: 3,
    name: 'Green Finance Bank',
    logo: '🌱',
    schemes: [
      {
        id: 5,
        name: 'Eco Savings',
        type: 'Savings',
        interest: '5.2%',
        minBalance: 2000,
        description: 'Environment-friendly investment options'
      },
      {
        id: 6,
        name: 'Solar Loan',
        type: 'Green Loan',
        interest: '6.5%',
        maxAmount: 100000,
        description: 'Special loans for solar and renewable energy projects'
      }
    ]
  }
];

export const loanApplications = [
  {
    id: 1,
    userId: 2,
    bankId: 1,
    schemeId: 2,
    amount: 15000,
    status: 'pending',
    applicationDate: '2024-01-15',
    interestRate: 8.9
  },
  {
    id: 2,
    userId: 4,
    bankId: 2,
    schemeId: 4,
    amount: 250000,
    status: 'approved',
    applicationDate: '2024-01-10',
    interestRate: 7.2
  }
];