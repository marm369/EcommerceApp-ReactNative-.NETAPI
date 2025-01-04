import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AccountSuccessScreen = () => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {/* Rounded Image Container */}
      <View style={styles.imageBackground}>
        <Image
          source={require("../../../../assets/images/account-success.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Success Message */}
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.subTitle}>
        Your account has been created successfully.
      </Text>

      {/* Button to go back to home */}
      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  imageBackground: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 152, 0, 0.3)", // Transparent orange
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF9800", // Orange for title
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FF9800", // Orange for button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AccountSuccessScreen;
