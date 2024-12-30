import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import KeyValueTable, { Entry } from "@/components/Table";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  PADDING_LAYOUT,
  SECTION_DISTANCE,
  TAB_BAR_HEIGHT,
} from "@/constants/Layout";
import CircularButton from "@/components/buttons/CircularButton";
import RoundedButton from "@/components/buttons/RoundedButton";
import ProviderDetailsCard from "@/components/cards/client/ProviderDetailsCard";
import { router } from "expo-router";
import ReviewCard from "@/components/cards/client/ReviewCard";

type ServiceDetails = {
  service_type: string;
  service_price: string;
  service_duration: string;
};

type ServiceDetailsTableProps = {
  serviceDetails: ServiceDetails;
  itemThemeColor: string;
  borderThemeColor: string;
  textThemeColor: string;
  highlightThemeColor: string;
};

const ServiceDetailsTable: React.FC<ServiceDetailsTableProps> = ({
  serviceDetails,
  itemThemeColor,
  borderThemeColor,
  textThemeColor,
  highlightThemeColor,
}) => {
  return (
    <View
      style={[
        serviceDetailsStyles.tableContainer,
        {
          backgroundColor: itemThemeColor,
          borderColor: borderThemeColor,
        },
      ]}
    >
      {/* First Row */}
      <View style={serviceDetailsStyles.row}>
        {/* Left: Category Title and Value */}
        <View style={serviceDetailsStyles.leftSide}>
          <Text
            style={[
              serviceDetailsStyles.categoryTitle,
              { color: textThemeColor },
            ]}
          >
            Service Details
          </Text>
          <Text style={[serviceDetailsStyles.value, { color: textThemeColor }]}>
            {serviceDetails.service_type}
          </Text>
        </View>

        {/* Right: Category Title and Pink Value (if available) */}
        <View style={serviceDetailsStyles.rightSide}>
          <Text
            style={[
              serviceDetailsStyles.categoryTitle,
              { color: textThemeColor },
            ]}
          >
            Service Price
          </Text>
          <Text
            style={[
              serviceDetailsStyles.pinkValue,
              { color: highlightThemeColor },
            ]}
          >
            {serviceDetails.service_price}
          </Text>
        </View>
      </View>

      {/* Partial Line */}
      <View
        style={[
          serviceDetailsStyles.partialLine,
          { backgroundColor: borderThemeColor },
        ]}
      />

      {/* Second Row */}
      <View style={serviceDetailsStyles.row}>
        {/* Left: Category Title and Value */}
        <View style={serviceDetailsStyles.leftSide}>
          <Text
            style={[
              serviceDetailsStyles.categoryTitle,
              { color: textThemeColor },
            ]}
          >
            Approximate Duration
          </Text>
          <Text style={[serviceDetailsStyles.value, { color: textThemeColor }]}>
            {serviceDetails.service_duration}
          </Text>
        </View>
      </View>
    </View>
  );
};

const imageMap: Record<string, any> = {
  "1": require("@/assets/images/recommendation-1.png"),
  "2": require("@/assets/images/recommendation-2.png"),
  "3": require("@/assets/images/recommendation-3.png"),
};

