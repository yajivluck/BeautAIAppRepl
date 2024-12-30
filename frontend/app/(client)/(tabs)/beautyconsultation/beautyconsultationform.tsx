// import { View, Image, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";
// import { ThemedView } from "@/components/ThemedView";
// import Form, { Question } from "@/components/form/Form";
// import { PADDING_LAYOUT, TAB_BAR_HEIGHT } from "@/constants/Layout";
// import CompanySignature from "@/components/UserSignature/CompanySignature";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function BeautyConsultationFormScreen() {
//   const router = useRouter();

//   const questions: Question[] = [
//     {
//       id: "q1",
//       type: "checkbox",
//       text: "What is your primary concern?",
//       answers: [
//         { id: "a1", label: "Acne and Blemishes" },
//         { id: "a2", label: "Wrinkles and Fine Lines" },
//         { id: "a3", label: "Hyperpigmentation x Dark Spots" },
//         { id: "a4", label: "Dryness and Dehydration" },
//         { id: "a5", label: "Dark Circles and Puffiness" },
//         { id: "a6", label: "Other:", isOther: true },
//       ],
//       allowMultiple: false,
//     },
//     {
//       id: "q2",
//       type: "checkbox",
//       text: "How much would you like to spend?",
//       answers: [
//         { id: "a7", label: "Under $50" },
//         { id: "a8", label: "$50-$100" },
//         { id: "a9", label: "$101-$300" },
//         { id: "a10", label: "Over $300" },
//         { id: "a11", label: "Not sure" },
//       ],
//       allowMultiple: false,
//     },
//     {
//       id: "q3",
//       type: "checkbox",
//       text: "How comfortable are you with invasive treatments?",
//       answers: [
//         { id: "a12", label: "Comfortable/Very Comfortable" },
//         { id: "a13", label: "Somewhat comfortable" },
//         { id: "a14", label: "Not comfortable" },
//       ],
//       allowMultiple: false,
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.safecontainer}>
//       <ThemedView style={styles.container}>
//         {/* Company Signature */}
//         <CompanySignature />

//         {/* Form */}
//         <View style={styles.formContainer}>
//           <Form
//             questions={questions}
//             onComplete={function (): void {
//               router.push(
//                 "/beautyconsultation/beautyconsultationrecommendations"
//               );
//             }}
//           />
//         </View>
//       </ThemedView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safecontainer: {
//     flex: 1,
//   },

//   container: {
//     flex: 1,
//     padding: PADDING_LAYOUT,
//     marginBottom: TAB_BAR_HEIGHT,
//   },
//   signature: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: "5%",
//     marginTop: "15%",
//     width: "100%",
//   },
//   logo: {
//     width: "15%", // 15% of the parent container's width
//     height: undefined, // Maintain aspect ratio
//     aspectRatio: 1, // Square dimensions
//     marginRight: "3%",
//   },
//   textContainer: {
//     flexDirection: "column", // Stack heading and subheading vertically
//   },
//   heading: {
//     fontFamily: "InstrumentSans",
//     fontStyle: "normal",
//     fontWeight: "600",
//     fontSize: 22,
//     letterSpacing: -0.02,
//     textTransform: "uppercase",
//   },
//   subheading: {
//     fontFamily: "InstrumentSans",
//     fontStyle: "normal",
//     fontWeight: "400",
//     fontSize: 13,
//     lineHeight: 16,
//     letterSpacing: -0.02,
//     textTransform: "uppercase",
//     opacity: 0.3,
//   },
//   formContainer: {
//     width: "100%", // Form spans the full width of the container
//     height: "70%",
//     alignItems: "center", // Center the form within the container
//     marginTop: "5%", // Add spacing above the form
//   },
// });

// import React, { useState } from "react";
// import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
// import { useRouter } from "expo-router";
// import { ThemedView } from "@/components/ThemedView";
// import { PADDING_LAYOUT, TAB_BAR_HEIGHT } from "@/constants/Layout";
// import CompanySignature from "@/components/UserSignature/CompanySignature";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Animated } from "react-native";
// import { ThemedItem } from "@/components/ThemedItem";

// type Question = {
//   question: string;
//   answers: string[];
// };

// export default function BeautyConsultationFormScreen() {
//   const router = useRouter();

