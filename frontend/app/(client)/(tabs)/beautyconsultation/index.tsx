import React, { useRef, useState, useEffect } from "react";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import {
  CameraType,
  CameraView,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { useRouter } from "expo-router";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import RoundedButton from "@/components/buttons/RoundedButton";

const screenHeight = Dimensions.get("window").height; // Dynamic screen height

type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

const LShapeCorner = ({ position }: { position: Position }) => {
  return (
    <View style={[styles.corner, styles[position]]}>
      <View style={styles.horizontalLine} />
      <View style={styles.verticalLine} />
    </View>
  );
};

const PhotoPreviewSection = ({
  photo,
  handleRetakePhoto,
  handleRedirect,
}: {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
  handleRedirect: () => void;
}) => (
  <SafeAreaView style={photoPreviewStyles.container}>
    <View style={photoPreviewStyles.box}>
      <Image
        style={photoPreviewStyles.previewContainer}
        source={{ uri: "data:image/jpg;base64," + photo.base64 }}
      />
    </View>

    <View style={photoPreviewStyles.buttonContainer}>
      <TouchableOpacity
        style={photoPreviewStyles.button}
        onPress={handleRedirect}
      >
        <AntDesign name="arrowright" size={36} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={photoPreviewStyles.button}
        onPress={handleRetakePhoto}
      >
        <Fontisto name="trash" size={36} color="black" />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const photoPreviewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    borderRadius: 15,
    padding: 0,
    width: "75%",
    height: "70%",
    backgroundColor: "darkgray",
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    width: "95%",
    height: "85%",
    borderRadius: 15,
  },
  buttonContainer: {
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 50,
  },
  button: {
    backgroundColor: "gray",
    borderRadius: 45,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
});

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const [linePosition] = useState(new Animated.Value(0)); // For line animation
  const [lineOpacity] = useState(new Animated.Value(1)); // For line opacity
  const [isLineFinished, setIsLineFinished] = useState(false); // To track line animation completion
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();
  const [isLineAnimating, setIsLineAnimating] = useState(false); // To trigger line animation only when the button is clicked

  useEffect(() => {
    // Only trigger the animation when the line starts moving
    if (isLineAnimating) {
      Animated.parallel([
        Animated.timing(linePosition, {
          toValue: 1,
          duration: 3000, // Duration for the line to go from top to bottom
          useNativeDriver: false,
        }),
        Animated.timing(lineOpacity, {
          toValue: 0.2,
          duration: 3000, // This affects the opacity during the animation
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsLineFinished(true);
        // Take the photo after the animation completes
        handleTakePhoto();
      });
    }
  }, [isLineAnimating, linePosition, lineOpacity]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <AntDesign name="camera" size={80} color="#1a1c1b" />
        <Text style={styles.permissionText}>
          We need your permission to scan your face for the next step.
        </Text>

        <RoundedButton
          text="Grant Permissions"
          onPress={requestPermission}
          width="80%" // Customize width if needed
          backgroundColor="#1a1c1b" // Custom background color
          textColor="white" // Custom text color
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const takedPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takedPhoto);
    }
  };

  const handleRetakePhoto = () => {
    setPhoto(null);
    setIsLineFinished(false); // Reset line animation
    setIsLineAnimating(false); // Reset line animation state
    linePosition.setValue(0); // Reset line position
    lineOpacity.setValue(1); // Reset opacity
  };

  const startLineAnimation = () => {
    // Trigger the line animation when the "Take Photo" button is pressed
    setIsLineAnimating(true);
  };

  if (photo)
    return (
      <PhotoPreviewSection
        photo={photo}
        handleRetakePhoto={handleRetakePhoto}
        handleRedirect={() => {
          router.push("/beautyconsultation/beautyconsultationform");
        }}
      />
    );

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.cornerContainer}>
          <LShapeCorner position="topLeft" />
          <LShapeCorner position="topRight" />
          <LShapeCorner position="bottomLeft" />
          <LShapeCorner position="bottomRight" />
        </View>

        {/* Button Container for Rotate and Take Photo Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AntDesign name="retweet" size={44} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.takePhotoButton]}
            onPress={startLineAnimation}
          >
            <AntDesign name="camera" size={44} color="black" />
          </TouchableOpacity>
        </View>

        {/* Horizontal Scanning Line from Top to Bottom with Dimmed Opacity */}
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [
                {
                  translateY: linePosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, screenHeight], // Move the line from top to bottom
                  }),
                },
              ],
              opacity: lineOpacity, // Bind opacity to the animated value
            },
          ]}
        />
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  permissionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#374151",
    marginVertical: 20,
  },
  permissionButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30, // Push the buttons near the bottom of the screen
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between", // Space between the buttons
    paddingHorizontal: 50,
    marginBottom: 30, // Space from the bottom edge of the screen
  },
  button: {
    backgroundColor: "gray",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  takePhotoButton: {
    marginLeft: 20, // Add some space between the two buttons
  },
  scanLine: {
    position: "absolute",
    height: 4, // Thick horizontal line
    width: "100%", // Full screen width
    backgroundColor: "white",
    top: 0, // Start from the top
  },
  cornerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
  },
  topLeft: {
    top: "20%",
    left: "20%",
    transform: [{ rotate: "0deg" }],
  },
  topRight: {
    top: "20%",
    right: "20%",
    transform: [{ rotate: "90deg" }],
  },
  bottomLeft: {
    bottom: "30%",
    left: "20%",
    transform: [{ rotate: "270deg" }],
  },
  bottomRight: {
    bottom: "30%",
    right: "20%",
    transform: [{ rotate: "180deg" }],
  },
  horizontalLine: {
    position: "absolute",
    height: 6,
    width: "100%",
    backgroundColor: "white",
  },
  verticalLine: {
    position: "absolute",
    width: 6,
    height: "100%",
    backgroundColor: "white",
  },
});
