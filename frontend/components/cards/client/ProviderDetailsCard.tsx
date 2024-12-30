import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import CircularButton from "@/components/buttons/CircularButton";
import { ThemedItem } from "@/components/ThemedItem";

interface ProviderDetailsCardProps {
  id: string;
  backgroundImage: any;
  companyLogo: any;
  companyTitle: string;
  starRating: number;
  numberOfReviews: number;
  openingTimes: {
    [day: string]: { openingTime: string; closingTime: string } | null;
  };
  address: string;
  phoneNumber: string;
  bookmarkFunction: () => void;
  mappingFunction: () => void;
  width?: number | string;
  height?: number | string;
}

const ProviderDetailsCard: React.FC<ProviderDetailsCardProps> = ({
  id,
  backgroundImage,
  companyLogo,
  companyTitle,
  starRating,
  numberOfReviews,
  openingTimes,
  address,
  phoneNumber,
  bookmarkFunction,
  mappingFunction,
  width = "100%",
  height = "50%",
}) => {
  // Determine if the service is currently open
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
        {/* View on Map Button */}
        <TouchableOpacity
          style={styles.mappingButton}
          onPress={mappingFunction}
        >
          <Text style={styles.mappingButtonText}>View on map</Text>
        </TouchableOpacity>

        {/* Company Info */}
        <View style={styles.companyInfoWrapper}>
          {/* Logo */}
          <Image source={companyLogo} style={styles.companyLogo} />

          {/* Title and Bookmark */}
          <View style={styles.titleAndBookmarkWrapper}>
            <Text style={styles.companyTitle}>{companyTitle}</Text>
            <CircularButton
              onPress={bookmarkFunction}
              size={20}
              iconType={"bookmark"}
            />
          </View>

          <View style={styles.ratingAndOpeningWrapper}>
            {/* Rating and Reviews */}
            <View style={styles.ratingWrapper}>
              <AntDesign name="star" size={16} color="white" />
              <Text
                style={styles.ratingText}
              >{`${starRating} (${numberOfReviews})`}</Text>
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
          </View>

          {/* Address */}
          <View style={styles.addressWrapper}>
            <FontAwesome
              name="map-marker"
              size={16}
              color="white"
              style={styles.mapIcon}
            />
            <Text style={styles.addressText}>{address}</Text>
          </View>

          {/* Phone Number */}
          <Text style={styles.phoneText}>+{phoneNumber}</Text>
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
  mappingButton: {
    position: "absolute",
    top: "5%",
    right: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 24,
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
  },
  mappingButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  companyInfoWrapper: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "90%",
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  titleAndBookmarkWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2%",
  },
  companyTitle: {
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    color: "white",
    flex: 1,
  },
  bookmarkButton: {
    alignSelf: "flex-start",
    marginBottom: "2%",
  },

  ratingAndOpeningWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2%",
  },

  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "white",
    marginLeft: "2%",
  },
  openingTimesText: {
    fontSize: 12,
    color: "white",
  },
  closedText: {
    color: "red",
    fontWeight: "bold",
  },
  dot: {
    color: "white",
  },
  addressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "2%",
  },
  mapIcon: {
    marginRight: "2%",
  },
  addressText: {
    fontSize: 14,
    color: "white",
  },
  phoneText: {
    fontSize: 14,
    color: "white",
  },
});

export default ProviderDetailsCard;
