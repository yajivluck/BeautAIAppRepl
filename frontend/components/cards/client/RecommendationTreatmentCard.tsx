import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  ViewStyle,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import CircularButton from "@/components/buttons/CircularButton";
import { ThemedItem } from "@/components/ThemedItem";

// Define types for the component props
type DimensionValue = number | string;

interface RecommendationTreatmentCardProps {
  id: string;
  backgroundImage: any;
  treatmentType: string;
  companyLogo: any;
  companyTitle: string;
  onBookmarkPress: () => void;
  treatment: string;
  address: string;
  distance: string;
  width?: DimensionValue;
  height?: DimensionValue;
}

const RecommendationTreatmentCard: React.FC<
  RecommendationTreatmentCardProps
> = ({
  id,
  backgroundImage,
  treatmentType,
  companyLogo,
  companyTitle,
  onBookmarkPress,
  treatment,
  address,
  distance,
  width = "352",
  height = "240",
}) => {
  const router = useRouter();

  const handleCardPress = () => {
    router.push({
      pathname: "/(client)/(tabs)/beautyconsultation/providers/[id]",
      params: { id },
    });
  };

  return (
    <ThemedItem style={[styles.card, { width, height } as ViewStyle]}>
      <Pressable onPress={handleCardPress} style={{ flex: 1 }}>
        <ImageBackground
          source={backgroundImage}
          style={styles.imageBackground}
          imageStyle={styles.backgroundImage}
        >
          {/* Top Section */}
          <View style={styles.topSection}>
            <View style={styles.treatmentTypeContainer}>
              <Text
                style={styles.treatmentType}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {treatmentType}
              </Text>
            </View>

            <View style={{ zIndex: 1 }}>
              <CircularButton
                size={20}
                iconType={"bookmark"}
                onPress={onBookmarkPress}
              />
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <View style={styles.details}>
              <Text style={styles.treatment}>{treatment}</Text>
              <View style={styles.companyInfo}>
                <Image source={companyLogo} style={styles.companyLogo} />
                <Text style={styles.companyTitle}>{companyTitle}</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome name="map-marker" size={10} color="white" />
                <Text style={styles.address}>{address}</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome5 name="walking" size={10} color="white" />
                <Text style={styles.distanceContainer}>
                  <Text style={styles.distance}>{distance}</Text>
                  <Text style={styles.awayText}> away from your location</Text>
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
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
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: "5%",
    left: "5%",
    right: "5%",
    alignItems: "center",
  },
  treatmentTypeContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 24,
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    overflow: "hidden",
  },
  treatmentType: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
  },
  bottomSection: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    alignItems: "flex-start",
  },
  details: {
    justifyContent: "flex-start",
  },
  treatment: {
    color: "white",
    fontWeight: "400",
    fontSize: 24,
    lineHeight: 30,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  companyLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 10,
  },
  companyTitle: {
    fontSize: 12,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "400",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  awayText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
});

export default RecommendationTreatmentCard;
