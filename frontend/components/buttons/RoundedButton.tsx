import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  View,
} from "react-native";

type DimensionValue = number | string;

type RoundedButtonProps = {
  width?: DimensionValue; // Can be a number or a valid string like "50%"
  height?: DimensionValue;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
  text: string;
  icon?: React.ReactNode;
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
  width = "60%",
  height = 50,
  backgroundColor = "#1e90ff",
  textColor = "#fff",
  onPress = () => {},
  text,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width,
          height,
          backgroundColor,
        } as ViewStyle,
      ]}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        {/* If an icon is provided, show it */}
        {icon && (
          <View style={styles.iconContainer}>
            {/* If the icon is a string (URL), use the Image component */}
            {
              icon // Otherwise, assume it's a valid React component
            }
          </View>
        )}
        {/* Render the button text inside a Text component */}
        <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginVertical: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.42)",
  },
  contentContainer: {
    flexDirection: "row", // Align text and icon horizontally
    alignItems: "center", // Center the content vertically
  },
  iconContainer: {
    marginRight: 10, // Space between the icon and text
  },
  icon: {
    width: 20, // Set a fixed width for the icon
    height: 20, // Set a fixed height for the icon
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default RoundedButton;
