import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";

const leads = () => {
  return (
    <ThemedView style={[styles.container]}>
      <Text>leads</Text>
    </ThemedView>
  );
};

export default leads;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