//   // Questions and Answers
//   const questions: Question[] = [
//     {
//       question: "What are your main skin concerns?",
//       answers: ["Acne", "Wrinkles", "Dryness", "Dark Spots"],
//     },
//     {
//       question: "Which products do you use daily?",
//       answers: ["Cleanser", "Moisturizer", "Sunscreen", "Serum"],
//     },
//     {
//       question: "What type of skin do you have?",
//       answers: ["Oily", "Dry", "Combination", "Sensitive"],
//     },
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<string[][]>(
//     Array(questions.length).fill([])
//   );

//   // Smooth Progress Bar Animation
//   const progress = new Animated.Value((currentQuestion + 1) / questions.length);

//   const animateProgressBar = (newProgress: number) => {
//     Animated.timing(progress, {
//       toValue: newProgress,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   // Handle Checkbox Selection
//   const toggleAnswer = (answer: string) => {
//     setSelectedAnswers((prev) => {
//       const updatedAnswers = [...prev];
//       const currentAnswers = updatedAnswers[currentQuestion];

//       if (currentAnswers.includes(answer)) {
//         // Remove answer if it's already selected
//         updatedAnswers[currentQuestion] = currentAnswers.filter(
//           (item) => item !== answer
//         );
//       } else {
//         // Add answer
//         updatedAnswers[currentQuestion] = [...currentAnswers, answer];
//       }
//       return updatedAnswers;
//     });
//   };

//   // Handle Back and Next Button Actions
//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => {
//         animateProgressBar((prev + 2) / questions.length); // Move to next question
//         return prev + 1;
//       });
//     } else {
//       // On last question, route to new page with answers
//       router.push({
//         pathname: "/beautyconsultation/beautyconsultationrecommendations",
//         params: { answers: JSON.stringify(selectedAnswers) },
//       });
//     }
//   };

//   const handleBack = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => {
//         animateProgressBar(prev / questions.length); // Move to previous question
//         return prev - 1;
//       });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safecontainer}>
//       <ThemedView style={styles.container}>
//         {/* Company Signature */}
//         <CompanySignature />

//         {/* Progress Bar */}
//         <View style={styles.progressBarContainer}>
//           <Animated.View
//             style={[
//               styles.progressBar,
//               {
//                 width: progress.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: ["0%", "100%"],
//                 }),
//               },
//             ]}
//           />
//         </View>

//         {/* Question Section */}
//         <ThemedItem style={styles.questionContainer}>
//           <Text style={styles.questionText}>
//             {questions[currentQuestion].question}
//           </Text>

//           {/* Answers */}
//           {questions[currentQuestion].answers.map(
//             (answer: string, index: number) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => toggleAnswer(answer)}
//                 style={[
//                   styles.answerButton,
//                   selectedAnswers[currentQuestion].includes(answer) &&
//                     styles.selectedAnswer,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.answerText,
//                     selectedAnswers[currentQuestion].includes(answer) &&
//                       styles.selectedAnswerText,
//                   ]}
//                 >
//                   {answer}
//                 </Text>
//               </TouchableOpacity>
//             )
//           )}
//         </ThemedItem>

//         {/* Navigation Buttons */}
//         <View style={styles.buttonContainer}>
//           <Button
//             title="Back"
//             onPress={handleBack}
//             disabled={currentQuestion === 0}
//           />
//           <Button
//             title={currentQuestion === questions.length - 1 ? "Apply" : "Next"}
//             onPress={handleNext}
//           />
//         </View>
//       </ThemedView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safecontainer: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     padding: PADDING_LAYOUT,
//     marginBottom: TAB_BAR_HEIGHT,
//   },
//   progressBarContainer: {
//     height: 8,
//     backgroundColor: "#f8d7f1",
//     borderRadius: 4,
//     overflow: "hidden",
//     marginVertical: 20,
//   },
//   progressBar: {
//     height: "100%",
//     backgroundColor: "pink",
//     borderRadius: 4,
//   },
//   questionContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   questionText: {
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   answerButton: {
//     width: "90%",
//     padding: 15,
//     marginVertical: 5,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   selectedAnswer: {
//     backgroundColor: "#f9c2d9",
//   },
//   answerText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   selectedAnswerText: {
//     color: "#fff",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
// });

// import React, { useState } from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";
// import { ThemedView } from "@/components/ThemedView";
// import { PADDING_LAYOUT, TAB_BAR_HEIGHT } from "@/constants/Layout";
// import CompanySignature from "@/components/UserSignature/CompanySignature";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Animated } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
// import { ThemedItem } from "@/components/ThemedItem";
// import { ThemedText } from "@/components/ThemedText";

// type Question = {
//   question: string;
//   answers: string[];
// };

// export default function BeautyConsultationFormScreen() {
//   const router = useRouter();

//   // Questions and Answers
//   const questions: Question[] = [
//     {
//       question: "What is your primary concern?",
//       answers: [
//         "Acne and Blemishes",
//         "Wrinkles and Fine Lines",
//         "Hyperpigmentation x Dark Spots",
//         "Dryness and Dehydration",
//         "Dark Circles and Puffiness",
//       ],
//     },
//     {
//       question: "How much would you like to spend?",
//       answers: ["Under $50", "$50-$100", "$101-$300", "Over $300"],
//     },
//     {
//       question: "How comfortable are you with invasive treatments?",
//       answers: [
//         "Comfortable/Very Comfortable",
//         "Somewhat comfortable",
//         "Not comfortable",
//       ],
//     },
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<string[][]>(
//     Array(questions.length).fill([])
//   );

//   // Smooth Progress Bar Animation
//   const progress = new Animated.Value((currentQuestion + 1) / questions.length);

//   const animateProgressBar = (newProgress: number) => {
//     Animated.timing(progress, {
//       toValue: newProgress,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   // Handle Checkbox Selection
//   const toggleAnswer = (answer: string) => {
//     setSelectedAnswers((prev) => {
//       const updatedAnswers = [...prev];
//       const currentAnswers = updatedAnswers[currentQuestion];

//       if (currentAnswers.includes(answer)) {
//         // Remove answer if it's already selected
//         updatedAnswers[currentQuestion] = currentAnswers.filter(
//           (item) => item !== answer
//         );
//       } else {
//         // Add answer
//         updatedAnswers[currentQuestion] = [...currentAnswers, answer];
//       }
//       return updatedAnswers;
//     });
//   };

//   // Handle Back and Next Button Actions
//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => {
//         animateProgressBar((prev + 2) / questions.length); // Move to next question
//         return prev + 1;
//       });
//     } else {
//       // On last question, route to new page with answers
//       router.push({
//         pathname: "/beautyconsultation/beautyconsultationrecommendations",
//         params: { answers: JSON.stringify(selectedAnswers) },
//       });
//     }
//   };

//   const handleBack = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => {
//         animateProgressBar(prev / questions.length); // Move to previous question
//         return prev - 1;
//       });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safecontainer}>
//       <ThemedView style={styles.container}>
//         {/* Company Signature */}
//         <CompanySignature />

//         {/* Progress Bar */}
//         <View style={styles.progressBarContainer}>
//           <Animated.View
//             style={[
//               styles.progressBar,
//               {
//                 width: progress.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: ["0%", "100%"],
//                 }),
//               },
//             ]}
//           />
//         </View>

//         {/* Question Section */}
//         <ThemedItem style={styles.questionContainer}>
//           <ThemedText style={styles.questionText}>
//             {questions[currentQuestion].question}
//           </ThemedText>

//           {/* Answers with Custom Checkboxes */}
//           {questions[currentQuestion].answers.map(
//             (answer: string, index: number) => (
//               <View key={index} style={styles.checkboxContainer}>
//                 <TouchableOpacity
//                   onPress={() => toggleAnswer(answer)}
//                   style={[
//                     styles.checkbox,
//                     selectedAnswers[currentQuestion].includes(answer)
//                       ? styles.checkboxChecked
//                       : styles.checkboxUnchecked,
//                   ]}
//                 >
//                   <AntDesign
//                     name={
//                       selectedAnswers[currentQuestion].includes(answer)
//                         ? "check"
//                         : undefined
//                     }
//                     size={24}
//                     color={"#fff"}
//                   />
//                 </TouchableOpacity>
//                 <ThemedText
//                   style={[
//                     styles.answerText,
//                     selectedAnswers[currentQuestion].includes(answer) &&
//                       styles.selectedAnswerText,
//                   ]}
//                 >
//                   {answer}
//                 </ThemedText>
//               </View>
//             )
//           )}
//         </ThemedItem>

//         {/* Navigation Buttons */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={handleBack}
//             disabled={currentQuestion === 0}
//             style={styles.button}
//           >
//             <Text style={styles.buttonText}>Back</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleNext} style={styles.button}>
//             <Text style={styles.buttonText}>
//               {currentQuestion === questions.length - 1 ? "Apply" : "Next"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ThemedView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safecontainer: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     padding: PADDING_LAYOUT,
//     marginBottom: TAB_BAR_HEIGHT,
//   },
//   progressBarContainer: {
//     height: 8,
//     backgroundColor: "#f8d7f1",
//     borderRadius: 4,
//     overflow: "hidden",
//     marginVertical: 20,
//   },
//   progressBar: {
//     height: "100%",
//     backgroundColor: "pink",
//     borderRadius: 4,
//   },
//   questionContainer: {
//     borderRadius: 10,
//     padding: "5%",
//   },
//   questionText: {
//     fontSize: 18,
//     textAlign: "left",
//     marginBottom: 20,
//     fontFamily: "InstrumentSansBold", // Font family
//     fontWeight: "600", // Font weight
//     lineHeight: 24, // Line height
//     letterSpacing: -0.02, // Letter spacing (in dp)
//     textTransform: "uppercase",
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   checkbox: {
//     marginRight: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     width: 30,
//     height: 30,
//     borderRadius: 5,
//     borderWidth: 2,
//   },
//   checkboxUnchecked: {
//     borderColor: "#ddd",
//   },
//   checkboxChecked: {
//     borderColor: "#f8d7f1",
//     backgroundColor: "#f8d7f1",
//   },
//   answerText: {
//     fontSize: 16,
//   },
//   selectedAnswerText: {
//     color: "#fff",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   button: {
//     padding: 10,
//     backgroundColor: "#f8d7f1",
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { PADDING_LAYOUT, TAB_BAR_HEIGHT } from "@/constants/Layout";
import CompanySignature from "@/components/UserSignature/CompanySignature";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedItem } from "@/components/ThemedItem";
import { ThemedText } from "@/components/ThemedText";

type Question = {
  question: string;
  answers: string[];
};

export default function BeautyConsultationFormScreen() {
  const router = useRouter();

  // Questions and Answers
  const questions: Question[] = [
    {
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
      question: "How much would you like to spend?",
      answers: ["Under $50", "$50-$100", "$101-$300", "Over $300"],
    },
    {
      question: "How comfortable are you with invasive treatments?",
      answers: [
        "Comfortable/Very Comfortable",
        "Somewhat comfortable",
        "Not comfortable",
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[][]>(
    Array(questions.length).fill([])
  );

  // Smooth Progress Bar Animation
  const progress = new Animated.Value((currentQuestion + 1) / questions.length);

  const animateProgressBar = (newProgress: number) => {
    Animated.timing(progress, {
      toValue: newProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Handle Checkbox Selection
  const toggleAnswer = (answer: string) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = [...prev];
      const currentAnswers = updatedAnswers[currentQuestion];

      if (currentAnswers.includes(answer)) {
        updatedAnswers[currentQuestion] = currentAnswers.filter(
          (item) => item !== answer
        );
      } else {
        updatedAnswers[currentQuestion] = [...currentAnswers, answer];
      }
      return updatedAnswers;
    });
  };

  // Handle Back and Next Button Actions
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => {
        animateProgressBar((prev + 2) / questions.length); // Move to next question
        return prev + 1;
      });
    } else {
      router.replace({
        pathname: "/beautyconsultation/beautyconsultationrecommendations",
        params: { answers: JSON.stringify(selectedAnswers) },
      });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => {
        animateProgressBar(prev / questions.length); // Move to previous question
        return prev - 1;
      });
    }
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      <ThemedView style={styles.container}>
        {/* Company Signature */}
        <CompanySignature />

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>

        {/* Question Section */}
        <ThemedItem style={styles.questionContainer}>
          <ThemedText style={styles.questionText}>
            {questions[currentQuestion].question}
          </ThemedText>

          {/* Answers with Custom Checkboxes */}
          {questions[currentQuestion].answers.map(
            (answer: string, index: number) => (
              <View key={index} style={styles.checkboxContainer}>
                <TouchableOpacity onPress={() => toggleAnswer(answer)}>
                  <ThemedItem
                    style={[
                      styles.checkbox,
                      selectedAnswers[currentQuestion].includes(answer)
                        ? styles.checkboxChecked
                        : "",
                    ]}
                  >
                    <AntDesign
                      name={
                        selectedAnswers[currentQuestion].includes(answer)
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
                    selectedAnswers[currentQuestion].includes(answer) &&
                      styles.selectedAnswerText,
                  ]}
                >
                  {answer}
                </ThemedText>
              </View>
            )
          )}
        </ThemedItem>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleBack}
            disabled={currentQuestion === 0}
            style={[
              styles.button,
              currentQuestion === 0 && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>
              {currentQuestion === questions.length - 1 ? "Apply" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: PADDING_LAYOUT,
    marginBottom: TAB_BAR_HEIGHT,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#f8d7f1",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "pink",
    borderRadius: 4,
  },
  questionContainer: {
    borderRadius: 10,
    padding: "5%",
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
  checkboxWrapper: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxUnchecked: {
    // borderColor: "#ddd",
    // backgroundColor: "transparent",
    // borderWidth: 2,
  },
  checkboxChecked: {
    borderColor: "#f8d7f1",
    backgroundColor: "#f8d7f1",
    borderWidth: 2,
  },
  answerText: {
    fontSize: 16,
  },
  selectedAnswerText: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto", // Buttons at the bottom
    marginBottom: 20, // Some space below
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#f8d7f1",
    borderRadius: 30, // Make buttons rounded
    width: "48%", // Ensure buttons are not too wide
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5, // Reduce opacity for "Back" button when on the first question
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
