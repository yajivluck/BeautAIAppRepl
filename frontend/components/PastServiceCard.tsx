import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

interface PastServiceCardProps {
  service: string;
  date: string;
  rating: number;
  image: any;
}

const { width } = Dimensions.get("window");

const PastServiceCard: React.FC<PastServiceCardProps> = ({
  service,
  date,
  rating,
  image,
}) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.cardTitle}>{service}</Text>
        <Text style={styles.cardText}>{date}</Text>
        <Text style={styles.cardText}>Rating: {rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 16,
    width: width * 0.9,
    height: width * 0.35,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  cardText: {
    fontSize: width * 0.035,
    color: "#fff",
    marginBottom: 4,
  },
});

export default PastServiceCard;
