import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import {
  PADDING_LAYOUT,
  SECTION_DISTANCE,
  TAB_BAR_HEIGHT,
} from "@/constants/Layout";
import { ThemedText } from "@/components/ThemedText";
import UserLogoSignature from "@/components/UserSignature/UserLogoSignature";
import UpcomingAppointment from "@/components/cards/client/UpcomingAppointmentCard";
import SavedProviderCard from "@/components/cards/client/SavedProviderCard";
import PastServiceCard from "@/components/cards/client/PastServiceCard";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

const App = () => {
  const userData = {
    id: "1",
    username: "Naomi Haynes",
    image: require("@/assets/images/image-profile-2.png"),
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
        data={["header", "appointments", "providers", "pastServices"]}
        renderItem={({ item }) => {
          switch (item) {
            case "header":
              return (
                <View style={styles.header}>
                  <UserLogoSignature
                    imageSource={userData.image}
                    username={userData.username}
                    onPress={() => {}}
                    iconType="notifications"
                  />
                </View>
              );
            case "appointments":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">
                    Upcoming Appointments
                  </ThemedText>

                  <FlatList
                    data={upcomingAppointments}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <UpcomingAppointment
                        professionals={item.professionals}
                        id={item.id}
                        serviceType={item.serviceType}
                        time={item.time}
                        date={item.date}
                        companyLogo={item.companyLogo}
                        companyTitle={item.companyTitle}
                        backgroundImage={item.backgroundImage}
                        width={352}
                        height={192}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 10 }} />
                    )}
                  />
                </View>
              );
            case "providers":
              return (
                <View style={styles.section}>
                  <View style={styles.headerContainer}>
                    <ThemedText type="sectionHeader">
                      saved providers
                    </ThemedText>

                    <ThemedText type="sectionHeader">
                      see all{" "}
                      <AntDesign name="down" size={24} color={downbtnColor} />
                    </ThemedText>
                  </View>
                  <FlatList
                    horizontal
                    data={savedProviders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <SavedProviderCard
                        id={item.id}
                        onBookmarkPress={function (): void {}}
                        companyLogo={item.companyLogo}
                        companyTitle={item.companyTitle}
                        backgroundImage={item.backgroundImage}
                        width={169}
                        height={192}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 10 }} />
                    )}
                  />
                </View>
              );
            case "pastServices":
              return (
                <View style={styles.section}>
                  <View style={styles.headerContainer}>
                    <ThemedText type="sectionHeader">Past services</ThemedText>

                    <ThemedText type="sectionHeader">
                      sort by{" "}
                      <AntDesign name="down" size={24} color={downbtnColor} />
                    </ThemedText>
                  </View>

                  <FlatList
                    data={pastServices}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <PastServiceCard
                        serviceType={item.serviceType}
                        date={item.date}
                        onRedirect={function (): void {}}
                        companyLogo={item.companyLogo}
                        companyTitle={item.companyTitle}
                        backgroundImage={item.backgroundImage}
                        starRating={item.starRating}
                        width={354}
                        height={136}
                      />
                    )}
                    showsVerticalScrollIndicator={false} // To hide vertical scroll indicator
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 10 }} /> // Adjusted height for vertical separation
                    )}
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

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default App;

// import React, { useState } from "react";
// import { View, FlatList, StyleSheet } from "react-native";
// import { ThemedView } from "@/components/ThemedView";
// import {
//   PADDING_LAYOUT,
//   SECTION_DISTANCE,
//   TAB_BAR_HEIGHT,
// } from "@/constants/Layout";
// import { ThemedText } from "@/components/ThemedText";

// import { AntDesign } from "@expo/vector-icons";
// import { useThemeColor } from "@/hooks/useThemeColor";
// import MappedServiceProviderCard from "@/components/cards/client/MappedServiceProviderCard";
// import RecommendationTreatmentCard from "@/components/cards/client/RecommendationTreatmentCard";
// import ProviderDetailsCard from "@/components/cards/client/ProviderDetailsCard";
// import ServiceDetailsCard from "@/components/cards/business/ServiceDetailsCard";
// import AppointmentDetailsCard from "@/components/cards/business/AppointmentDetailsCard";

