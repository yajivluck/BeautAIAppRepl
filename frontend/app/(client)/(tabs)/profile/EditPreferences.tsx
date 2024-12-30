import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  PADDING_LAYOUT,
  SECTION_DISTANCE,
  TAB_BAR_HEIGHT,
} from "@/constants/Layout";
import CircularButton from "@/components/buttons/CircularButton";
import RoundedButton from "@/components/buttons/RoundedButton";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { ThemedItem } from "@/components/ThemedItem";

type Question = {
  sectionName?: string;
  question: string;
  answers: string[];
};

const EditPreferences: React.FC = () => {
  const profile = {
    name: "Naomi Haynes",
    email: "nayomi.hanes@outlook.com",
    profileImage: require("@/assets/images/image-profile-2.png"),
    beautyGoals: "Clear Acne",
    skinType: "Dry",
    treatmentPreferences: "Chemical Peels",
    productPreferences: "Fragrant",
  };

  // Questions and Answers
  const questions: Question[] = [
    {
      sectionName: "beauty goals",
      question: "What is your primary concern?",
      answers: [
        "Acne and Blemishes",
        "Wrinkles and Fine Lines",
        "Hyperpigmentation x Dark Spots",
        "Dryness and Dehydration",
        "Dark Circles and Puffiness",
      ],
    },
    {
      sectionName: "Expenditure",
      question: "How much would you like to spend?",
      answers: ["Under $50", "$50-$100", "$101-$300", "Over $300"],
    },
    {
      sectionName: "Comfortability",
      question: "How comfortable are you with invasive treatments?",
      answers: [
        "Comfortable/Very Comfortable",
        "Somewhat comfortable",
        "Not comfortable",
      ],
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string[]>
  >({});

  const toggleAnswer = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = { ...prevSelectedAnswers };
      const answers = updatedAnswers[questionIndex] || [];

      if (answers.includes(answer)) {
        updatedAnswers[questionIndex] = answers.filter((a) => a !== answer);
      } else {
        updatedAnswers[questionIndex] = [...answers, answer];
      }

      return updatedAnswers;
    });
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={["header", "logo", "overview", "preferences", "apply"]}
        renderItem={({ item }) => {
          switch (item) {
            case "header":
              return (
                <View style={styles.header}>
                  <CircularButton
                    size={40}
                    iconType={"arrow-left"}
                    onPress={() => router.back()}
                  />
                  <View style={styles.titleWrapper}>
                    <ThemedText style={styles.headerTitle}>
                      Edit Preferences
                    </ThemedText>
                  </View>
                </View>
              );

            case "logo":
              return (
                <View style={[styles.section, { alignItems: "center" }]}>
                  {/* Circular Image Wrapper */}
                  <View style={styles.logoWrapper}>
                    {/* Local Image */}
                    <Image
                      source={profile.profileImage}
                      style={styles.logoImage}
                    />
                    {/* Centered Camera Icon */}
                    <View style={styles.cameraIcon}>
                      <AntDesign name="camera" size={24} color="white" />
                    </View>
                  </View>
                </View>
              );

            case "overview":
              return (
                <View style={styles.section}>
                  {/* Name Section */}
                  <View style={styles.fieldSection}>
                    <ThemedText
                      style={styles.fieldLabel}
                      type="sectionSubheader"
                    >
                      Name
                    </ThemedText>
                    <ThemedItem style={styles.fieldValue}>
                      <ThemedText
                        style={[
                          styles.fieldText,
                          { textTransform: "uppercase" },
                        ]}
                      >
                        {profile.name}
                      </ThemedText>
                    </ThemedItem>
                  </View>

                  {/* Email Section */}
                  <View style={styles.fieldSection}>
                    <ThemedText
                      style={styles.fieldLabel}
                      type="sectionSubheader"
                    >
                      Email
                    </ThemedText>
                    <ThemedItem style={styles.fieldValue}>
                      <ThemedText style={styles.fieldText}>
                        {profile.email}
                      </ThemedText>
                    </ThemedItem>
                  </View>
                </View>
              );

            case "preferences":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader" style={{ marginBottom: 20 }}>
                    Your Beauty Preferences
                  </ThemedText>

                  <FlatList
                    data={questions}
                    renderItem={({ item, index }) => {
                      return (
                        <>
                          <ThemedText type="sectionSubheader">
                            {item.sectionName}
                          </ThemedText>
                          <ThemedItem
                            style={styles.questionContainer}
                            key={index}
                          >
                            <ThemedText style={styles.questionText}>
                              {item.question}
                            </ThemedText>

                            {/* Answers with Custom Checkboxes */}
                            {item.answers.map((answer, answerIndex) => (
                              <View
                                key={answerIndex}
                                style={styles.checkboxContainer}
                              >
                                <TouchableOpacity
                                  onPress={() => toggleAnswer(index, answer)}
                                >
                                  <ThemedItem
                                    style={[
                                      styles.checkbox,
                                      selectedAnswers[index]?.includes(
                                        answer
                                      ) && styles.checkboxChecked,
                                    ]}
                                  >
                                    <AntDesign
                                      name={
                                        selectedAnswers[index]?.includes(answer)
                                          ? "check"
                                          : undefined
                                      }
                                      size={24}
                                      color={"#fff"}
                                    />
                                  </ThemedItem>
                                </TouchableOpacity>
                                <ThemedText
                                  style={[
                                    styles.answerText,
                                    selectedAnswers[index]?.includes(answer) &&
                                      styles.selectedAnswerText,
                                  ]}
                                >
                                  {answer}
                                </ThemedText>
                              </View>
                            ))}
                          </ThemedItem>
                        </>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContent}
                  />
                </View>
              );
            case "apply":
              return (
                <View style={styles.buttonsSection}>
                  <RoundedButton
                    backgroundColor="black"
                    textColor="white"
                    onPress={() => {
                      console.log("Tracked Answers:", selectedAnswers);
                      router.replace("/(client)/(tabs)/profile");
                    }}
                    text="SAVE CHANGES"
                    width="100%"
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

export default EditPreferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING_LAYOUT,
    marginBottom: TAB_BAR_HEIGHT,
  },
  section: {
    marginBottom: SECTION_DISTANCE,
  },

  buttonsSection: {
    flexDirection: "row",
    justifyContent: "center", // Distribute buttons evenly
    alignItems: "center", // Align buttons vertically
    marginBottom: SECTION_DISTANCE,
  },

  listContent: {
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SECTION_DISTANCE,
    marginBottom: 30,
    width: "100%", // Ensure full width for correct centering
  },

  titleWrapper: {
    flex: 1, // Take up remaining space
    alignItems: "center", // Horizontally center title within the wrapper
  },

  headerTitle: {
    fontFamily: "InstrumentSansBold",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: -0.02 * 16,
    textTransform: "uppercase",
    textAlign: "center", // Center the text inside the wrapper
  },

  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60, // Makes it circular
    overflow: "hidden",
    position: "relative",
  },

  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image covers the area
  },

  cameraIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center", // Horizontally center the icon
    justifyContent: "center", // Vertically center the icon
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },

  fieldSection: {
    marginBottom: SECTION_DISTANCE, // Space between sections
  },

  fieldLabel: {
    marginBottom: 8, // Space between label and field
  },

  fieldValue: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
  },

  fieldText: {
    fontFamily: "InstrumentSans",
    fontSize: 16,
  },

  questionContainer: {
    borderRadius: 10,
    padding: "5%",
    marginBottom: SECTION_DISTANCE,
  },
  questionText: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 20,
    fontFamily: "InstrumentSansBold",
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  checkboxChecked: {
    backgroundColor: "#f8d7f1",
    borderColor: "#f8d7f1",
  },
  answerText: {
    fontSize: 16,
  },
  selectedAnswerText: {
    color: "#fff",
  },
});
