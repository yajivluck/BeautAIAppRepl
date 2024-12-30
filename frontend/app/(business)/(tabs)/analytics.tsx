import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";

const analytics = () => {
  return (
    <ThemedView style={[styles.container]}>
      <Text>analytics</Text>
    </ThemedView>
  );
};

export default analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
