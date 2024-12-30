import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

interface ProviderCardProps {
  providerName: string;
  image: any;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ providerName, image }) => {
  return (
    <View style={styles.providerCard}>
      <TouchableOpacity>
        <Image source={image} style={styles.image} />
        <Text style={styles.providerText}>{providerName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  providerCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#ddd",
    marginRight: width * 0.02,
    overflow: "hidden",
    alignItems: "center",
    position: "relative",
    width: width * 0.4,
  },
  image: {
    width: width * 0.4,
    height: width * 0.5,
    borderRadius: 8,
    resizeMode: "cover",
  },
  providerText: {
    position: "absolute",
    bottom: 8,
    left: 8,
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: width * 0.035,
    fontWeight: "bold",
    maxWidth: "90%",
  },
});

export default ProviderCard;
