import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

type DimensionValue = number | string;

// Define the props for the ToggleButton component
interface ToggleButtonProps {
  onToggle?: (state: boolean) => void; // A function that receives the toggle state
  width?: DimensionValue; // Can be a number or a valid string like "50%"
  height?: DimensionValue;
  activeColor?: string;
  passiveColor?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  onToggle,
  width = 50,
  height = 30,
  activeColor = "#FFD7E7",
  passiveColor = "#ccc",
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
    if (onToggle) {
      onToggle(!isActive); // Call the onToggle function if it's provided
    }
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={[
        styles.toggleContainer,
        {
          width: typeof width === "number" ? width : parseInt(width),
          height: typeof height === "number" ? height : parseInt(height),
          backgroundColor: isActive ? activeColor : passiveColor,
        },
      ]}
    >
      <View
        style={[
          styles.toggleKnob,
          {
            width:
              typeof height === "number"
                ? height * 0.8
                : parseInt(height) * 0.8,
            height:
              typeof height === "number"
                ? height * 0.8
                : parseInt(height) * 0.8,
            transform: [
              {
                translateX: isActive
                  ? (typeof width === "number" ? width : parseInt(width)) -
                    (typeof height === "number" ? height : parseInt(height))
                  : 0,
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    borderRadius: 20,
    justifyContent: "center",
    padding: 5,
    position: "relative",
  },
  toggleKnob: {
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
  },
});

export default ToggleButton;
