import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type QuestionType = "checkbox" | "text";

interface Answer {
  id: string;
  label: string;
  isOther?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  answers: Answer[];
  allowMultiple?: boolean;
}

interface FormProps {
  questions: Question[];
  onComplete: () => void;
}

const Form: React.FC<FormProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleCheckboxChange = (
    questionId: string,
    answerId: string,
    allowMultiple: boolean
  ) => {
    setAnswers((prev) => {
      const questionAnswers = prev[questionId] || [];
      if (allowMultiple) {
        if (questionAnswers.includes(answerId)) {
          return {
            ...prev,
            [questionId]: questionAnswers.filter(
              (id: string) => id !== answerId
            ),
          };
        } else {
          return { ...prev, [questionId]: [...questionAnswers, answerId] };
        }
      } else {
        return { ...prev, [questionId]: [answerId] };
      }
    });
  };

  const handleTextChange = (questionId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }));
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      console.log(answers);
      onComplete();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateProgress = () => (currentQuestionIndex + 1) / questions.length;

  return (
    <View style={{ flex: 1 }}>
      {/* Encapsulated Container */}
      <View style={styles.container}>
        {/* Progress Bar */}
        <LinearGradient
          colors={["#eb5e73", "#e68392", "#ebabb5"]}
          style={[
            styles.progressBar,
            { width: `${calculateProgress() * 100}%` },
          ]}
        />
        <View style={styles.progressBarBackground} />

        {/* Questions Section */}
        <ScrollView style={styles.questionsSection}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          {currentQuestion.type === "checkbox" &&
            currentQuestion.answers.map((answer) => (
              <View key={answer.id} style={styles.checkboxContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleCheckboxChange(
                      currentQuestion.id,
                      answer.id,
                      currentQuestion.allowMultiple || false
                    )
                  }
                  style={[
                    styles.checkbox,
                    answers[currentQuestion.id]?.includes(answer.id) &&
                      styles.checkedCheckbox,
                  ]}
                >
                  {answers[currentQuestion.id]?.includes(answer.id) && (
                    <Feather name="check" size={18} color="white" />
                  )}
                </TouchableOpacity>
                <Text style={styles.answerText}>{answer.label}</Text>
                {answer.isOther &&
                  answers[currentQuestion.id]?.includes(answer.id) && (
                    <TextInput
                      style={styles.otherInput}
                      placeholder="Enter your answer"
                      value={answers[currentQuestion.id + "_other"] || ""}
                      onChangeText={(text) =>
                        handleTextChange(currentQuestion.id + "_other", text)
                      }
                    />
                  )}
              </View>
            ))}
          {currentQuestion.type === "text" && (
            <TextInput
              style={styles.textInput}
              placeholder="Enter your answer"
              value={answers[currentQuestion.id] || ""}
              onChangeText={(text) =>
                handleTextChange(currentQuestion.id, text)
              }
            />
          )}
        </ScrollView>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsSection}>
        <TouchableOpacity
          onPress={handleBack}
          style={[
            styles.button,
            styles.backButton,
            currentQuestionIndex === 0 && styles.disabledButton,
          ]}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.button, styles.nextButton]}
        >
          <Text style={styles.nextButtonText}>
            {isLastQuestion ? "Done" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: "10%",
//     paddingVertical: "3%",
//     backgroundColor: "#F8F8F8",
//     borderRadius: 4,
//   },
//   progressBarBackground: {
//     height: "2%", // Relative height for progress bar
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: 4,
//     position: "absolute",
//     top: "5%",
//     zIndex: -1,
//   },
//   progressBar: {
//     height: "2%", // Relative height for progress bar
//     borderRadius: 4,
//     position: "absolute",
//     top: "5%",
//     left: "5%",
//   },
//   questionsSection: {
//     flex: 1,
//     marginTop: "12%",
//     marginBottom: "5%",
//   },
//   questionText: {
//     fontSize: 10,
//     marginBottom: "5%",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: "4%",
//   },
//   checkbox: {
//     height: 24,
//     width: 24,
//     borderWidth: 2,
//     borderColor: "black",
//     borderRadius: 4,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: "3%",
//   },
//   checkedCheckbox: {
//     backgroundColor: "#FF69B4",
//   },
//   answerText: {
//     fontSize: 10,
//     color: "black",
//   },
//   otherInput: {
//     marginLeft: "3%",
//     borderBottomWidth: 1,
//     borderBottomColor: "black",
//     flex: 1,
//   },
//   textInput: {
//     borderBottomWidth: 1,
//     borderBottomColor: "black",
//     marginBottom: "5%",
//     fontSize: 10,
//   },
//   buttonsSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: "10%",
//     paddingHorizontal: "5%",
//   },
//   button: {
//     paddingVertical: "5%",
//     paddingHorizontal: "15%",
//     borderRadius: 20,
//   },
//   backButton: {
//     backgroundColor: "white",
//     borderColor: "black",
//     borderWidth: 1,
//   },
//   nextButton: {
//     backgroundColor: "black",
//   },
//   disabledButton: {
//     opacity: 0.3,
//   },
//   backButtonText: {
//     color: "black",
//     fontWeight: "bold",
//     fontSize: 10,
//   },
//   nextButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 10,
//   },
// });

const styles = StyleSheet.create({
  container: {
    height: "70%",
    paddingHorizontal: "10%",
    paddingVertical: "3%",
    backgroundColor: "#F8F8F8", // Background color only for this container
    borderRadius: 16, // Optional: Round bottom edges for a smoother transition
  },
  progressBarBackground: {
    height: 10,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 4,
    position: "absolute",
    top: "5%",
    zIndex: -1,
  },
  progressBar: {
    height: 10,
    borderRadius: 4,
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  questionsSection: {
    flex: 1,
    marginTop: "12%",
    marginBottom: "5%",
  },
  questionText: {
    fontSize: 10,
    marginBottom: "5%",
    fontWeight: "bold",
    textAlign: "center",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "4%",
  },

  answerText: {
    fontSize: 10,
    color: "black",
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "3%",
  },
  checkedCheckbox: {
    backgroundColor: "#FF69B4",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: "5%",
    fontSize: 10,
  },
  otherInput: {
    marginLeft: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flex: 1,
  },
  buttonsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "10%",
    backgroundColor: "transparent", // Explicitly set as transparent
  },
  button: {
    paddingVertical: "5%",
    paddingHorizontal: "15%",
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  },
  nextButton: {
    backgroundColor: "black",
  },
  disabledButton: {
    opacity: 0.3,
  },
  backButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
