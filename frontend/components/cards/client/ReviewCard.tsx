import React from "react";
import { View, Image, StyleSheet, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedItem } from "@/components/ThemedItem";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ReviewCardProps {
  name: string;
  profileImage: any; // Local image
  date: string;
  starRating: number; // Real value (e.g., 4.3)
  message: string;
  width?: number | string;
  height?: number | string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  profileImage,
  date,
  starRating,
  message,
  width = 353,
  height = 120,
}) => {
  const separatorColor = useThemeColor({}, "border");
  const starColor = useThemeColor({}, "highlighted");

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <FontAwesome key={i} name="star" size={14} color={starColor} />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FontAwesome
            key={i}
            name="star-half-full"
            size={14}
            color={starColor}
          />
        );
      } else {
        stars.push(
          <FontAwesome key={i} name="star-o" size={14} color={starColor} />
        );
      }
    }
    return stars;
  };

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
      {/* First Row: Meta Data */}
      <View style={styles.metaDataRow}>
        {/* Profile Image */}
        <Image source={profileImage} style={styles.profileImage} />

        {/* Name and Date */}
        <View style={styles.metaContent}>
          <View style={styles.topRow}>
            <ThemedText style={styles.nameText}>{name}</ThemedText>
            <ThemedText style={styles.dateText}>{date}</ThemedText>
          </View>
          <View style={styles.ratingWrapper}>
            {renderStars(starRating)}
            <ThemedText style={styles.starRatingText}>
              {starRating.toFixed(1)}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: separatorColor }]} />

      {/* Second Row: Message */}
      <ThemedText style={styles.messageText} numberOfLines={2}>
        {message}
      </ThemedText>
    </ThemedItem>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  metaDataRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  metaContent: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    fontFamily: "InstrumentSansSemiBold",
    fontWeight: "400", // Regular weight
    fontSize: 12,
    lineHeight: 19,
    letterSpacing: -0.02, // React Native does not support 'em' units, so use a decimal value for letter spacing
    textTransform: "uppercase",
  },
  dateText: {
    fontFamily: "InstrumentSansSemiBold",
    fontWeight: "400", // Regular weight
    fontSize: 11,
    lineHeight: 19,
    letterSpacing: -0.02, // React Native uses numeric values for letter-spacing
    textTransform: "uppercase",
    opacity: 0.4,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  starRatingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    marginVertical: 8,
    width: "95%",
    alignSelf: "center",
  },
  messageText: {
    fontWeight: "400", // Regular weight
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.02, // React Native uses numeric values for letter-spacing
    textTransform: "uppercase",
  },
});

export default ReviewCard;
