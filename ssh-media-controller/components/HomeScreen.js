import React from "react";
import { View, Text, Button, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useDarkMode } from "../contexts/DarkModeContext"; // Import the hook

const HomeScreen = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useDarkMode(); // Access darkMode state

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>Home</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: darkMode ? "#333" : "#007BFF" }]}
          onPress={() => navigation.navigate("MPV Controls")}
        >
          <Text style={[styles.buttonText, { color: darkMode ? "#fff" : "#fff" }]}>Controls</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: darkMode ? "#333" : "#007BFF" }]}
          onPress={() => navigation.navigate("Movies List")}
        >
          <Text style={[styles.buttonText, { color: darkMode ? "#fff" : "#fff" }]}>Movies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: darkMode ? "#333" : "#007BFF" }]}
          onPress={() => navigation.navigate("Run Command")}
        >
          <Text style={[styles.buttonText, { color: darkMode ? "#fff" : "#fff" }]}>Command Line</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: darkMode ? "#fff" : "#000" }]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode} // Toggle dark mode
          thumbColor={darkMode ? "#fff" : "#121212"}
          trackColor={{ false: "#ddd", true: "#666" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Arial, sans-serif", // Adding a modern font
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  switchContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  switchText: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default HomeScreen;
