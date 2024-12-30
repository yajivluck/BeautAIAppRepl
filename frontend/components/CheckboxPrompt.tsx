import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CheckboxPrompt = ({
  question,
  options,
  selectedOptions,
  handleCheckboxChange,
}: {
  question: string;
  options: { label: string; value: string }[];
  selectedOptions: string[];
  handleCheckboxChange: (value: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.options}>
        {options.map((option) => (
          <View key={option.value} style={styles.optionLabel}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleCheckboxChange(option.value)}
            >
              <View
                style={[
                  styles.checkboxBox,
                  selectedOptions.includes(option.value)
                    ? styles.checked
                    : styles.unchecked,
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.optionText}>{option.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 10, // Rounded edges
    padding: 20, // Optional: Add padding for spacing inside the container
    marginBottom: 10,

  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3e3e3e',
    marginBottom: 10,
  },
  options: {
    flexDirection: 'column',
    gap: 10,
    flex: 1
    
  },
  optionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#3e3e3e',
    borderRadius: 3,
  },
  checked: {
    backgroundColor: '#3e3e3e',
  },
  unchecked: {
    backgroundColor: 'transparent',
  },
  optionText: {
    fontSize: 14,
    color: '#3e3e3e',
  },
});

export default CheckboxPrompt;
