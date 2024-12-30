import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import CircularButton from "@/components/buttons/CircularButton";
import { ThemedItem } from "@/components/ThemedItem";

interface PastServiceCardProps {
  serviceType: string;
  date: string;
  onRedirect: () => void;
  companyLogo: any;
  companyTitle: string;
  backgroundImage: any;
  starRating: number;
  width?: number | string;
  height?: number | string;
}

const PastServiceCard: React.FC<PastServiceCardProps> = ({
  serviceType,
  date,
  onRedirect,
  companyLogo,
  companyTitle,
  backgroundImage,
  starRating,
  width = 354,
  height = 136,
}) => {
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
      {/* Background Image */}
      <ImageBackground
        source={backgroundImage}
        style={styles.imageBackground}
        imageStyle={styles.backgroundImage}
      >
        {/* Service Info (Type & Date) */}
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceType}>{serviceType}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        {/* Redirect Button */}
        <View style={styles.redirectButton}>
          <CircularButton
            size={20}
            iconType={"arrow-up-right"}
            onPress={onRedirect}
            iconColor="white"
          />
        </View>

        {/* Company Info */}
        <View style={styles.companyInfo}>
          <Image source={companyLogo} style={styles.companyLogo} />
          <Text style={styles.companyTitle}>{companyTitle}</Text>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <AntDesign
            name="star"
            size={20}
            color={useThemeColor({}, "highlighted")}
            style={styles.starIcon}
          />
          <Text style={styles.starRating}>{starRating.toFixed(1)}</Text>
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
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  serviceInfo: {
    position: "absolute",
    top: "5%",
    left: "5%",
    alignItems: "flex-start",
  },
  serviceType: {
    fontSize: 15,
    color: "white",
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: 28,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  date: {
    fontSize: 12,
    color: "white",
    fontWeight: "400",
    lineHeight: 13,
    letterSpacing: -0.02,
    opacity: 0.4,
    textTransform: "uppercase",
  },
  redirectButton: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  companyInfo: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  companyLogo: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: "3%",
  },
  companyTitle: {
    color: "white",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  ratingContainer: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    flexDirection: "row",
    alignItems: "center", // Center both the icon and text vertically
  },

  starIcon: {
    marginRight: 5, // Space between the star and the rating
  },

  starRating: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    lineHeight: 20,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    marginBottom: 1,
  },
});

export default PastServiceCard;