// const App = () => {
//   const userData = {
//     id: "1",
//     username: "Naomi Haynes",
//     image: require("@/assets/images/image-profile-2.png"),
//   };

//   const treatments = [
//     {
//       id: "1",
//       professionals: "injectors",
//       companyLogo: require("@/assets/images/companyLogo1.png"),
//       companyTitle: "Derma Care Clinic",
//       starRating: 4.5,
//       numberOfReviews: 123,
//       address: "123 Lincon St., Basus, Nigeria",
//       distance: "5.4 km",
//       backgroundImage: require("@/assets/images/image-map-1.png"),
//       openingTimes: {
//         Monday: { openingTime: "09:00", closingTime: "17:00" },
//         Tuesday: { openingTime: "09:00", closingTime: "17:00" },
//         Wednesday: { openingTime: "10:00", closingTime: "17:00" },
//         Thursday: { openingTime: "09:00", closingTime: "17:00" },
//         Friday: { openingTime: "09:00", closingTime: "17:00" },
//         Saturday: { openingTime: "10:00", closingTime: "14:00" },
//         Sunday: null, // Closed all day
//       },
//     },
//     {
//       id: "2",
//       professionals: "injectors",
//       companyLogo: require("@/assets/images/companyLogo3.png"),
//       companyTitle: "Echo Beauty Clinic",
//       starRating: 4.5,
//       numberOfReviews: 123,
//       address: "123 Lincon St., Basus, Nigeria",
//       distance: "5.4 km",
//       backgroundImage: require("@/assets/images/image-map-2.png"),
//       openingTimes: {
//         Monday: { openingTime: "09:00", closingTime: "17:00" },
//         Tuesday: { openingTime: "09:00", closingTime: "17:00" },
//         Wednesday: { openingTime: "10:00", closingTime: "17:00" },
//         Thursday: { openingTime: "09:00", closingTime: "17:00" },
//         Friday: { openingTime: "09:00", closingTime: "17:00" },
//         Saturday: { openingTime: "10:00", closingTime: "14:00" },
//         Sunday: null, // Closed all day
//       },
//     },
//   ];

//   const recommendations = [
//     {
//       id: "1",
//       treatmentType: "injections",
//       backgroundImage: require("@/assets/images/recommendation-1.png"),
//       treatment: "lip filler",
//       companyTitle: "Derma Care Clinic",
//       companyLogo: require("@/assets/images/companyLogo1.png"),
//       address: "123 Lincon St., Basus, Nigeria",
//       distance: "5.4 km",
//     },

//     {
//       id: "2",
//       treatmentType: "laser",
//       backgroundImage: require("@/assets/images/recommendation-2.png"),
//       treatment: "laser hair removal",
//       companyTitle: "Derma Care Clinic",
//       companyLogo: require("@/assets/images/companyLogo1.png"),
//       address: "123 Lincon St., Basus, Nigeria",
//       distance: "5.4 km",
//     },

//     {
//       id: "3",
//       treatmentType: "injections",
//       backgroundImage: require("@/assets/images/recommendation-3.png"),
//       treatment: "lip filler",
//       companyTitle: "Derma Care Clinic",
//       companyLogo: require("@/assets/images/companyLogo1.png"),
//       address: "123 Lincon St., Basus, Nigeria",
//       distance: "5.4 km",
//     },
//   ];

