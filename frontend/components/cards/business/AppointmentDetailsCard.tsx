import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ViewStyle,
} from "react-native";

interface AppointmentDetailsCardProps {
  time: string;
  date: string;
  backgroundImage: any;
  width?: number | string;
  height?: number | string;
}

const AppointmentDetailsCard: React.FC<AppointmentDetailsCardProps> = ({
  time,
  date,
  backgroundImage,
  width = "100%",
  height = "50%",
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          width,
          height,
        } as ViewStyle,
      ]}
    >
      {/* Background Image */}
      <ImageBackground
        source={backgroundImage}
        style={styles.imageBackground}
        imageStyle={styles.backgroundImage}
      >
        {/* Appointment Details */}
        <View style={styles.appointmentDetailsWrapper}>
          {/* Service Name */}
          <Text style={styles.time}>{time}</Text>

          {/* Time and Date */}
          <Text style={styles.date}>{date}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    resizeMode: "cover",
  },

  appointmentDetailsWrapper: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "70%",
  },
  time: {
    color: "white",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 15,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  date: {
    fontSize: 14,
    color: "white",
    marginBottom: "2%",
  },
});

export default AppointmentDetailsCard;
