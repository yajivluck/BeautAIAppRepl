import CircularButton from "@/components/buttons/CircularButton";
import { ThemedItem } from "@/components/ThemedItem";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ViewStyle,
} from "react-native";

interface SavedProviderCardProps {
  id: string;
  onBookmarkPress: () => void;
  companyLogo: any;
  companyTitle: string;
  backgroundImage: any;
  width?: number | string;
  height?: number | string;
}

const SavedProviderCard: React.FC<SavedProviderCardProps> = ({
  id,
  onBookmarkPress,
  companyLogo,
  companyTitle,
  backgroundImage,
  width = 169,
  height = 192,
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
        {/* Bookmark Button */}
        <View style={styles.bookmarkButton}>
          <CircularButton
            size={20}
            iconType={"bookmark"}
            onPress={onBookmarkPress}
          />
        </View>

        {/* Company Info */}
        <View style={styles.companyInfo}>
          <Image source={companyLogo} style={styles.companyLogo} />
          <Text style={styles.companyTitle}>{companyTitle}</Text>
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
  bookmarkButton: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  companyInfo: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    alignItems: "flex-start",
  },
  companyLogo: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginBottom: "2%",
  },
  companyTitle: {
    fontSize: 14,
    color: "white",
    textAlign: "left",
    flexWrap: "wrap",
    maxWidth: 120,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
});

export default SavedProviderCard;
