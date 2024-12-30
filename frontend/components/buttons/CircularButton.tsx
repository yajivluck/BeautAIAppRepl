import React from "react";
import { TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";
import {
  Ionicons,
  Entypo,
  Feather,
  SimpleLineIcons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export type IconType =
  | "notifications"
  | "notifications-alert"
  | "edit"
  | "pencil"
  | "vertical-dots"
  | "horizontal-dots"
  | "arrow-left"
  | "arrow-up-right"
  | "search"
  | "settings"
  | "mail"
  | "phone"
  | "bookmark";

interface CircularButtonProps {
  size: number; // Button size in pixels
  iconType: IconType; // Predefined set of icons
  onPress: () => void; // Function to execute on press
  backgroundColor?: string; // Button background color
  iconColor?: string; // Icon color
}

const CircularButton: React.FC<CircularButtonProps> = ({
  size,
  iconType,
  onPress,
  backgroundColor = "rgba(255, 255, 255, 0.42)",
  iconColor = "black",
}) => {
  // Map icon types to vector icon sets and names
  const renderIcon = () => {
    switch (iconType) {
      // notification buttons
      case "notifications":
        return (
          <MaterialCommunityIcons
            name="bell-outline"
            size={size * 0.5}
            color={iconColor}
          />
        );

      case "notifications-alert":
        return (
          <MaterialCommunityIcons
            name="bell-badge-outline"
            size={size * 0.5}
            color={iconColor}
          />
        );

      // edit buttons
      case "edit":
        return <Feather name="edit" size={size * 0.5} color={iconColor} />;
      case "pencil":
        return <Ionicons name="pencil" size={size * 0.5} color={iconColor} />;

      case "vertical-dots":
        return (
          <Entypo
            name="dots-three-vertical"
            size={size * 0.5}
            color={iconColor}
          />
        );

      case "horizontal-dots":
        return (
          <Entypo
            name="dots-three-horizontal"
            size={size * 0.5}
            color={iconColor}
          />
        );

      // arrow buttons

      case "arrow-left":
        return (
          <AntDesign name="arrowleft" size={size * 0.5} color={iconColor} />
        );

      case "arrow-up-right":
        return (
          <Feather name="arrow-up-right" size={size * 0.5} color={iconColor} />
        );

      // search button
      case "search":
        return (
          <Entypo name="magnifying-glass" size={size * 0.5} color={iconColor} />
        );

      // settings button
      case "settings":
        return (
          <SimpleLineIcons
            name="settings"
            size={size * 0.5}
            color={iconColor}
          />
        );

      // communication buttons

      case "mail":
        return <Entypo name="mail" size={size * 0.5} color={iconColor} />;

      case "phone":
        return <Entypo name="phone" size={size * 0.5} color={iconColor} />;

      // save buttons
      case "bookmark":
        return (
          <FontAwesome
            name="bookmark"
            size={size * 0.5}
            color={useThemeColor({}, "highlighted")}
          />
        );

      default:
        return null;
    }
  };

  // Button container styles
  const buttonStyle: StyleProp<ViewStyle> = {
    width: size,
    height: size,
    borderRadius: size / 2, // Make it circular
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={buttonStyle}>
      <View>{renderIcon()}</View>
    </TouchableOpacity>
  );
};

export default CircularButton;
