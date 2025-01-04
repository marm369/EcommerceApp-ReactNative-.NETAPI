import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Icône pour la flèche

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SLIDES = [
  {
    title: "Explore Spatial Marketplaces",
    description:
      "Find unique items in a marketplace for spatial transactions across various categories.",
    image: require("../../../../assets/images/onboarding1.png"),
  },
  {
    title: "Buy Products from Multiple Markets",
    description:
      "Browse and purchase products from various markets, all in one place.",
    image: require("../../../../assets/images/onboarding2.png"),
  },
  {
    title: "Pay Securely Anytime, Anywhere",
    description:
      "Enjoy secure and easy payments for all your purchases, anytime, anywhere.",
    image: require("../../../../assets/images/onboarding3.png"),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fonction pour avancer à l'étape suivante
  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.navigate("Login"); // Rediriger vers la page de login après la dernière page
    }
  };

  // Fonction pour revenir à l'étape précédente
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Fonction pour ignorer l'onboarding
  const skipOnboarding = () => {
    navigation.navigate("Login"); // Aller à la page de login immédiatement
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.slide}>
        <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <View style={styles.imageBackground} />
          <Image source={SLIDES[currentSlide].image} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{SLIDES[currentSlide].title}</Text>
          <Text style={styles.description}>
            {SLIDES[currentSlide].description}
          </Text>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.prevButton} onPress={prevSlide}>
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
            <Icon name="arrow-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  skipButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: "#666",
  },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF5E9",
    borderRadius: screenWidth * 0.6,
  },
  imageContainer: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: screenWidth * 0.3,
    overflow: "hidden",
    elevation: 8,
    backgroundColor: "#FFF5E9",
  },
  image: {
    width: "90%",
    height: "90%",
    borderRadius: screenWidth * 0.3,
    resizeMode: "cover",
    elevation: 6,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  navigationButtons: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
    width: "60%",
  },
  prevButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF9F1C",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF9F1C",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF9F1C",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF9F1C",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});
