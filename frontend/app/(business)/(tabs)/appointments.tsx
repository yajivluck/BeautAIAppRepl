import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";

const appointments = () => {
  return (
    <ThemedView style={[styles.container]}>
      <Text>appointments</Text>
    </ThemedView>
  );
};

export default appointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
