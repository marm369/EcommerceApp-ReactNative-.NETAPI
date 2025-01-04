import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MarketProductsScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Apple",
      price: "$2.00",
      quantity: "50",
      image: "https://via.placeholder.com/100",
      category: "Fruits",
    },
    {
      id: "2",
      name: "Milk",
      price: "$1.50",
      quantity: "30",
      image: "https://via.placeholder.com/100",
      category: "Dairy",
    },
    {
      id: "3",
      name: "Bread",
      price: "$1.20",
      quantity: "20",
      image: "https://via.placeholder.com/100",
      category: "Bakery",
    },
    {
      id: "4",
      name: "Cheese",
      price: "$3.00",
      quantity: "15",
      image: "https://via.placeholder.com/100",
      category: "Dairy",
    },
  ]);

  const handleAddProduct = () => {
    navigation.navigate("AddProduct"); 
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {/* Image section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      {/* Info section */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.categoryBadge}>{item.category}</Text>
          <Text
            style={[
              styles.stockBadge,
              { backgroundColor: item.quantity > 20 ? "#34D399" : "#F87171" },
            ]}
          >
            {item.quantity > 20 ? "In Stock" : "Low Stock"}
          </Text>
        </View>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.marketName}>My Market</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={renderProduct}
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
    backgroundColor: "#FFF5E1", // Fond beige-orangé
  },
header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 15,
  borderBottomLeftRadius: 35,
  borderBottomRightRadius: 35,
  marginTop : 40,
},

  marketName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7A00",
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF7A00",
  },
  gridContainer: {
    padding: 15,
  },
  productCard: {
    width: "48%",
    margin: "1%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    alignItems: "center",
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFF7E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#FFB84D",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF7A00",
    marginBottom: 5,
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: "#FFE4C4",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 12,
    color: "#FF7A00",
    fontWeight: "bold",
  },
  stockBadge: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF7A00",
  },
});

export default MarketProductsScreen;
