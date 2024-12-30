import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import CircularButton, { IconType } from "../buttons/CircularButton";
import { ThemedText } from "../ThemedText";

const { width } = Dimensions.get("window");

type UserLogoSignatureProps = {
  imageSource: ImageSourcePropType;
  username: string;
  onPress: () => void;
  iconType: IconType; // Allow passing different icon types
  iconSize?: number; // Optional: Customize the size of the button
};

const UserLogoSignature: React.FC<UserLogoSignatureProps> = ({
  imageSource,
  username,
  onPress,
  iconType,
  iconSize = 40, // Default button size
}) => {
  const [greeting, setGreeting] = useState("");

  // Function to determine the greeting
  const calculateGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning!";
    if (currentHour < 18) return "Good Afternoon!";
    if (currentHour < 22) return "Good Evening!";
    return "Good Night!";
  };

  useEffect(() => {
    // Set initial greeting
    setGreeting(calculateGreeting());

    // Calculate time until the next hour
    const now = new Date();
    const msUntilNextHour =
      (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000;

    // Set a timeout to update the greeting on the next hour
    const timeoutId = setTimeout(() => {
      setGreeting(calculateGreeting());

      // After the first update, set an interval to update every hour
      const intervalId = setInterval(() => {
        setGreeting(calculateGreeting());
      }, 60 * 60 * 1000); // 1 hour

      // Clean up the interval on unmount
      return () => clearInterval(intervalId);
    }, msUntilNextHour);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.headerContent}>
      <Image source={imageSource} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <ThemedText style={styles.greeting}>{greeting}</ThemedText>
        <ThemedText style={styles.username}>{username}</ThemedText>
      </View>
      <CircularButton size={iconSize} iconType={iconType} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: width * 0.06,
    fontFamily: "InstrumentSansBold",
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: -0.02,
    opacity: 0.3,
  },
  username: {
    fontSize: width * 0.045,
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 33,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
});

export default UserLogoSignature;
