// Updated GaugeChart component
import React from "react";
import { View, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

// Define the type for the props
interface GaugeChartProps {
  percentage: number; // Explicitly define the type for percentage
}

const GaugeChart: React.FC<GaugeChartProps> = ({ percentage }) => {
  const tintColor = useThemeColor({}, "highlighted");

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={percentage} // Dynamic percentage from props
        tintColor={tintColor}
        backgroundColor="rgba(255, 255, 255, 0.9)"
        lineCap="round"
        rotation={0}
      >
        {(fill) => (
          <ThemedText style={styles.percentageText}>
            {Math.round(fill)}%
          </ThemedText>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 40,
    fontWeight: 400,
  },
});

export default GaugeChart;
