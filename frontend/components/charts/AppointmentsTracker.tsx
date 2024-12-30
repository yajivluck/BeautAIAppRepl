import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedItem } from "../ThemedItem";
import GaugeChart from "./GaugeChart";

const AppointmentsTracker = () => {
  const textColor = useThemeColor({}, "text");

  // Simulating real-time data updates
  const [data, setData] = useState({
    numAppointmentsCompleted: 782,
    numAppointments: 1057,
  });

  const completionPercentage = Math.round(
    (data.numAppointmentsCompleted / data.numAppointments) * 100
  );

  return (
    <ThemedItem style={styles.cardContainer}>
      {/* Gauge Chart */}
      <GaugeChart percentage={completionPercentage} />

      {/* "Completed" text */}
      <ThemedText style={[styles.text, { color: textColor }]}>
        Completed
      </ThemedText>

      {/* Number */}
      <ThemedText style={[styles.number, { color: textColor }]}>
        {data.numAppointmentsCompleted}
      </ThemedText>
    </ThemedItem>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 30,
    letterSpacing: -0.02,
    opacity: 0.3,
  },
  number: {
    fontSize: 50,
    fontWeight: "600",
    marginTop: 10,
    letterSpacing: -0.02,
  },
});

export default AppointmentsTracker;