const ProviderDetails: React.FC = () => {
  const { id } = useLocalSearchParams(); // Access the 'url' query parameter

  // Ensure `url` is a string (not an array)
  const imageSource =
    typeof id === "string" && imageMap[id] ? imageMap[id] : null;

  const businessData: Entry[] = [
    { label: "MINIMUM BOOKING NOTICE", value: "2 HOURS" },
    { label: "MAXIMUM BOOKING NOTICE", value: "30 DAYS" },
    { label: "CANCELLATION FEE", value: "$50" },
  ];

  const serviceDetails = {
    service_type: "Chemical Peeling",
    service_price: "$300",
    service_duration: "15 minutes",
  };

  const reviewData = [
    {
      id: 1,
      name: "Mary Jane",
      profileImage: require("@/assets/images/reviewer1.png"),
      date: "12 DEC 2024",
      starRating: 4.3,
      message: "best esthetician in town. si recommend this beauty expert.",
    },

    {
      id: 2,
      name: "Felicia Hardy",
      profileImage: require("@/assets/images/reviewer2.png"),
      date: "18 DEC 2024",
      starRating: 4.7,
      message: "Excellent service",
    },
  ];

  const highlightThemeColor = useThemeColor({}, "highlighted");
  const borderThemeColor = useThemeColor({}, "border");
  const itemThemeColor = useThemeColor({}, "item");
  const textThemeColor = useThemeColor({}, "text");

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={[
          "header",
          "overview",
          "servicedetails",
          "policies",
          "reviews",
          "booking",
        ]}
        renderItem={({ item }) => {
          switch (item) {
            case "header":
              return (
                <View style={styles.header}>
                  {/* Header with two buttons and the centered title */}

                  <CircularButton
                    size={40}
                    iconType={"arrow-left"}
                    onPress={function (): void {
                      router.back();
                    }}
                  />
                  <ThemedText style={styles.headerTitle}>
                    Provider Details
                  </ThemedText>
                  <CircularButton
                    size={40}
                    iconType={"vertical-dots"}
                    onPress={function (): void {
                      router.replace("/(client)/(tabs)/profile");
                    }}
                  />
                </View>
              );

            case "overview":
              return (
                <View style={styles.centeredSlides}>
                  <ProviderDetailsCard
                    id={""}
                    backgroundImage={imageSource}
                    companyLogo={require("@/assets/images/companyLogo1.png")}
                    companyTitle={"Derma Care Clinic"}
                    starRating={4}
                    numberOfReviews={922}
                    openingTimes={{
                      Monday: { openingTime: "09:00", closingTime: "17:00" },
                      Tuesday: { openingTime: "09:00", closingTime: "17:00" },
                      Wednesday: { openingTime: "10:00", closingTime: "17:00" },
                      Thursday: { openingTime: "09:00", closingTime: "17:00" },
                      Friday: { openingTime: "09:00", closingTime: "17:00" },
                      Saturday: { openingTime: "10:00", closingTime: "14:00" },
                      Sunday: null, // Closed all day}} address={"123 Lincon St., Basus, Nigeria"} phoneNumber={"123 456 789"} bookmarkFunction={function (): void {
                    }}
                    mappingFunction={function (): void {}}
                    address={"123 Lincon St., Basus, Nigeria"}
                    phoneNumber={"123 456 789"}
                    bookmarkFunction={function (): void {}}
                    width={353}
                    height={264}
                  />
                </View>
              );

            case "servicedetails":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">Service Details</ThemedText>
                  <ServiceDetailsTable
                    serviceDetails={serviceDetails}
                    itemThemeColor={itemThemeColor}
                    borderThemeColor={borderThemeColor}
                    textThemeColor={textThemeColor}
                    highlightThemeColor={highlightThemeColor}
                  />
                </View>
              );

            case "policies":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">
                    Booking Rules & Policies
                  </ThemedText>
                  <KeyValueTable data={businessData} />
                </View>
              );
            case "reviews":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">reviews</ThemedText>

                  <FlatList
                    horizontal
                    data={reviewData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <ReviewCard
                        name={item.name}
                        profileImage={item.profileImage} // Replace with your local image path
                        date={item.date}
                        starRating={item.starRating}
                        message={item.message}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 10 }} />
                    )}
                  />
                </View>
              );

            case "booking":
              return (
                <View style={styles.buttonsSection}>
                  {/* Circular Button 1 */}
                  <CircularButton
                    size={50}
                    iconType={"phone"} // Replace "add" with the actual icon type
                    onPress={() => console.log("call")}
                    iconColor="black"
                  />

                  {/* Circular Button 2 */}
                  <CircularButton
                    size={50}
                    iconType={"mail"} // Replace "share" with the actual icon type
                    onPress={() => console.log("mail")}
                    iconColor="black"
                  />

                  {/* Rounded Button */}
                  <RoundedButton
                    backgroundColor="black"
                    textColor="white"
                    onPress={() => console.log("Rounded Button Pressed")}
                    text="Book Now"
                  />
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

export default ProviderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING_LAYOUT,
    marginBottom: TAB_BAR_HEIGHT,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "space-evenly",
  },
  section: {
    marginBottom: SECTION_DISTANCE,
  },

  centeredSlides: {
    flex: 1, // Ensure the section takes up the available space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    marginBottom: SECTION_DISTANCE,
  },

  buttonsSection: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute buttons evenly
    alignItems: "center", // Align buttons vertically
    marginBottom: SECTION_DISTANCE,
  },

  listContent: {
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SECTION_DISTANCE,
    marginBottom: 30,
  },

  headerTitle: {
    fontFamily: "InstrumentSansBold",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: -0.02 * 16,
    textTransform: "uppercase",
  },
});

const serviceDetailsStyles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderRadius: 19,
    padding: 15,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSide: {
    alignItems: "flex-start",
  },
  rightSide: {
    alignItems: "flex-end",
  },
  categoryTitle: {
    fontFamily: "InstrumentSansBold",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.02,
    textTransform: "uppercase",
    opacity: 0.6,
    marginBottom: 4,
  },
  value: {
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  pinkValue: {
    fontFamily: "Source Sans Pro",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  partialLine: {
    height: 1,
    marginVertical: 15,
  },
});
