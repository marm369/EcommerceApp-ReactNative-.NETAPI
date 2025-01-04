import { validateSignUpForm } from "../../../../utils/formatters.js";

export class UserService {
  // Validation des données utilisateur
  static validateUserData(user) {
    const { valid, errors } = validateSignUpForm(user);
    return { valid, errors };
  }

  // Téléchargement d'une image (Mock)
  static async uploadImage(imageBase64) {
    try {
      console.log("Uploading image...");
      return { success: true, imageUrl: "uploaded-image-url" }; // Remplacez par un vrai endpoint si nécessaire
    } catch (error) {
      console.error("Image upload failed:", error);
      return { success: false, error };
    }
  }

  // Enregistrer les informations utilisateur dans la base de données
  static async registerUser(user) {
    const endpoint = "https://example.com/api/register"; // Remplacez par l'URL réelle de votre API

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // Convertir l'objet utilisateur en JSON
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Registration failed:", errorResponse);
        return { success: false, error: errorResponse };
      }

      const data = await response.json();
      console.log("User registered successfully:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Error during user registration:", error);
      return { success: false, error };
    }
  }
}
