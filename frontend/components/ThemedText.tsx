import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "sectionHeader"
    | "sectionSubheader"
    | "headerTitle";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "sectionHeader" ? styles.sectionHeader : undefined,
        type === "sectionSubheader" ? styles.sectionSubheader : undefined,
        type === "headerTitle" ? styles.headerTitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {},
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },

  sectionHeader: {
    fontFamily: "InstrumentSansBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  sectionSubheader: {
    fontFamily: "InstrumentSansBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    opacity: 0.4,
    marginBottom: 8,
  },
  headerTitle: {
    fontFamily: "InstrumentSansBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
});
