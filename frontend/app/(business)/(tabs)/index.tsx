import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import {
  PADDING_LAYOUT,
  SECTION_DISTANCE,
  TAB_BAR_HEIGHT,
} from "@/constants/Layout";
import { ThemedText } from "@/components/ThemedText";
import UserDateSignature from "@/components/UserSignature/UserDateSignature";
import UpcomingAppointment from "@/components/cards/client/UpcomingAppointmentCard";
import SavedProviderCard from "@/components/cards/client/SavedProviderCard";
import PastServiceCard from "@/components/cards/client/PastServiceCard";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import AppointmentsTracker from "@/components/charts/AppointmentsTracker";
import SalesAnalytics from "@/components/charts/SalesAnalytics";

const Home = () => {
  const userData = {
    id: "1",
    firstname: "Amy",
  };

  const upcomingAppointments = [
    {
      id: "1", // url link id for dynamic routing
      professionals: "Estheticians",
      serviceType: "Chemical Peeling",
      time: "09:30 PM",
      date: "Thursday, 12 June 2025",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Derma Skin Care Clinic",
      backgroundImage: require("@/assets/images/image-upcomingappointment1bg.png"),
    },

    {
      id: "2", // url link id for dynamic routing
      professionals: "Estheticians",
      serviceType: "Chemical Peeling",
      time: "09:30 PM",
      date: "Thursday, 12 June 2025",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Derma Skin Care Clinic",
      backgroundImage: require("@/assets/images/image-search-1.png"),
    },
  ];

  const savedProviders = [
    {
      id: "1",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Rejuvenises Day Clinic",
      backgroundImage: require("@/assets/images/image-savedprovider1bg.png"),
    },
    {
      id: "2",
      image: require("@/assets/images/image-provider1.png"),
      companyLogo: require("@/assets/images/companyLogo3.png"),
      companyTitle: "Echo Beauty",
      backgroundImage: require("@/assets/images/image-savedprovider2bg.png"),
    },
    {
      id: "3",
      image: require("@/assets/images/image-provider2.png"),
      companyLogo: require("@/assets/images/companyLogo2.png"),
      companyTitle: "Villa’s Beauty Spa & Care",
      backgroundImage: require("@/assets/images/image-savedprovider3bg.png"),
    },
  ];

  const pastServices = [
    {
      id: 1,
      serviceType: "Laser Hair Removal",
      date: "12 June 2024",
      starRating: 4.5,
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Derma Skin Care Clinic",
      backgroundImage: require("@/assets/images/image-saved-1.png"),
    },
    {
      id: 2,
      serviceType: "Face Lift",
      date: "12 June 2024",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      companyTitle: "Derma Skin Care Clinic",
      starRating: 4.5,
      backgroundImage: require("@/assets/images/image-provider2.png"),
    },
  ];

  const downbtnColor = useThemeColor({}, "text");

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={["header", "appointments", "analytics", "growth"]}
        renderItem={({ item }) => {
          switch (item) {
            case "header":
              return (
                <View style={styles.header}>
                  <UserDateSignature
                    userName={userData.firstname}
                    Icon1="notifications"
                    Icon2="settings"
                    onButton1Press={function (): void {}}
                    onButton2Press={function (): void {}}
                  />
                </View>
              );
            case "appointments":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">
                    appointments overview
                  </ThemedText>

                  <AppointmentsTracker />
                </View>
              );
            case "analytics":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">sales analytics</ThemedText>

                  <SalesAnalytics />
                </View>
              );
            case "growth":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">Clients growth</ThemedText>
                </View>
              );
            default:
              return null;
          }
        }}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING_LAYOUT,
    marginBottom: TAB_BAR_HEIGHT,
  },
  header: {
    marginTop: SECTION_DISTANCE,
    marginBottom: 30,
  },
  section: {
    marginBottom: SECTION_DISTANCE,
  },
  listContent: {
    paddingBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
});

export default Home;
