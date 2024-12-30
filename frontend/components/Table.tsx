import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedItem } from "./ThemedItem";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export type Entry = {
  label: string;
  value: string;
};

type KeyValueTableProps = {
  data: Entry[]; // An array of key-value pairs
};

const KeyValueTable: React.FC<KeyValueTableProps> = ({ data }) => {
  const separatorColor = useThemeColor({}, "border");

  return (
    <ThemedItem style={styles.container}>
      {data.map((entry, index) => (
        <View key={index}>
          <View>
            <ThemedText style={styles.label}>{entry.label}</ThemedText>
            <ThemedText style={styles.value}>{entry.value}</ThemedText>
          </View>
          {index < data.length - 1 && (
            <View
              style={[styles.separator, { backgroundColor: separatorColor }]}
            />
          )}
        </View>
      ))}
    </ThemedItem>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 19,
    padding: 15,
    width: "100%",
  },
  label: {
    fontFamily: "InstrumentSansBold",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    opacity: 0.6,
    marginBottom: 4,
  },
  value: {
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  separator: {
    height: 1,
    marginVertical: 15,
  },
});

export default KeyValueTable;
