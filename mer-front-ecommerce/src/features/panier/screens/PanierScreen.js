import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PanierScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Hydrating Mask',
      volume: 'Volume 85ml',
      price: 28,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Lip Balm',
      volume: 'Volume 3.50ml',
      price: 8,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Floral Water',
      volume: 'Volume 30ml',
      price: 12,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  const deliveryFee = 5.50;

  const updateQuantity = (id, increment) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + increment;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1,
        };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + deliveryFee;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView style={styles.cartContent}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <View>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productVolume}>{item.volume}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  style={styles.removeButton}
                >
                  <AntDesign name="close" size={20} color="#999" />
                </TouchableOpacity>
              </View>
              <View style={styles.productFooter}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, -1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.price}>{item.price} €</Text>
                  <Text style={styles.subtotal}>
                    Subtotal: {(item.price * item.quantity).toFixed(2)} €
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.invoice}>
          <Text style={styles.invoiceTitle}>Invoice</Text>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceLabel}>Cart Total</Text>
            <Text style={styles.invoiceValue}>{calculateSubtotal().toFixed(2)} €</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceLabel}>Delivery Fee</Text>
            <Text style={styles.invoiceValue}>{deliveryFee.toFixed(2)} €</Text>
          </View>
          <View style={[styles.invoiceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{calculateTotal().toFixed(2)} €</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={() => {
          // Handle order confirmation
          console.log('Order confirmed');
        }}
      >
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 40,
  },
  cartContent: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productVolume: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 4,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtotal: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: '500',
    marginTop: 4,
  },
  invoice: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  invoiceLabel: {
    fontSize: 15,
    color: '#666',
  },
  invoiceValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFA500',
  },
  confirmButton: {
    backgroundColor: '#FFA500',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PanierScreen;
