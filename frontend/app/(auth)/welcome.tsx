import React from "react";
import { Text, Image, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import RoundedButton from "@/components/buttons/RoundedButton";

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("@/assets/images/background-auth.png")} // Replace with your background image path
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Backdrop Filter Container */}
        <BlurView intensity={100} style={styles.backdrop}>
          {/* Company Logo */}
          <Image
            source={require("@/assets/images/BeautAI.png")} // Replace with your logo path
            style={styles.logo}
            resizeMode="contain"
          />
          {/* Welcome Message */}
          <Text style={styles.welcomeText}>Welcome to Our App!</Text>

          {/* Buttons */}
          <RoundedButton
            text="Get Started"
            onPress={() => router.replace("/(auth)/sign-up")}
            backgroundColor="#1e90ff"
            width="80%"
            height="10%"
          />
          <RoundedButton
            text="Sign In"
            onPress={() => router.replace("/(auth)/sign-in")}
            backgroundColor="black"
            textColor="white"
            width="80%"
            height="10%"
          />
        </BlurView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backdrop: {
    width: "95%", // Backdrop takes 90% of the screen width
    height: "95%", // Backdrop takes 70% of the screen height
    top: "2.5%",
    left: "2.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: "5%", // Padding as a percentage of the backdrop size
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    overflow: "hidden",
  },
  logo: {
    width: "30%", // Logo takes 30% of the backdrop's width
    height: "20%",
    marginBottom: "5%", // Space below the logo as percentage
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "5%",
  },
});

export default Welcome;
