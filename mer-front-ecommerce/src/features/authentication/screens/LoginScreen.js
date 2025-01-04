import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const navigation = useNavigation();

  // States
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSignIn = async () => {
    console.log("Sign In clicked with username:", username);
  
    const payload = {
      userName: username,
      password: password,
    };
  
    try {
      const endpoint = "http://192.168.27.154:5000/api/Authentication/login";
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Login successful:", result);
        await AsyncStorage.setItem("username", username);
  
        navigation.navigate("BottomNavigationBar"); 
      } else {
        console.error("Login failed:", result.message);
        alert(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logos/shopsphere.png")}
        style={styles.logo1}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subTitle}>Sign in to continue</Text>

      <View style={styles.space}>
        {/* Username Input */}
        <View style={styles.inputWrapper}>
          <Icon name="person" size={20} color="#888" style={styles.iconLeft} /> {/* Icône pour username */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username} 
            onChangeText={setUsername} 
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#888" style={styles.iconLeft} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={secureTextEntry}
            value={password} // Utilisation de la variable d'état password
            onChangeText={setPassword} // Met à jour password
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconRight}
          >
            <Icon
              name={secureTextEntry ? "visibility-off" : "visibility"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  logo1: {
    width: 120,
    height: 120,
    marginTop: 100,
    marginLeft: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 30,
    color: "#000",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
    paddingLeft: 30,
    color: "#555",
  },
  space: {
    marginHorizontal: 20,
    marginVertical: 80,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    paddingLeft: 10,
  },
  signInButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: "#FFA500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createAccountText: {
    fontSize: 16,
    color: "#FFA500",
    fontWeight: "bold",
  },
});

export default LoginScreen;
