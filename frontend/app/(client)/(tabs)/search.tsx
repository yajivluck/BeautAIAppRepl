import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SearchPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const providers = [
    {
      id: "1",
      location: "Derma Skin Care Clinic",
      rating: 4.5,
      reviews: 980,
      status: "Closed",
      openingHours: "Opens at 8:30, Wed",
      address: "123 Sainte-Catherine St W, Montreal, QC, Canada",
      coords: { latitude: 45.5048, longitude: -73.5743 },
      image: require("@/assets/images/image-search-1.png"),
    },
    {
      id: "2",
      location: "Echo Beauty Clinic",
      rating: 4.0,
      reviews: 650,
      status: "Open",
      openingHours: "Opens at 9:00, Wed",
      address: "456 Peel St, Montreal, QC, Canada",
      coords: { latitude: 45.5078, longitude: -73.5675 },
      image: require("@/assets/images/image2.png"),
    },
    {
      id: "3",
      location: "Villa's Beauty Spa",
      rating: 4.7,
      reviews: 1200,
      status: "Open",
      openingHours: "Opens at 10:00, Wed",
      address: "789 Saint-Denis St, Montreal, QC, Canada",
      coords: { latitude: 45.5065, longitude: -73.5618 },
      image: require("@/assets/images/image1.png"),
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let userLocation: any = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{errorMsg || "Fetching location..."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Ionicons
          name="chevron-back-circle-outline"
          size={40}
          color={"gray"}
          style={styles.backButton}
        />
        <AntDesign
          name="search1"
          size={40}
          color={"gray"}
          style={styles.searchButton}
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Location"
        />
        {providers.map((provider) => (
          <Marker
            key={provider.id}
            coordinate={provider.coords}
            title={provider.service}
            description={`${provider.location} (${calculateDistance(
              location.latitude,
              location.longitude,
              provider.coords.latitude,
              provider.coords.longitude
            )} km away)`}
          />
        ))}
      </MapView>

      <View style={styles.horizontalScroll}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {providers.map((provider) => (
            <View key={provider.id} style={styles.card}>
              <Image
                source={provider.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{provider.location}</Text>
                <Text style={styles.cardRating}>
                  {provider.rating} ({provider.reviews} reviews)
                </Text>
                <Text style={styles.cardStatus}>{provider.status}</Text>
                <Text style={styles.cardOpeningHours}>
                  {provider.openingHours}
                </Text>
                <Text style={styles.cardAddress}>{provider.address}</Text>
                <Text style={styles.cardDistance}>
                  {calculateDistance(
                    location.latitude,
                    location.longitude,
                    provider.coords.latitude,
                    provider.coords.longitude
                  )}{" "}
                  km away
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalScroll: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "none",
    paddingVertical: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  card: {
    width: screenWidth * 0.7,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
    elevation: 3,
    marginBottom: "15%",
    height: "75%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  cardLocation: {
    fontSize: 14,
    color: "#fff",
  },
  cardRating: {
    fontSize: 14,
    color: "#fff",
  },
  cardStatus: {
    fontSize: 14,
    color: "red",
  },
  cardOpeningHours: {
    fontSize: 14,
    color: "#fff",
  },
  cardAddress: {
    fontSize: 14,
    color: "#fff",
  },
  cardDistance: {
    fontSize: 14,
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    opacity: 1,
    marginTop: "10%",
    height: 40,
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    top: 10,
    paddingHorizontal: 10,
  },
  backButton: {
    marginLeft: 10,
  },
  searchButton: {
    marginRight: 10,
  },
});

export default SearchPage;
