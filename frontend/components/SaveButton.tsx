import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SaveButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>SAVE CHANGES</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 56,
    backgroundColor: 'rgba(4, 4, 4, 0.8)',
    borderRadius: 38.5,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow effect for the button
    shadowColor: 'rgba(224, 165, 189, 0.2)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 5, // For Android devices to show shadow
  },
  button: {
    backgroundColor: 'rgba(4, 4, 4, 0.8)',
    borderRadius: 38.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // A blur effect can be applied here if needed with external libraries, for example, using `react-native-blur`
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SaveButton;
