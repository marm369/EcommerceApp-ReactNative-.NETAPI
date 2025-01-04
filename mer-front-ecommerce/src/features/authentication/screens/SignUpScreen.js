import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { validateSignUpForm } from "../../../../utils/formatters.js";

const SignUpScreen = () => {
  const navigation = useNavigation();

  // States for inputs
  const [profileImage, setProfileImage] = useState(null); // Profile image state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // Role state
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errors, setErrors] = useState({}); // Error state

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSelectProfileImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your gallery."
        );
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct usage for media types
        allowsEditing: true,
        base64: true,
      });

      if (!pickerResult.canceled) {
        const selectedImage = pickerResult.assets
          ? pickerResult.assets[0]
          : pickerResult; // Handle structure
        setProfileImage(`data:image/jpeg;base64,${selectedImage.base64}`);
      }
    } catch (error) {
      console.error("Error selecting image: ", error);
    }
  };

  const handleCreateAccount = async () => {
    const values = {
      profileImage,
      firstName,
      lastName,
      phoneNumber,
      username,
      email,
      password,
      confirmPassword,
      role,
    };
    const { valid, errors } = validateSignUpForm(values);

    if (valid) {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        userName: values.username,
        image: values.profileImage,
        role: values.role || "CLIENT",
      };
      console.log("Payload being sent:", JSON.stringify(payload, null, 2));
      try {
        const endpoint =
          "http://192.168.27.154:5000/api/Authentication/register";

        // Envoi de la requête POST avec fetch
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), 
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Account successfully created:", result);
          navigation.navigate("AccountSuccess");
        } else {
          console.error("Failed to create account:", result.message);
          alert(`Failed to create account: ${result.message}`);
        }
      } catch (error) {
        console.error("Error creating account:", error);
        alert(
          "An error occurred while creating the account. Please try again."
        );
      }
    } else {
      setErrors(errors);
      console.log("Form has errors", errors);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.textSpace}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subTitle}>
          Please enter your details to sign up
        </Text>
      </View>

      <View style={styles.space}>
        {/* Profile Image */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileIcon}
            onPress={handleSelectProfileImage}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Icon name="account-circle" size={100} color="#FF9800" />
            )}
          </TouchableOpacity>
          <Text style={styles.profileText}>Select your Profile Image</Text>
          {errors.profileImage && (
            <Text style={styles.errorText}>{errors.profileImage}</Text>
          )}
        </View>

        {/* First Name */}
        <View>
          <View style={styles.inputWrapper}>
            <Icon
              name="person"
              size={20}
              color="#FF9800"
              style={styles.iconLeft}
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#888"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
        </View>

        {/* Last Name */}
        <View>
          <View style={styles.inputWrapper}>
            <Icon
              name="person"
              size={20}
              color="#FF9800"
              style={styles.iconLeft}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#888"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
        </View>

        {/* Phone Number */}
        <View>
          <View style={styles.inputWrapper}>
            <Icon
              name="phone"
              size={20}
              color="#FF9800"
              style={styles.iconLeft}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#888"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
        </View>

        {/* Username */}
        <View>
          <View style={styles.inputWrapper}>
            <Icon
              name="person-outline"
              size={20}
              color="#FF9800"
              style={styles.iconLeft}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          {errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
        </View>

        {/* Email */}
        <View>
          <View style={styles.inputWrapper}>
            <Icon
              name="email"
              size={20}
              color="#FF9800"
              style={styles.iconLeft}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Password */}
        <View>
          <View style={styles.inputWrapper}>
            <Icon
              name="lock"
              size={20}
              color="#FF9800"
              style={styles.iconLeft}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconRight}
            >
              <Icon
                name={secureTextEntry ? "visibility-off" : "visibility"}
                size={20}
                color="#FF9800"
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        {/* Confirm Password */}
        <View>
          <View style={styles.inputWrapper}>
            <Icon
              name="lock"
              size={20}
              color="#FF9800"
              style={styles.iconLeft}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        {/* Role Selection */}

        <View style={styles.radioButtonGroup}>
          <TouchableOpacity
            style={styles.radioButtonContainer}
            onPress={() => setRole("VENDEUR")}
          >
            <View style={styles.radioCircle}>
              {role === "VENDEUR" && <View style={styles.selectedCircle} />}
            </View>
            <Text style={styles.radioLabel}>Market Owner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButtonContainer}
            onPress={() => setRole("CLIENT")}
          >
            <View style={styles.radioCircle}>
              {role === "CLIENT" && <View style={styles.selectedCircle} />}
            </View>
            <Text style={styles.radioLabel}>Buyer</Text>
          </TouchableOpacity>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  textSpace: {
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  space: {
    marginTop: 20,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileIcon: {
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileText: {
    fontSize: 16,
    color: "#666",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  radioButtonGroup: {
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12, // Circle shape
    borderWidth: 2,
    borderColor: "#FF9800", // Orange border for the circle
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6, // Filled circle for selected state
    backgroundColor: "#FF9800",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333", // Regular text color
  },

  createAccountButton: {
    backgroundColor: "#FF9800",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  createAccountText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#F5F5F5",
  },
});

export default SignUpScreen;
