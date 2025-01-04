import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const categories = [
  { name: 'All', icon: <Feather name="grid" size={20} color="#FFFFFF" />, color: '#A0AEC0' },
  { name: 'Food', icon: <MaterialIcons name="fastfood" size={20} color="#FFFFFF" />, color: '#48BB78' },
  { name: 'Personal Care', icon: <FontAwesome name="medkit" size={20} color="#FFFFFF" />, color: '#4299E1' },
  { name: 'Electronics', icon: <Feather name="cpu" size={20} color="#FFFFFF" />, color: '#F6AD55' },
  { name: 'Clothing', icon: <FontAwesome name="shopping-bag" size={20} color="#FFFFFF" />, color: '#ED64A6' },
  { name: 'Furniture', icon: <MaterialIcons name="weekend" size={20} color="#FFFFFF" />, color: '#ECC94B' },
  { name: 'Sports', icon: <FontAwesome name="soccer-ball-o" size={20} color="#FFFFFF" />, color: '#9F7AEA' },
  { name: 'Toys', icon: <MaterialIcons name="toys" size={20} color="#FFFFFF" />, color: '#38B2AC' },
];

const products = [
  { id: '1', market: 'Fresh Market', name: 'Apple', price: '$2.00', image: 'https://via.placeholder.com/100', category: 'Food' },
  { id: '2', market: 'Tech Store', name: 'Laptop', price: '$1200', image: 'https://via.placeholder.com/100', category: 'Electronics' },
  { id: '3', market: 'Fashion Hub', name: 'Jacket', price: '$80', image: 'https://via.placeholder.com/100', category: 'Clothing' },
  { id: '4', market: 'Toy Land', name: 'Teddy Bear', price: '$20', image: 'https://via.placeholder.com/100', category: 'Toys' },
];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getFilteredProducts = () => {
    return selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);
  };

  const getCategoryTitle = () => {
    return selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Products`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/logos/shopsphere.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="ShopSphere logo"
        />
        <TouchableOpacity style={styles.cartButton} accessibilityLabel="View cart">
          <Feather name="shopping-cart" size={24} color="#4A5568" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.categoryCircle,
              { backgroundColor: category.color },
              selectedCategory === category.name && styles.categoryCircleActive,
            ]}
            onPress={() => setSelectedCategory(category.name)}
            accessibilityLabel={`Select ${category.name} category`}
            accessibilityState={{ selected: selectedCategory === category.name }}
          >
            {category.icon}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>{getCategoryTitle()}</Text>

      {/* Products Grid */}
      <FlatList
        data={getFilteredProducts()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} activeOpacity={0.8}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                accessibilityLabel={`Image of ${item.name}`}
              />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.marketName}>{item.market}</Text>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Feather name="plus" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    elevation: 2,
    marginTop: 30,
  },
  logo: {
    width: 150,
    height: 50,
    right: 30,
  },
  cartButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EDF2F7',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  categoryCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryCircleActive: {
    borderWidth: 2,
    borderColor: '#4FD1C5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 20,
    marginBottom: 10,
  },
  gridContainer: {
    padding: 10,
    paddingBottom: 50,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  marketName: {
    fontSize: 10,
    color: '#718096',
    marginBottom: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFA500',
  },
  addButton: {
    backgroundColor: '#FFA500',
    padding: 6,
    borderRadius: 6,
  },
});

export default HomeScreen;
