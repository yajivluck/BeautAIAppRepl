import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface SearchBarProps extends TextInputProps {
  placeholderText: string;
  onSearch: (text: string) => void;
  onIconPress: () => void;
  maxWidth?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholderText,
  onSearch,
  onIconPress,
  maxWidth = 353,
  ...props
}) => {
  const [text, setText] = React.useState("");

  const handleTextChange = (value: string) => {
    setText(value);
    onSearch(value);
  };

  const containerStyle: ViewStyle = {
    maxWidth: maxWidth,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onIconPress} style={styles.iconButton}>
        <FontAwesome name="search" size={20} color="black" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder={placeholderText}
        placeholderTextColor="rgba(0,0,0,0.4)"
        value={text}
        onChangeText={handleTextChange}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 48,
    width: "100%",
    backgroundColor: "white",
  },
  iconButton: {
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
});

export default SearchBar;
