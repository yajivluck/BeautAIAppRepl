import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import {
  PADDING_LAYOUT,
  TAB_BAR_HEIGHT,
  SECTION_DISTANCE,
} from "@/constants/Layout";
import { ThemedText } from "@/components/ThemedText";
import UserLogoSignature from "@/components/UserSignature/UserLogoSignature";
import SearchBar from "@/components/SearchBar";
import { useThemeColor } from "@/hooks/useThemeColor";
import StandardPost from "./posts/cards/StandardPost";
import PollPost from "./posts/cards/PollPost";

interface TagProps {
  id: string;
  title: string;
  isSelected: boolean;
  onPress: (id: string) => void;
}

const Tag: React.FC<TagProps> = ({ id, title, isSelected, onPress }) => {
  const highlight = useThemeColor({}, "highlighted");
  return (
    <TouchableOpacity
      style={[
        tagsStyles.tag,
        isSelected ? { backgroundColor: highlight } : tagsStyles.tagUnselected,
      ]}
      onPress={() => onPress(id)}
    >
      <Text
        style={[
          tagsStyles.tagText,
          isSelected
            ? tagsStyles.tagTextSelected
            : tagsStyles.tagTextUnselected,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const tagsStyles = StyleSheet.create({
  tag: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagUnselected: {
    backgroundColor: "white",
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tagTextUnselected: {
    color: "rgba(0,0,0,0.4)",
  },
  tagTextSelected: {
    color: "white", // Selected text color
  },
});

const Community = () => {
  const userData = {
    id: "1",
    username: "Naomi Haynes",
    image: require("@/assets/images/image-profile-2.png"),
  };

  const tags = [
    {
      id: "1",
      title: "best botox treatment",
    },

    {
      id: "2",
      title: "acne problem solution",
    },

    {
      id: "3",
      title: "dry skin problem solution",
    },

    {
      id: "4",
      title: "sexy solution",
    },
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagPress = (id: string) => {
    setSelectedTags(
      (prevSelectedTags) =>
        prevSelectedTags.includes(id)
          ? prevSelectedTags.filter((tagId) => tagId !== id) // Deselect tag
          : [...prevSelectedTags, id] // Select tag
    );
  };

  // Effect to detect changes in selectedTags and trigger filtering
  useEffect(() => {
    handleFilter(selectedTags);
  }, [selectedTags]);

  // Barebones function to "filter"
  const handleFilter = (activeTags: string[]) => {
    console.log("Selected Tags:", activeTags);
    // Implement filtering logic here (e.g., filter data based on activeTags)
  };

  const mockPosts = [
    {
      postId: "1",
      name: "Emma Isabelle",
      profileImage: require("@/assets/images/postProfile.png"), // Replace with your local image path
      time: "10:00 AM",
      date: "Dec 15, 2024",
      message:
        "i am suffering from hyperpigmintation. suggest me a specialist.",
      postImage: require("@/assets/images/post1.png"), // Replace with your local image path
      likes: 120,
      comments: 34,
      shares: 15,
    },

    {
      postId: "2",
      name: "Samantha Gomez",
      profileImage: require("@/assets/images/postProfile.png"), // Replace with your local image path
      time: "12:00 AM",
      date: "Dec 18, 2024",
      message: "looking for an botox specialists.",
      likes: 120,
      comments: 34,
      shares: 15,
    },

    {
      postId: "3",
      name: "Samantha Gomez",
      profileImage: require("@/assets/images/postProfile.png"), // Replace with your local image path
      time: "12:30 AM",
      date: "Dec 18, 2024",
      question: "which serum you used the most",
      options: ["Cleanser", "Moisturizer", "Sunscreen"],
      participants: 120,
      shares: 15,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={["header", "search", "topics", "posts"]}
        renderItem={({ item }) => {
          switch (item) {
            case "header":
              return (
                <View style={styles.header}>
                  <UserLogoSignature
                    imageSource={userData.image}
                    username={userData.username}
                    onPress={() => {}}
                    iconType="edit"
                  />
                </View>
              );

            case "search":
              return (
                <View style={styles.section}>
                  <SearchBar
                    placeholderText="I am looking for..."
                    onSearch={(text: string) => {
                      console.log("Searching for:", text);
                    }}
                    maxWidth={350}
                    onIconPress={() => {
                      Alert.alert(
                        "Search Button Clicked",
                        "You pressed the search icon!"
                      );
                    }}
                  />
                </View>
              );

            case "topics":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">latest topics</ThemedText>

                  <FlatList
                    data={tags}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <Tag
                        id={item.id}
                        title={item.title}
                        isSelected={selectedTags.includes(item.id)}
                        onPress={handleTagPress}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 10 }} />
                    )}
                  />
                </View>
              );

            case "posts":
              return (
                <View style={styles.section}>
                  <ThemedText type="sectionHeader">latest posts</ThemedText>

                  <FlatList
                    data={mockPosts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                      item.question ? ( // Check if it's a PollPost (based on the existence of `question`)
                        <PollPost
                          postId={item.postId}
                          name={item.name}
                          profileImage={item.profileImage}
                          time={item.time}
                          date={item.date}
                          question={item.question}
                          options={item.options || []}
                          participants={item.participants || 0}
                          shares={item.shares || 0}
                          onEditPress={function (): void {}}
                          onSharePress={function (): void {}}
                        />
                      ) : (
                        // Otherwise, render a StandardPost
                        <StandardPost
                          postId={item.postId}
                          name={item.name}
                          profileImage={item.profileImage}
                          time={item.time}
                          date={item.date}
                          message={item.message || ""}
                          postImage={item.postImage}
                          likes={item.likes || 0}
                          comments={item.comments || 0}
                          shares={item.shares || 0}
                          onEditPress={function (): void {}}
                          onSharePress={function (): void {}}
                          onLikePress={function (): void {}}
                          onCommentPress={function (): void {}}
                        />
                      )
                    }
                    showsVerticalScrollIndicator={false}
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
});

export default Community;
