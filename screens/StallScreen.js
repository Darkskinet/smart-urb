import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Button, Chip, Searchbar, FAB } from 'react-native-paper';
import { stalls, categories } from '../mockData/stalls';
import { transactions } from '../mockData/transactions';

const StallScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userBalance, setUserBalance] = useState(user.balance);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filteredStalls = stalls.filter(stall => {
    const matchesCategory = selectedCategory === 'all' || stall.category === selectedCategory;
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stall.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const addToCart = (stall, item) => {
    const cartItem = {
      stallId: stall.id,
      stallName: stall.name,
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      quantity: 1
    };

    const existingItem = cart.find(c => c.stallId === stall.id && c.itemId === item.id);
    
    if (existingItem) {
      setCart(prev => prev.map(c => 
        c.stallId === stall.id && c.itemId === item.id 
          ? { ...c, quantity: c.quantity + 1 }
          : c
      ));
    } else {
      setCart(prev => [...prev, cartItem]);
    }

    Alert.alert('Added to Cart', `${item.name} added to your cart`);
  };

  const removeFromCart = (stallId, itemId) => {
    setCart(prev => prev.filter(c => !(c.stallId === stallId && c.itemId === itemId)));
  };

  const updateCartQuantity = (stallId, itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(stallId, itemId);
      return;
    }

    setCart(prev => prev.map(c => 
      c.stallId === stallId && c.itemId === itemId 
        ? { ...c, quantity: newQuantity }
        : c
    ));
  };

  const getTotalCartValue = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const purchaseItems = () => {
    const totalAmount = getTotalCartValue();

    if (totalAmount > userBalance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough credits for this purchase');
      return;
    }

    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart first');
      return;
    }

    Alert.alert(
      'Confirm Purchase',
      `Total: ${totalAmount} credits\nRemaining balance: ${userBalance - totalAmount} credits`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Purchase', 
          onPress: () => {
            // Update user balance
            setUserBalance(prev => prev - totalAmount);
            
            // Create transaction records
            cart.forEach(item => {
              console.log(`Transaction: ${item.itemName} - ${item.price * item.quantity} credits`);
            });

            // Clear cart
            setCart([]);
            setShowCart(false);

            Alert.alert(
              'Purchase Successful!', 
              `You've spent ${totalAmount} credits. Items will be delivered/available shortly.`,
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Balance Display */}
      <Card style={styles.balanceCard}>
        <Card.Content>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Chip style={styles.balanceChip} icon="wallet">
              {userBalance} credits
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Search Bar */}
      <Searchbar
        placeholder="Search stalls and items..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilter}>
        <Chip
          selected={selectedCategory === 'all'}
          onPress={() => setSelectedCategory('all')}
          style={styles.categoryChip}
        >
          All Categories
        </Chip>
        {categories.map(category => (
          <Chip
            key={category.id}
            selected={selectedCategory === category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={[styles.categoryChip, { backgroundColor: category.color + '20' }]}
          >
            {category.icon} {category.name}
          </Chip>
        ))}
      </ScrollView>

      {/* Cart Summary - Show only if cart has items */}
      {!showCart && cart.length > 0 && (
        <Card style={styles.cartSummaryCard}>
          <Card.Content>
            <View style={styles.cartSummary}>
              <Text style={styles.cartText}>
                {cart.length} item(s) in cart - Total: {getTotalCartValue()} credits
              </Text>
              <Button mode="contained" onPress={() => setShowCart(true)}>
                View Cart
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Cart View */}
      {showCart && (
        <Card style={styles.cartCard}>
          <Card.Title title="Shopping Cart" subtitle={`${cart.length} items`} />
          <Card.Content>
            <ScrollView style={styles.cartItems}>
              {cart.map((item, index) => (
                <View key={`${item.stallId}-${item.itemId}`} style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.itemName}</Text>
                    <Text style={styles.cartItemStall}>from {item.stallName}</Text>
                    <Text style={styles.cartItemPrice}>{item.price} credits each</Text>
                  </View>
                  <View style={styles.cartItemControls}>
                    <Button
                      mode="outlined"
                      onPress={() => updateCartQuantity(item.stallId, item.itemId, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Button
                      mode="outlined"
                      onPress={() => updateCartQuantity(item.stallId, item.itemId, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </View>
                </View>
              ))}
            </ScrollView>
            
            <View style={styles.cartTotal}>
              <Text style={styles.totalText}>Total: {getTotalCartValue()} credits</Text>
              <View style={styles.cartActions}>
                <Button mode="outlined" onPress={() => setShowCart(false)}>
                  Continue Shopping
                </Button>
                <Button mode="contained" onPress={purchaseItems} style={styles.purchaseButton}>
                  Purchase
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Stalls List */}
      {!showCart && (
        <ScrollView style={styles.stallsList}>
          {filteredStalls.map(stall => (
            <Card key={stall.id} style={styles.stallCard}>
              <Card.Title 
                title={`${stall.icon} ${stall.name}`}
                subtitle={`${stall.category} • ${stall.items.length} items`}
              />
              <Card.Content>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {stall.items.map(item => (
                    <Card key={item.id} style={styles.itemCard}>
                      <Card.Content style={styles.itemContent}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDescription} numberOfLines={2}>
                          {item.description}
                        </Text>
                        <Text style={styles.itemPrice}>{item.price} credits</Text>
                        <Button
                          mode="contained"
                          size="small"
                          onPress={() => addToCart(stall, item)}
                          style={styles.addToCartButton}
                          disabled={item.price > userBalance}
                        >
                          {item.price > userBalance ? 'Insufficient Balance' : 'Add to Cart'}
                        </Button>
                      </Card.Content>
                    </Card>
                  ))}
                </ScrollView>
              </Card.Content>
            </Card>
          ))}

          {filteredStalls.length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No stalls found matching your search</Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Floating Action Button for Cart */}
      {!showCart && cart.length > 0 && (
        <FAB
          style={styles.fab}
          icon="cart"
          label={`${cart.length}`}
          onPress={() => setShowCart(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  balanceCard: {
    margin: 16,
    elevation: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceChip: {
    backgroundColor: '#E8F5E8',
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  categoryFilter: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  categoryChip: {
    marginRight: 8,
  },
  cartSummaryCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    elevation: 4,
    backgroundColor: '#E3F2FD',
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartCard: {
    flex: 1,
    margin: 16,
    elevation: 4,
  },
  cartItems: {
    maxHeight: 300,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemStall: {
    fontSize: 12,
    color: '#666',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#333',
  },
  cartItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  cartTotal: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  cartActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  purchaseButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
  },
  stallsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  stallCard: {
    marginBottom: 16,
    elevation: 4,
  },
  itemCard: {
    width: 180,
    marginRight: 10,
    elevation: 2,
  },
  itemContent: {
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    height: 32,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#2196F3',
  },
  noResults: {
    padding: 40,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
  },
});

export default StallScreen;