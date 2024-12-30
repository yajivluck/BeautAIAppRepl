import CircularButton from "@/components/buttons/CircularButton";
import { ThemedItem } from "@/components/ThemedItem";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

type PollPostProps = {
  postId: string;
  name: string;
  profileImage: any; // Assuming local images using `require()`
  time: string;
  date: string;
  question: string;
  options: string[];
  participants: number;
  shares: number;
  onEditPress: () => void;
  onSharePress: () => void;
};

const PollPost: React.FC<PollPostProps> = ({
  name,
  profileImage,
  time,
  date,
  question,
  options,
  participants,
  shares,
  onEditPress,
  onSharePress,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Render each option
  const renderOption = (item: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.optionContainer}
      onPress={() => setSelectedOption(index)}
    >
      <View
        style={[
          styles.radioButton,
          selectedOption === index && styles.radioButtonSelected,
        ]}
      >
        {selectedOption === index && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <ThemedText style={styles.optionText}>{item}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedItem style={styles.card}>
      {/* Header Section */}
      <View>
        <ThemedText style={styles.polledByText}>• Poll by</ThemedText>
        <View style={styles.header}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.headerText}>
            <ThemedText style={styles.name}>{name}</ThemedText>
            <ThemedText style={styles.timestamp}>
              {time} • {date}
            </ThemedText>
          </View>

          <CircularButton
            size={28}
            iconType={"horizontal-dots"}
            onPress={onEditPress}
            backgroundColor="transparent"
            iconColor={useThemeColor({}, "text")}
          />
        </View>
      </View>

      {/* Separator */}
      <View
        style={[
          styles.separator,
          { backgroundColor: useThemeColor({}, "border") },
        ]}
      />

      {/* Content Section */}
      <View style={styles.content}>
        <ThemedText style={styles.question}>{question}</ThemedText>
        <FlatList
          data={options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => renderOption(item, index)}
          style={styles.optionsList}
        />
      </View>

      {/* Separator */}
      <View
        style={[
          styles.separator,
          { backgroundColor: useThemeColor({}, "border") },
        ]}
      />

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.participantsContainer}>
          <ThemedText style={styles.footerLabel}>
            {participants} Participants
          </ThemedText>
        </View>
        <TouchableOpacity style={styles.footerButton} onPress={onSharePress}>
          <AntDesign
            name="sharealt"
            size={24}
            style={[
              styles.icon,
              { color: useThemeColor({}, "text"), opacity: 0.8 },
            ]}
          />
          <ThemedText style={styles.footerLabel}>{shares} Shares</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedItem>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    padding: "5%",
    marginVertical: "2%",
  },
  polledByText: {
    fontSize: 16,
    color: "#888",
    marginBottom: "2%",
    textTransform: "uppercase",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  profileImage: {
    width: "12%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 50,
  },
  headerText: {
    flex: 1,
    marginHorizontal: "5%",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  timestamp: {
    fontSize: 12,
  },

  separator: {
    height: 1,
    marginVertical: "3%",
  },
  content: {
    marginBottom: "3%",
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "4%",
    textTransform: "uppercase",
  },
  optionsList: {
    marginBottom: "3%",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    marginVertical: "2%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "pink",
    backgroundColor: "pink",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  optionText: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 12,
    marginRight: "2%",
  },
  footerLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    opacity: 0.4,
  },

  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PollPost;
