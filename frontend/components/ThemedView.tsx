// import { View, type ViewProps } from "react-native";

// import { useThemeColor } from "@/hooks/useThemeColor";

// export type ThemedViewProps = ViewProps & {
//   lightColor?: string;
//   darkColor?: string;
// };

// export function ThemedView({
//   style,
//   lightColor,
//   darkColor,
//   ...otherProps
// }: ThemedViewProps) {
//   const backgroundColor = useThemeColor(
//     { light: lightColor, dark: darkColor },
//     "background"
//   );

//   return <View style={[{ backgroundColor }, style]} {...otherProps} />;
// }

import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string; // Optional light theme border color
  darkBorderColor?: string; // Optional dark theme border color
  borderWidth?: number; // Optional border width
  variant?: "default" | "withBorder"; // Specify the variant type
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  lightBorderColor,
  darkBorderColor,
  borderWidth = 1, // Default border width for border variant
  variant = "default", // Default to "default" variant
  ...otherProps
}: ThemedViewProps) {
  // Get background color based on theme
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  // Get border color based on theme (only used for the "withBorder" variant)
  const borderColor =
    variant === "withBorder"
      ? useThemeColor(
          { light: lightBorderColor, dark: darkBorderColor },
          "border"
        )
      : undefined;

  return (
    <View
      style={[
        { backgroundColor },
        variant === "withBorder" && { borderColor, borderWidth }, // Add border styles if variant is "withBorder"
        style,
      ]}
      {...otherProps}
    />
  );
}