//   const providers = [
//     {
//       id: "1",
//       companyLogo: require("@/assets/images/companyLogo1.png"),
//       companyTitle: "Derma Care Clinic",
//       starRating: 4.5,
//       numberOfReviews: 123,
//       address: "123 Lincon St., Basus, Nigeria",
//       phone: "123 456 789",
//       backgroundImage: require("@/assets/images/recommendation-1.png"),
//       openingTimes: {
//         Monday: { openingTime: "09:00", closingTime: "17:00" },
//         Tuesday: { openingTime: "09:00", closingTime: "17:00" },
//         Wednesday: { openingTime: "10:00", closingTime: "17:00" },
//         Thursday: { openingTime: "09:00", closingTime: "17:00" },
//         Friday: { openingTime: "09:00", closingTime: "17:00" },
//         Saturday: { openingTime: "10:00", closingTime: "14:00" },
//         Sunday: null, // Closed all day
//       },
//     },
//     {
//       id: "2",
//       companyLogo: require("@/assets/images/companyLogo1.png"),
//       companyTitle: "Derma Care Clinic",
//       starRating: 4.5,
//       numberOfReviews: 123,
//       address: "123 Lincon St., Basus, Nigeria",
//       phone: "123 456 789",
//       backgroundImage: require("@/assets/images/recommendation-2.png"),
//       openingTimes: {
//         Monday: { openingTime: "09:00", closingTime: "17:00" },
//         Tuesday: { openingTime: "09:00", closingTime: "17:00" },
//         Wednesday: { openingTime: "10:00", closingTime: "17:00" },
//         Thursday: { openingTime: "09:00", closingTime: "17:00" },
//         Friday: { openingTime: "09:00", closingTime: "17:00" },
//         Saturday: { openingTime: "10:00", closingTime: "14:00" },
//         Sunday: null, // Closed all day
//       },
//     },

//     {
//       id: "3",
//       companyLogo: require("@/assets/images/companyLogo1.png"),
//       companyTitle: "Derma Care Clinic",
//       starRating: 4.5,
//       numberOfReviews: 123,
//       address: "123 Lincon St., Basus, Nigeria",
//       phone: "123 456 789",
//       backgroundImage: require("@/assets/images/recommendation-3.png"),
//       openingTimes: {
//         Monday: { openingTime: "09:00", closingTime: "17:00" },
//         Tuesday: { openingTime: "09:00", closingTime: "17:00" },
//         Wednesday: { openingTime: "10:00", closingTime: "17:00" },
//         Thursday: { openingTime: "09:00", closingTime: "17:00" },
//         Friday: { openingTime: "09:00", closingTime: "17:00" },
//         Saturday: { openingTime: "10:00", closingTime: "14:00" },
//         Sunday: null, // Closed all day
//       },
//     },
//   ];

//   const servicedetails = [
//     {
//       id: "1",
//       backgroundImage: require("@/assets/images/recommendation-2.png"),
//       serviceType: "laser",
//       serviceName: "laser hair removal",
//       time: "09:30 AM",
//       date: "12 June 2024",
//       serviceDuration: "45 minutes",
//       servicePrice: "$300",
//     },
//     {
//       id: "2",
//       backgroundImage: require("@/assets/images/image-search-1.png"),
//       serviceType: "estheticians",
//       serviceName: "chemical peeling",
//       time: "09:30 AM",
//       date: "12 June 2024",
//       serviceDuration: "45 minutes",
//       servicePrice: "$300",
//     },
//   ];

//   const appointmentDetails = [
//     {
//       id: "1",
//       backgroundImage: require("@/assets/images/recommendation-2.png"),
//       time: "09:30 AM",
//       date: "12 June 2024",
//     },
//     {
//       id: "2",
//       backgroundImage: require("@/assets/images/image-search-1.png"),
//       time: "09:30 AM",
//       date: "12 June 2024",
//     },
//   ];

//   return (
//     <ThemedView style={styles.container}>
//       <FlatList
//         data={[
//           "treatments",
//           "recommendations",
//           "providers",
//           "servicedetails",
//           "appointmentdetails",
//         ]}
//         renderItem={({ item }) => {
//           switch (item) {
//             case "treatments":
//               return (
//                 <View style={styles.section}>
//                   <FlatList
//                     horizontal
//                     data={treatments}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                       <MappedServiceProviderCard
//                         id={item.id}
//                         professionals={item.professionals}
//                         onBookmarkPress={() => {}}
//                         companyLogo={item.companyLogo}
//                         companyTitle={item.companyTitle}
//                         starRating={item.starRating}
//                         numberOfReviews={item.numberOfReviews}
//                         address={item.address}
//                         distance={item.distance}
//                         backgroundImage={item.backgroundImage}
//                         openingTimes={item.openingTimes}
//                         width={261}
//                         height={216}
//                       />
//                     )}
//                     showsHorizontalScrollIndicator={false}
//                     ItemSeparatorComponent={() => (
//                       <View style={{ width: 10 }} />
//                     )}
//                   />
//                 </View>
//               );

