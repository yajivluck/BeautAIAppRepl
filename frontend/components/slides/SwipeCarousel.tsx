import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Slide from "./Slide"; // Import the Slide component

type SwipeCarouselProps = {
  slides: React.ReactElement[]; // List of Slide components
  slideWidth: number; // Width of each slide
  slideHeight: number; // Height of each slide
  spacing: number; // Space between slides
};

const SwipeCarousel: React.FC<SwipeCarouselProps> = ({
  slides,
  slideWidth,
  slideHeight,
  spacing,
}) => {
  const [filteredSlides, setFilteredSlides] = useState(slides);

  const filterSlides = (
    filterCondition: (slide: React.ReactElement) => boolean
  ) => {
    setFilteredSlides(slides.filter(filterCondition));
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.carouselContainer, { gap: spacing }]}
    >
      {filteredSlides.map((slide, index) => (
        <View key={index} style={{ width: slideWidth, height: slideHeight }}>
          {slide}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SwipeCarousel;
