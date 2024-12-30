import React from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";

import { useRouter } from "expo-router";

type SlideProps = {
  id: string | number;
  image: any; // Local image resource (e.g., require('./image.png'))
  url: string; // URL to redirect when the slide is clicked
  width: number; // Slide width
  height: number; // Slide height
  borderRadius?: number; // Optional border radius for rounded corners
};

const Slide: React.FC<SlideProps> = ({
  image,
  id,
  url,
  width,
  height,
  borderRadius = 10,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(
      `/(tabs)/beautyconsultation/providers/${id}?url=${encodeURIComponent(
        url
      )}`
    ); // Navigate to the dynamic route
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.slideContainer, { width, height, borderRadius }]}
    >
      <Image
        source={image}
        style={[styles.image, { width, height, borderRadius }]}
        resizeMode="cover"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  slideContainer: {},
  image: {
    flex: 1,
  },
});

export default Slide;
