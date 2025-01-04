import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../profile/screens/ProfileScreen";
import MarketScreen from "../market/screens/MarketScreen";
import MarketProductsScreen from "../market/screens/MarketProductsScreen";
import HomeScreen from "../home/screens/HomeScreen";
import MapScreen from "../map/screens/MapScreen";
import PanierScreen from "../panier/screens/PanierScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function BottomNavigationBar() {
  const [isMarket, setIsMarket] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketStatus = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        if (!username) {
          console.error("Username not found in AsyncStorage");
          setIsMarket(false); // Définir une valeur par défaut
          setLoading(false); // Arrêter l'indicateur de chargement
          return;
        }

        // Vérifiez si l'utilisateur a un rôle de Market
        const roleEndpoint = `http://192.168.27.154:5000/api/Authentication/user/role/${username}`;
        const roleResponse = await fetch(roleEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!roleResponse.ok) {
          throw new Error(`HTTP error! status: ${roleResponse.status}`);
        }

        const isMarket = await roleResponse.json();
        console.log("Fetched isMarket value:", isMarket);

        if (isMarket) {
          console.log("Debut End point", username);
          // Si l'utilisateur a un rôle Market, vérifiez si le Market est créé
          const marketEndpoint = `http://192.168.27.154:5000/api/Markets/owner-exists/${username}`;
          const marketResponse = await fetch(marketEndpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!marketResponse.ok) {
            throw new Error(`HTTP error! status: ${marketResponse.status}`);
          }

          const isCreated = await marketResponse.json();
          console.log("Fetched isCreated value:", isCreated);

          // Mettez à jour les états en fonction des résultats
          setIsMarket(true);
          setIsCreated(isCreated);
        } else {
          // Si l'utilisateur n'est pas un Market
          setIsMarket(false);
          setIsCreated(false);
        }
      } catch (error) {
        console.error("Error fetching market status:", error);
        setIsMarket(false);
        setIsCreated(false);
      } finally {
        setLoading(false); // Toujours arrêter l'indicateur de chargement
      }
    };

    fetchMarketStatus();
  }, []);

  // Afficher un indicateur de chargement pendant que les données sont récupérées
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          const { accessibilityState, children, onPress } = props;
          const isSelected = accessibilityState?.selected;

          // Set custom colors for each tab
          let activeBackgroundColor = "#E5E5E5";
          let activeIconColor = "#000";

          switch (route.name) {
            case "Home":
              activeBackgroundColor = "rgba(30, 144, 255, 0.1)";
              activeIconColor = "#1E90FF";
              break;
            case "Map":
              activeBackgroundColor = "rgba(255, 99, 71, 0.1)";
              activeIconColor = "#FF6347";
              break;
            case "Panier":
              activeBackgroundColor = "rgba(255, 165, 0, 0.1)";
              activeIconColor = "#FFA500";
              break;
            case "Market":
              activeBackgroundColor = "rgba(0, 128, 128, 0.1)";
              activeIconColor = "#008080";
              break;
            case "Profile":
              activeBackgroundColor = "rgba(138, 43, 226, 0.1)";
              activeIconColor = "#8A2BE2";
              break;
          }

          return (
            <TouchableOpacity
              onPress={onPress}
              style={[
                styles.tabButton,
                isSelected ? { backgroundColor: activeBackgroundColor } : null,
              ]}
            >
              {isSelected ? (
                <Ionicons
                  name={
                    route.name === "Home"
                      ? "home"
                      : route.name === "Map"
                      ? "map"
                      : route.name === "Panier"
                      ? "cart"
                      : route.name === "Market"
                      ? "storefront"
                      : "person"
                  }
                  size={22}
                  color={activeIconColor}
                  style={{ fontWeight: "bold" }}
                />
              ) : (
                <Ionicons
                  name={
                    route.name === "Home"
                      ? "home-outline"
                      : route.name === "Map"
                      ? "map-outline"
                      : route.name === "Panier"
                      ? "cart-outline"
                      : route.name === "Market"
                      ? "storefront-outline"
                      : "person-outline"
                  }
                  size={22}
                  color={"#000"}
                />
              )}
              {isSelected && (
                <Text style={[styles.tabText, { color: activeIconColor }]}>
                  {route.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      {isMarket ? (
        isCreated ? (
          <Tab.Screen name="Market" component={MarketProductsScreen} />
        ) : (
          <Tab.Screen name="Market" component={MarketScreen} />
        )
      ) : (
        <Tab.Screen name="Panier" component={PanierScreen} />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tabBar: {
    height: 80,
    backgroundColor: "#FDFDFD",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 6,
    marginVertical: 7,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
