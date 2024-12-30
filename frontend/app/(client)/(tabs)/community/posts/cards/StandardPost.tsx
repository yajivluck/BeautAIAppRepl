import React from "react";
import { ThemedItem } from "@/components/ThemedItem";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CircularButton from "@/components/buttons/CircularButton";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

interface PostProps {
  postId: string;
  name: string;
  profileImage: any; // Local image resource
  time: string;
  date: string;
  message: string;
  postImage?: any; // Optional local image resource
  likes: number;
  comments: number;
  shares: number;
  onEditPress: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
}

const StandardPost: React.FC<PostProps> = ({
  name,
  profileImage,
  time,
  date,
  message,
  postImage,
  likes,
  comments,
  shares,
  onEditPress,
  onLikePress,
  onCommentPress,
  onSharePress,
}) => {
  return (
    <ThemedItem style={styles.card}>
      {/* Header Section */}
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

      <View
        style={[
          styles.separator,
          { backgroundColor: useThemeColor({}, "border") },
        ]}
      />

      {/* Content Section */}
      <View style={styles.content}>
        <ThemedText style={styles.message}>{message}</ThemedText>
        {postImage && <Image source={postImage} style={styles.postImage} />}
      </View>

      <View
        style={[
          styles.separator,
          { backgroundColor: useThemeColor({}, "border") },
        ]}
      />

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={onLikePress}>
          <AntDesign
            name="like2"
            size={24}
            style={[
              styles.icon,
              { color: useThemeColor({}, "text"), opacity: 0.8 },
            ]}
          />
          <ThemedText style={styles.footerLabel}>{likes} Likes</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={onCommentPress}>
          <FontAwesome
            name="comments"
            size={24}
            style={[
              styles.icon,
              { color: useThemeColor({}, "text"), opacity: 0.8 },
            ]}
          />
          <ThemedText style={styles.footerLabel}>
            {comments} Comments
          </ThemedText>
        </TouchableOpacity>
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
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
    padding: "5%",
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
    marginVertical: "2%",
    width: "100%",
  },
  message: {
    fontSize: 14,
    marginBottom: "3%",
    textAlign: "left",
    textTransform: "uppercase",
  },
  postImage: {
    width: "100%",
    height: Dimensions.get("window").width * 0.5, // 50% of screen width
    borderRadius: 10,
    resizeMode: "cover",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "3%",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    fontSize: 12,
    marginRight: "2%",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: "2%",
  },
  footerLabel: {
    fontSize: 12,
    textTransform: "uppercase",
  },
});

export default StandardPost;
