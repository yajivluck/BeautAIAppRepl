import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

interface AppointmentCardProps {
  service: string;
  time: string;
  date: string;
  location: string;
  image: any;
}

const { width } = Dimensions.get("window");

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  service,
  time,
  date,
  location,
  image,
}) => {
  return (
    <View style={styles.appointmentCard}>
      <Image source={image} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.cardTitle}>{service}</Text>
        <Text style={styles.cardText}>{time}</Text>
        <Text style={styles.cardText}>{date}</Text>
        <Text style={styles.cardText}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appointmentCard: {
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 16,
    width: width * 0.9,
    height: 200,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardText: {
    fontSize: width * 0.045,
    color: "#fff",
  },
});

export default AppointmentCard;
