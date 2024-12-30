import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import {
  PADDING_LAYOUT,
  SECTION_DISTANCE,
  TAB_BAR_HEIGHT,
} from "@/constants/Layout";
import { ThemedText } from "@/components/ThemedText";
import CompanySignature from "@/components/UserSignature/CompanySignature";
import RecommendationTreatmentCard from "@/components/cards/client/RecommendationTreatmentCard";
import { useLocalSearchParams } from "expo-router";

const beautyconsultationrecommendations = () => {
  const params = useLocalSearchParams();

  let answers: string[][] = [];
  if (typeof params.answers === "string") {
    answers = JSON.parse(params.answers);
  } else {
    console.error("Answers are not a valid string!");
  }

  console.log(answers);

  const recommendations = [
    {
      id: "1",
      treatmentType: "injections",
      backgroundImage: require("@/assets/images/recommendation-1.png"),
      treatment: "lip filler",
      companyTitle: "Derma Care Clinic",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      address: "123 Lincon St., Basus, Nigeria",
      distance: "5.4 km",
    },

    {
      id: "2",
      treatmentType: "laser",
      backgroundImage: require("@/assets/images/recommendation-2.png"),
      treatment: "laser hair removal",
      companyTitle: "Derma Care Clinic",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      address: "123 Lincon St., Basus, Nigeria",
      distance: "5.4 km",
    },

    {
      id: "3",
      treatmentType: "injections",
      backgroundImage: require("@/assets/images/recommendation-3.png"),
      treatment: "lip filler",
      companyTitle: "Derma Care Clinic",
      companyLogo: require("@/assets/images/companyLogo1.png"),
      address: "123 Lincon St., Basus, Nigeria",
      distance: "5.4 km",
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={["header", "recommendations"]}
        renderItem={({ item }) => {
          switch (item) {
            case "header":
              return (
                <View style={styles.section}>
                  <View style={styles.header}>
                    <CompanySignature />
                  </View>
                </View>
              );
            case "recommendations":
              return (
                <View style={styles.section}>
                  <View style={styles.headerContainer}>
                    <ThemedText type="sectionHeader">
                      recommended treatments
                    </ThemedText>
                  </View>

                  <FlatList
                    data={recommendations}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <RecommendationTreatmentCard
                        id={item.id}
                        backgroundImage={item.backgroundImage} // Replace with your image path
                        treatmentType={item.treatmentType}
                        companyLogo={item.companyLogo} // Replace with your image path
                        companyTitle={item.companyTitle}
                        onBookmarkPress={() => {}}
                        treatment={item.treatment}
                        address={item.address}
                        distance={item.distance}
                        width="352"
                        height="240"
                      />
                    )}
                    showsVerticalScrollIndicator={false} // To hide vertical scroll indicator
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 20 }} /> // Adjusted height for vertical separation
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

export default beautyconsultationrecommendations;

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