//             case "recommendations":
//               return (
//                 <View style={styles.section}>
//                   <FlatList
//                     data={recommendations}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                       <RecommendationTreatmentCard
//                         backgroundImage={item.backgroundImage} // Replace with your image path
//                         treatmentType={item.treatmentType}
//                         companyLogo={item.companyLogo} // Replace with your image path
//                         companyTitle={item.companyTitle}
//                         onBookmarkPress={() => {}}
//                         treatment={item.treatment}
//                         address={item.address}
//                         distance={item.distance}
//                         width="352"
//                         height="240"
//                       />
//                     )}
//                     showsVerticalScrollIndicator={false} // To hide vertical scroll indicator
//                     ItemSeparatorComponent={() => (
//                       <View style={{ height: 10 }} /> // Adjusted height for vertical separation
//                     )}
//                   />
//                 </View>
//               );

//             case "providers":
//               return (
//                 <View style={styles.section}>
//                   <FlatList
//                     horizontal
//                     data={providers}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                       <ProviderDetailsCard
//                         id={item.id}
//                         bookmarkFunction={() => {}}
//                         mappingFunction={() => {}}
//                         companyLogo={item.companyLogo}
//                         companyTitle={item.companyTitle}
//                         starRating={item.starRating}
//                         numberOfReviews={item.numberOfReviews}
//                         address={item.address}
//                         phoneNumber={item.phone}
//                         backgroundImage={item.backgroundImage}
//                         openingTimes={item.openingTimes}
//                         width={353}
//                         height={264}
//                       />
//                     )}
//                     showsHorizontalScrollIndicator={false}
//                     ItemSeparatorComponent={() => (
//                       <View style={{ width: 10 }} />
//                     )}
//                   />
//                 </View>
//               );

//             case "servicedetails":
//               return (
//                 <View style={styles.section}>
//                   <FlatList
//                     horizontal
//                     data={servicedetails}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                       <ServiceDetailsCard
//                         backgroundImage={item.backgroundImage}
//                         serviceType={item.serviceType}
//                         onEdit={() => {}}
//                         serviceName={item.serviceName}
//                         serviceDuration={item.serviceDuration}
//                         servicePrice={item.servicePrice}
//                         time={item.time}
//                         date={item.date}
//                         width={352}
//                         height={192}
//                       />
//                     )}
//                     showsHorizontalScrollIndicator={false}
//                     ItemSeparatorComponent={() => (
//                       <View style={{ width: 10 }} />
//                     )}
//                   />
//                 </View>
//               );

//             case "appointmentdetails":
//               return (
//                 <View style={styles.section}>
//                   <FlatList
//                     horizontal
//                     data={appointmentDetails}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                       <AppointmentDetailsCard
//                         backgroundImage={item.backgroundImage}
//                         time={item.time}
//                         date={item.date}
//                         width={352}
//                         height={192}
//                       />
//                     )}
//                     showsHorizontalScrollIndicator={false}
//                     ItemSeparatorComponent={() => (
//                       <View style={{ width: 10 }} />
//                     )}
//                   />
//                 </View>
//               );

//             default:
//               return null;
//           }
//         }}
//         contentContainerStyle={styles.listContent}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: PADDING_LAYOUT,
//     marginBottom: TAB_BAR_HEIGHT,
//   },
//   header: {
//     marginTop: SECTION_DISTANCE,
//     marginBottom: 30,
//   },
//   section: {
//     marginBottom: SECTION_DISTANCE,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   textContainer: {
//     flex: 1,
//   },

//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
// });

// export default App;
