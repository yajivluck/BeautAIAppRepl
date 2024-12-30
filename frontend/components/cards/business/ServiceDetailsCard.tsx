import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ViewStyle,
} from "react-native";
import CircularButton from "@/components/buttons/CircularButton";

interface ServiceDetailsCardProps {
  serviceType: string;
  onEdit: () => void;
  serviceName: string;
  time: string;
  date: string;
  serviceDuration: string;
  servicePrice: string;
  backgroundImage: any;
  width?: number | string;
  height?: number | string;
}

const ServiceDetailsCard: React.FC<ServiceDetailsCardProps> = ({
  serviceType,
  onEdit,
  serviceName,
  time,
  date,
  serviceDuration,
  servicePrice,
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
        {/* Service Type */}
        <View style={styles.serviceTypeContainer}>
          <Text
            style={styles.serviceType}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {serviceType}
          </Text>
        </View>

        {/* Edit Button */}
        <View style={styles.editButton}>
          <CircularButton size={30} iconType={"pencil"} onPress={onEdit} />
        </View>

        {/* Service Details */}
        <View style={styles.serviceDetailsWrapper}>
          {/* Service Name */}
          <Text style={styles.serviceName}>{serviceName}</Text>

          {/* Time and Date */}
          <Text style={styles.timeAndDate}>{`${time}, ${date}`}</Text>

          {/* Service Duration */}
          <Text style={styles.serviceDuration}>{serviceDuration}</Text>
        </View>

        {/* Service Price */}
        <Text style={styles.servicePrice}>{servicePrice}</Text>
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

  serviceTypeContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 24,
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
    width: "35%", // Fixed width or percentage
    overflow: "hidden", // Ensures text is clipped
    top: "5%",
    left: "5%",
  },
  serviceType: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    overflow: "hidden", // Hide overflow
    textOverflow: "ellipsis", // Show ellipsis when text overflows
  },

  editButton: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  serviceDetailsWrapper: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "70%",
  },
  serviceName: {
    color: "white",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 15,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  timeAndDate: {
    fontSize: 14,
    color: "white",
    marginBottom: "2%",
  },
  serviceDuration: {
    fontSize: 14,
    color: "white",
  },
  servicePrice: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default ServiceDetailsCard;
