import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";

const allclients = () => {
  return (
    <ThemedView style={[styles.container]}>
      <Text>allclients</Text>
    </ThemedView>
  );
};

export default allclients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
