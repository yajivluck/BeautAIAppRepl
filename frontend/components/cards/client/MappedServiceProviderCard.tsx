import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ViewStyle,
} from "react-native";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import CircularButton from "@/components/buttons/CircularButton";
import { ThemedItem } from "@/components/ThemedItem";

interface MappedServiceProviderCardProps {
  id: string;
  professionals: string;
  onBookmarkPress: () => void;
  companyLogo: any;
  companyTitle: string;
  starRating: number;
  numberOfReviews: number;
  address: string;
  distance: string;
  backgroundImage: any;
  openingTimes: {
    [day: string]: { openingTime: string; closingTime: string } | null;
  };
  width?: number | string;
  height?: number | string;
}

const MappedServiceProviderCard: React.FC<MappedServiceProviderCardProps> = ({
  id,
  professionals,
  onBookmarkPress,
  companyLogo,
  companyTitle,
  starRating,
  numberOfReviews,
  address,
  distance,
  backgroundImage,
  openingTimes,
  width = 261,
  height = 216,
}) => {
  const getOpeningStatus = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    const currentTime = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const todaySchedule = openingTimes[currentDay];

    if (!todaySchedule) {
      return { status: "closed", message: "Closed today" };
    }

    const { openingTime, closingTime } = todaySchedule;
    if (currentTime >= openingTime && currentTime <= closingTime) {
      return { status: "open", message: `Open until ${closingTime}` };
    } else if (currentTime < openingTime) {
      return {
        status: "closed",
        message: `Opens at ${openingTime}, ${currentDay}`,
      };
    } else {
      const nextDay = daysOfWeek[(now.getDay() + 1) % 7];
      const nextDaySchedule = openingTimes[nextDay];
      if (nextDaySchedule) {
        return {
          status: "closed",
          message: `Opens at ${nextDaySchedule.openingTime}, ${nextDay}`,
        };
      }
      return { status: "closed", message: "Closed until further notice" };
    }
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
      {/* Background Image */}
      <ImageBackground
        source={backgroundImage}
        style={styles.imageBackground}
        imageStyle={styles.backgroundImage}
      >
        {/* Professionals Info */}
        <View style={styles.professionalsInfo}>
          <Text
            style={styles.professionalsText}
            numberOfLines={1} // Limits text to one line
            ellipsizeMode="tail"
          >
            {professionals}
          </Text>
        </View>

        {/* Bookmark Button */}
        <View style={styles.bookmarkButton}>
          <CircularButton
            size={20}
            iconType={"bookmark"}
            onPress={onBookmarkPress}
          />
        </View>

        {/* Company Info */}
        <View style={styles.companyInfoWrapper}>
          {/* Logo and Title */}
          <View style={styles.companyDetails}>
            <Image source={companyLogo} style={styles.companyLogo} />
            <Text style={styles.companyTitle}>{companyTitle}</Text>
          </View>
          {/* Rating and Reviews */}
          <View style={styles.ratingWrapper}>
            <AntDesign name="star" size={16} color="white" />
            <Text style={styles.ratingText}>
              <Text style={styles.starRatingText}>{starRating}</Text>
              <Text style={styles.reviewsText}> ({numberOfReviews})</Text>
            </Text>
          </View>
          {/* Opening Times */}
          <Text style={styles.openingTimesText}>
            {getOpeningStatus().status === "closed" ? (
              <>
                <Text style={styles.closedText}>Closed</Text>
                <Text style={styles.dot}> • </Text>
              </>
            ) : null}
            <Text>{getOpeningStatus().message}</Text>
          </Text>
          {/* Address and Distance */}
          <View style={styles.addressContainer}>
            <FontAwesome name="map-marker" size={10} color="white" />
            <Text style={styles.addressText}>{address}</Text>
          </View>

          <View style={styles.distanceContainer}>
            <FontAwesome5 name="walking" size={10} color="white" />
            <Text style={styles.distanceText}>
              {distance}
              <Text style={styles.awayText}> away from your location</Text>
            </Text>
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
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  professionalsInfo: {
    position: "absolute",
    top: "5%",
    left: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 24,
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
    width: "35%", // Fixed width or percentage
    overflow: "hidden", // Ensures text is clipped
  },
  professionalsText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    overflow: "hidden", // Hide overflow
    textOverflow: "ellipsis", // Show ellipsis when text overflows
  },
  bookmarkButton: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  companyInfoWrapper: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "90%",
  },
  companyDetails: {
    flexDirection: "column", // Stack items vertically
    marginBottom: "2%",
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  companyTitle: {
    color: "white",
    fontWeight: "300",
    fontSize: 20,
    lineHeight: 33,
    letterSpacing: -0.02,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "2%",
  },
  ratingText: {
    flexDirection: "row", // This allows the two parts of the text to be inline
    alignItems: "center", // Ensures they align properly
  },
  starRatingText: {
    color: "white", // Color for the star rating number
    fontWeight: "bold", // Optional, you can style it further
  },
  reviewsText: {
    color: "rgba(255, 255, 255, 0.8)", // Color for the number of reviews (in parentheses)
  },
  openingTimesText: {
    fontSize: 12,
    color: "white",
    marginBottom: "2%",
  },
  closedText: {
    color: "red",
    fontWeight: "bold",
  },
  dot: {
    color: "white",
  },

  addressContainer: {
    flexDirection: "row", // Aligns icon and text horizontally
    alignItems: "center", // Vertically center the icon and text
  },

  addressText: {
    color: "white",
    fontWeight: "300",
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: -0.02,
    marginLeft: "1%",
  },

  distanceContainer: {
    flexDirection: "row", // Aligns icon and text horizontally
    alignItems: "center", // Vertically center the icon and text
  },

  distanceText: {
    fontWeight: "300",
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: -0.02,
    color: "white",
    marginLeft: "1%",
  },

  awayText: {
    color: "rgba(255, 255, 255, 0.8)", // Color for "away from your location"
    fontWeight: "300",
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: -0.02,
  },
});

export default MappedServiceProviderCard;
