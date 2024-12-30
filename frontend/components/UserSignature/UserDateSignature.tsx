// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// type UserDateSignatureProps = {
//   message: string;
//   userName: string;
//   Icon1: JSX.Element;
//   Icon2: JSX.Element;
//   onButton1Press: () => void;
//   onButton2Press: () => void;
// };

// const UserDateSignature: React.FC<UserDateSignatureProps> = ({
//   message,
//   userName,
//   Icon1,
//   Icon2,
//   onButton1Press,
//   onButton2Press,
// }) => {
//   const currentDate = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <View style={styles.container}>
//       {/* Company Logo Section */}
//       <View style={styles.companySection}>
//         <Image
//           source={require("@/assets/images/BeautAI.png")} // Replace with your actual company logo path
//           style={styles.companyLogo}
//         />
//       </View>

//       {/* Message Section */}
//       <View style={styles.messageSection}>
//         <View style={styles.inlineRow}>
//           <Text style={styles.message}>{message}</Text>
//           <Text style={styles.userName}>{userName}!</Text>
//         </View>
//         <Text style={styles.date}>{currentDate}</Text>
//       </View>

//       {/* Button Section */}
//       <View style={styles.buttonSection}>
//         <TouchableOpacity style={styles.button} onPress={onButton1Press}>
//           {Icon1}
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={onButton2Press}>
//           {Icon2}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default UserDateSignature;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#f8f8f8", // Background color for the component
//     borderRadius: 8,
//   },
//   companySection: {
//     marginRight: 8, // Spacing between company logo and message section
//   },
//   companyLogo: {
//     width: 30, // Adjust the size of the logo
//     height: 30,
//   },
//   messageSection: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   inlineRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   userName: {
//     fontFamily: "Instrument Sans",
//     fontWeight: "500",
//     fontSize: 12,
//     color: "#040404",
//     marginRight: 8, // Spacing between username and message
//     textTransform: "uppercase",
//   },
//   message: {
//     fontFamily: "Instrument Sans",
//     fontWeight: "400",
//     fontSize: 12,
//     color: "#040404",
//     opacity: 0.8,
//   },
//   date: {
//     fontFamily: "Instrument Sans",
//     fontWeight: "400",
//     fontSize: 12,
//     color: "#040404",
//     opacity: 0.5,
//     marginTop: 4,
//   },
//   buttonSection: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   button: {
//     marginLeft: 8,
//     padding: 8,
//     borderRadius: 50,
//     backgroundColor: "#eaeaea", // Background for buttons
//   },
// });

import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import CircularButton, { IconType } from "../buttons/CircularButton";
import { ThemedText } from "../ThemedText";

type UserDateSignatureProps = {
  userName: string;
  Icon1: IconType;
  Icon2: IconType;
  onButton1Press: () => void;
  onButton2Press: () => void;
};

const UserDateSignature: React.FC<UserDateSignatureProps> = ({
  userName,
  Icon1,
  Icon2,
  onButton1Press,
  onButton2Press,
}) => {
  const [greeting, setGreeting] = useState("");

  const calculateGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    if (currentHour < 22) return "Good Evening";
    return "Good Night";
  };

  useEffect(() => {
    setGreeting(calculateGreeting());
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      {/* Company Logo Section */}
      <Image
        source={require("@/assets/images/BeautAI.png")} // Replace with your actual logo path
        style={styles.companyLogo}
      />

      {/* Message Section */}
      <View style={styles.messageSection}>
        <ThemedText style={styles.greeting}>
          {greeting}, {userName}
        </ThemedText>
        <ThemedText style={styles.date}>{currentDate}</ThemedText>
      </View>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        <View style={styles.button}>
          <CircularButton size={45} iconType={Icon1} onPress={onButton1Press} />
        </View>

        <View style={styles.button}>
          <CircularButton size={45} iconType={Icon2} onPress={onButton2Press} />
        </View>
      </View>
    </View>
  );
};

export default UserDateSignature;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyLogo: {
    width: 40,
    height: 50,
    marginRight: 16,
  },
  messageSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    letterSpacing: -0.02,
    opacity: 0.3,
    fontWeight: "400",
    lineHeight: 19,
    textTransform: "uppercase",
  },
  date: {
    fontSize: 14,
    fontFamily: "InstrumentSans",
    fontStyle: "normal",
    opacity: 0.5,
    fontWeight: "500",
    letterSpacing: -0.02,
    textTransform: "uppercase",
  },
  buttonSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
