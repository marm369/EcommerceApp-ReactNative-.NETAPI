import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to allow location access to see nearby markets."
        );
        setLoading(false);
        return;
      }

      try {
        // Get user location
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        // Fetch markets from API
        const response = await fetch("http://192.168.27.154:5003/api/Markets");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const formattedMarkets = data.map((market) => ({
          id: market.id.toString(),
          name: market.name,
          description: market.description,
          image: market.image || "https://via.placeholder.com/100",
          coordinates: {
            latitude: market.latitude,
            longitude: market.longitude,
          },
          phone: market.phoneNumber,
          owner: market.owner, 
        }));

        setMarkets(formattedMarkets);
      } catch (error) {
        Alert.alert("Error", `Failed to load markets: ${error.message}`);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Unable to access location. Please enable location services.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Markets</Text>
      <MapView style={styles.map} region={location}>
        {markets.map((market) => (
          <Marker
            key={market.id}
            coordinate={market.coordinates}
            title={market.name}
          >
            <View style={styles.markerWrapper}>
              <Image source={{ uri: market.image }} style={styles.markerImage} />
            </View>
            <Callout
              onPress={() => navigation.navigate("MarketDetails", { market })}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{market.name}</Text>
                <Text style={styles.calloutDescription}>{market.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF8C00",
    textAlign: "center",
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
  markerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF8C00",
    borderRadius: 35,
    padding: 5,
  },
  markerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  calloutContainer: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF8C00",
  },
  calloutDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6B7280",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF8C00",
    textAlign: "center",
  },
});

export default MapScreen;
