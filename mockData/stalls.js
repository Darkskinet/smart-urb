export const stalls = [
  // Entertainment
  {
    id: 1,
    name: 'VR Gaming Zone',
    category: 'entertainment',
    icon: '🎮',
    items: [
      { id: 1, name: 'VR Game Session (30 min)', price: 50, description: 'Immersive VR gaming experience' },
      { id: 2, name: 'VR Game Session (60 min)', price: 90, description: 'Extended VR gaming session' },
      { id: 3, name: 'Multiplayer VR Battle', price: 120, description: 'Team-based VR gaming' }
    ]
  },
  {
    id: 2,
    name: 'Smart Cinema',
    category: 'entertainment',
    icon: '🎬',
    items: [
      { id: 4, name: 'Movie Ticket - Regular', price: 80, description: '2D movie experience' },
      { id: 5, name: 'Movie Ticket - Premium', price: 150, description: '4D movie with effects' },
      { id: 6, name: 'Private Screening', price: 500, description: 'Private cinema room' }
    ]
  },
  // Food
  {
    id: 3,
    name: 'Smart Café',
    category: 'food',
    icon: '☕',
    items: [
      { id: 7, name: 'AI Brewed Coffee', price: 25, description: 'Coffee brewed by AI to perfection' },
      { id: 8, name: 'Smart Sandwich', price: 45, description: 'Customized sandwich based on health data' },
      { id: 9, name: 'Energy Smoothie', price: 35, description: 'Nutrient-rich smoothie for optimal energy' }
    ]
  },
  {
    id: 4,
    name: 'Robo Restaurant',
    category: 'food',
    icon: '🤖',
    items: [
      { id: 10, name: 'Robotic Special Meal', price: 120, description: 'Chef robot prepared meal' },
      { id: 11, name: 'Automated Sushi', price: 95, description: 'Precision-made sushi by robot' },
      { id: 12, name: 'AI Nutrition Bowl', price: 75, description: 'Personalized healthy bowl' }
    ]
  },
  // Accessories
  {
    id: 5,
    name: 'Tech Accessories',
    category: 'accessories',
    icon: '📱',
    items: [
      { id: 13, name: 'Smart Watch', price: 299, description: 'Latest smartwatch with health monitoring' },
      { id: 14, name: 'Wireless Earbuds', price: 149, description: 'Noise-cancelling earbuds' },
      { id: 15, name: 'Portable Charger', price: 59, description: 'High-capacity power bank' }
    ]
  },
  {
    id: 6,
    name: 'Smart Wear',
    category: 'accessories',
    icon: '👔',
    items: [
      { id: 16, name: 'Smart Shirt', price: 199, description: 'Temperature regulating smart fabric' },
      { id: 17, name: 'Digital Wallet', price: 79, description: 'RFID-blocking smart wallet' },
      { id: 18, name: 'Smart Glasses', price: 399, description: 'AR-enabled smart glasses' }
    ]
  }
];

export const categories = [
  { id: 'entertainment', name: 'Entertainment', icon: '🎭', color: '#FF6B6B' },
  { id: 'food', name: 'Food & Dining', icon: '🍽️', color: '#4ECDC4' },
  { id: 'accessories', name: 'Accessories', icon: '🛍️', color: '#45B7D1' }
];