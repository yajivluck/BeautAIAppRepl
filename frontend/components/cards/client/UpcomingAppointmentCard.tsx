import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";
import CircularButton from "@/components/buttons/CircularButton";
import { ThemedItem } from "@/components/ThemedItem";

type DimensionValue = number | string;

interface UpcomingAppointmentProps {
  professionals: string;
  id: string;
  serviceType: string;
  time: string;
  date: string;
  companyLogo: any;
  companyTitle: string;
  backgroundImage: any;
  width?: DimensionValue;
  height?: DimensionValue;
}

const UpcomingAppointmentCard: React.FC<UpcomingAppointmentProps> = ({
  professionals,
  id,
  serviceType,
  time,
  date,
  companyLogo,
  companyTitle,
  backgroundImage,
  width = 352,
  height = 192,
}) => {
  const router = useRouter();

  return (
    <ThemedItem
      style={[
        styles.card,
        {
          width,
          height,
        } as ViewStyle,
      ]}
    >
      <ImageBackground
        source={backgroundImage}
        style={styles.imageBackground}
        imageStyle={styles.backgroundImage}
      >
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.professionalsContainer}>
            <Text
              style={styles.professionals}
              numberOfLines={1} // Limits text to one line
              ellipsizeMode="tail"
            >
              {professionals}
            </Text>
          </View>

          <CircularButton
            size={20}
            iconType={"horizontal-dots"}
            onPress={() => {}}
            backgroundColor="transparent"
            iconColor="rgba(255, 255, 255, 0.82)"
          />
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.details}>
            <Text style={styles.serviceType}>{serviceType} at</Text>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>

          <View style={styles.companyInfo}>
            <Image source={companyLogo} style={styles.companyLogo} />
            <Text style={styles.companyTitle}>{companyTitle}</Text>
          </View>
        </View>
      </ImageBackground>
    </ThemedItem>
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
    position: "relative",
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: "5%",
    left: "5%",
    right: "5%",
  },
  professionalsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 24,
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
    width: "35%", // Fixed width or percentage
    overflow: "hidden", // Ensures text is clipped
  },
  professionals: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    overflow: "hidden", // Hide overflow
    textOverflow: "ellipsis", // Show ellipsis when text overflows
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: "5%",
    left: "5%",
    right: "5%",
    alignItems: "center",
  },
  details: {
    justifyContent: "flex-start",
    width: "60%",
  },
  serviceType: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.61)",
    textTransform: "uppercase",
  },
  time: {
    fontSize: 24,
    color: "white",
    textTransform: "uppercase",
  },
  date: {
    fontSize: 13,
    color: "white",
    textTransform: "uppercase",
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
    marginTop: "15%",
  },
  companyLogo: {
    width: 10,
    height: 10,
    marginRight: "4%",
    borderRadius: 12,
  },
  companyTitle: {
    fontWeight: "400",
    fontSize: 8,
    lineHeight: 15,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    color: "white",
  },
});

export default UpcomingAppointmentCard;
