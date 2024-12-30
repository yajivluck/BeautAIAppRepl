import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedItemProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string; // Optional light theme border color
  darkBorderColor?: string; // Optional dark theme border color
  borderWidth?: number; // Optional border width
};

export function ThemedItem({
  style,
  lightColor,
  darkColor,
  lightBorderColor,
  darkBorderColor,
  borderWidth = 1, // Default border width
  ...otherProps
}: ThemedItemProps) {
  // Get background color based on theme
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "item"
  );

  // Get border color based on theme
  const borderColor = useThemeColor(
    { light: lightBorderColor, dark: darkBorderColor },
    "border" // Fallback to "border" color if not provided
  );

  return (
    <View
      style={[
        { backgroundColor, borderColor, borderWidth }, // Apply dynamic colors
        style,
      ]}
      {...otherProps}
    />
  );
}
