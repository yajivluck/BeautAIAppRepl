import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import RoundedButton from "@/components/buttons/RoundedButton";
import ToggleButton from "@/components/buttons/ToggleButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@apollo/client";
import { useRouter } from "expo-router";
import { LOGIN_MUTATION } from "@/mutations/mutations";

const SignIn = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState<string>("");
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      alert("Please provide both username/email and password.");
      return;
    }
    try {
      const { data } = await login({
        variables: { emailOrUsername, password },
      });
      if (data) {
        await SecureStore.setItemAsync("access_token", data.login.access_token);
        alert("Login Successful");
        router.replace("/(client)/(tabs)");
      }
    } catch (err) {
      console.error("Error", err);
      alert("Invalid email, username or password. Try again.");
    }
  };

  const handleGoogleLogin = () => {
    // Replace with actual Google login implementation
    alert("Google Login Placeholder");
    router.replace("/(business)/(tabs)");
  };

  const handleSignUpNavigation = () => {
    router.replace("/(auth)/sign-up");
  };

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
          {/* 1. Title Section */}
          <Text style={styles.title}>Log into your account</Text>

          {/* 2. Email and Password Section */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username or Email"
              value={emailOrUsername}
              onChangeText={setEmailOrUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {/* "Forgot?" Link */}
            <TouchableOpacity
              onPress={() =>
                alert("Forgot password functionality coming soon.")
              }
            >
              <Text style={styles.forgotText}>FORGOT?</Text>
            </TouchableOpacity>
          </View>

          {/* 3. Remember Me Section */}
          <View style={styles.rememberMeContainer}>
            <ToggleButton
              onToggle={(state) => setRememberMe(state)}
              width="60%"
              height={30}
              activeColor="#FFD7E7"
              passiveColor="#ccc"
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>

          {/* 4. Buttons Section */}
          <View style={styles.buttonsContainer}>
            <RoundedButton
              text="LOG IN"
              onPress={handleLogin}
              backgroundColor="black"
              textColor="white"
              width="85%"
              height={50}
            />
            <RoundedButton
              text="LOG IN WITH GOOGLE"
              onPress={handleGoogleLogin}
              backgroundColor="white"
              icon={<AntDesign name="google" size={24} color="black" />}
              textColor="black"
              width="85%"
              height={50}
            />
          </View>

          {/* 5. Sign Up Section */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{" "}
              <Text style={styles.signUpLink} onPress={handleSignUpNavigation}>
                SIGN UP
              </Text>
            </Text>
          </View>
        </BlurView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c", // Darker background for better contrast
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backdrop: {
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 30,
    backgroundColor: "rgba(40, 40, 40, 0.75)",
    opacity: 0.95,
    overflow: "hidden",
    margin: 0,
    alignSelf: "center",
  },

  title: {
    fontFamily: "Instrument Sans",
    fontWeight: "700",
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.5,
    textTransform: "uppercase",
    color: "#fff", // Light text for contrast
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#555", // Subtle border color for better contrast
    marginBottom: 15,
    fontSize: 16,
    paddingLeft: 10,
    color: "#fff", // Light text for contrast
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Keep semi-transparent white background
    borderRadius: 8,
  },
  forgotText: {
    color: "#000", // Gold color for better visibility and contrast
    textAlign: "right",
    fontSize: 14,
    marginTop: 10, // Added margin for better separation
    fontWeight: "600", // Slightly bolder text for visibility
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 30, // Increased bottom margin for separation
  },
  rememberMeText: {
    fontSize: 14,
    marginLeft: 10,
    textTransform: "uppercase",
    color: "#000", // Gold color for consistency with the theme
    fontWeight: "500", // Light but visible text
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40, // Increased margin for better spacing
  },
  signUpContainer: {
    marginTop: 20, // Increased top margin for spacing
  },
  signUpText: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#fff", // White text for better readability
  },
  signUpLink: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#000", // Gold color for visibility
    fontWeight: "600", // Bold to make it stand out
  },
  button: {
    height: 50,
    width: "85%", // Same width for consistency
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25, // Rounded corners for buttons
    marginBottom: 15, // Spacing between buttons
  },
  loginButton: {
    backgroundColor: "#Fd4545", // Gold background for login button
  },
  googleButton: {
    backgroundColor: "#fff", // White background for Google button
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25, // Rounded corners
    borderWidth: 1, // Border to separate the button from background
    borderColor: "#Fd4545", // Matching gold border for consistency
  },
  googleButtonText: {
    fontSize: 16,
    color: "#333", // Dark text for contrast against white background
    marginLeft: 10, // Spacing between icon and text
  },
});

export default SignIn;
