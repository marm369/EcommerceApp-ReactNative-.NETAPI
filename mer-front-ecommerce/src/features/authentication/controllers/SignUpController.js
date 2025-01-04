// controllers/SignUpController.js
import React, { useState } from "react";
import { UserModel } from "../models/UserModel";
import { UserService } from "../services/UserService";

export const useSignUpController = (navigation) => {
  const [user, setUser] = useState(new UserModel({}));
  const [errors, setErrors] = useState({});
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleInputChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSelectProfileImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Mettez à jour l'image du profil
        handleInputChange("profileImage", result.assets[0].uri); // Utilisation correcte du chemin d'accès à l'image
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };
  
  const handleCreateAccount = () => {
    const { valid, errors } = UserService.validateUserData(user);

    if (valid) {
      console.log("Form is valid!");
      navigation.navigate("AccountSuccess");
    } else {
      setErrors(errors);
      console.log("Form has errors", errors);
    }
  };

  return {
    user,
    errors,
    secureTextEntry,
    handleInputChange,
    togglePasswordVisibility,
    handleSelectProfileImage,
    handleCreateAccount,
  };
};
