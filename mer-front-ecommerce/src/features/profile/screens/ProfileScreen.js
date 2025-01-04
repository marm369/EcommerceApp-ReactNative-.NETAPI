import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null); // État pour stocker les données utilisateur
  const [orders, setOrders] = useState([]); // État pour stocker les commandes
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        if (!username) {
          console.error("Username not found in AsyncStorage");
          setLoading(false);
          return;
        }

        const endpoint = `http://192.168.27.154:5000/api/Authentication/user/${username}`;
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserInfo(data);

        const mockOrders = [
          {
            id: "12345",
            totalAmount: "$50.00",
            deliveryAddress: "123 Main St, New York, NY",
            status: "Confirmed",
          },
          {
            id: "67890",
            totalAmount: "$30.00",
            deliveryAddress: "456 Elm St, Boston, MA",
            status: "Delivered",
          },
          {
            id: "11223",
            totalAmount: "$75.00",
            deliveryAddress: "789 Pine St, Chicago, IL",
            status: "Pending",
          },
        ];
        setOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
    navigation.navigate("Login");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FB923C" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: `${userInfo.image}`,
          }}
          style={styles.profileImage}
        />
      </View>

      {/* Profile Details */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Personal Information</Text>
        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={24} color="#FB923C" />
          <Text style={styles.infoText}>
            {userInfo?.firstName} {userInfo?.lastName}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={24} color="#FB923C" />
          <Text style={styles.infoText}>{userInfo?.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={24} color="#FB923C" />
          <Text style={styles.infoText}>{userInfo?.phoneNumber}</Text>
        </View>
      </View>

      {/* Order History */}
      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Order History</Text>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderID}>Order #{order.id}</Text>
              <Text
                style={[
                  styles.orderStatus,
                  order.status === "Delivered"
                    ? { color: "#22C55E" }
                    : order.status === "Pending"
                    ? { color: "#F59E0B" }
                    : { color: "#EF4444" },
                ]}
              >
                {order.status}
              </Text>
            </View>
            <Text style={styles.orderDetailText}>
              Total: {order.totalAmount}
            </Text>
            <Text style={styles.orderDetailText}>
              Address: {order.deliveryAddress}
            </Text>
          </View>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={18} color="#FFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF0", // Subtle orange background
  },
  header: {
    backgroundColor: "#FB923C", // Vibrant orange for the header
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    paddingVertical: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FFF",
    marginBottom: 10,
    top: 35,
  },
  infoSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FB923C", // Orange for titles
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 10,
  },
  ordersSection: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FB923C", // Orange for section titles
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderID: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FB923C",
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  orderDetailText: {
    fontSize: 14,
    color: "#6B7280",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444", // Red for logout button
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 30,
    marginBottom: 30,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFBF0",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FB923C",
  },
});

export default ProfileScreen;
