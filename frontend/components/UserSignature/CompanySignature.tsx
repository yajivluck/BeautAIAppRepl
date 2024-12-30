import React from "react";
import { View, Image, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const CompanySignature: React.FC = ({}) => {
  return (
    <View style={styles.signature}>
      <Image
        source={require("@/assets/images/BeautAI.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <ThemedText style={styles.heading}>beauty consultation</ThemedText>
        <ThemedText style={styles.subheading}>
          get personalized recommendations
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signature: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: "15%",
    height: undefined,
    aspectRatio: 1,
    marginRight: "3%",
  },
  textContainer: {
    flexDirection: "column",
  },
  heading: {
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 22,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  subheading: {
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    opacity: 0.3,
  },
});

export default CompanySignature;
