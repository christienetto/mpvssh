import React from "react";
import { View, Text, Button, StyleSheet, Switch } from "react-native";
import { useDarkMode } from "../contexts/DarkModeContext"; // Import the hook

const HomeScreen = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useDarkMode(); // Access darkMode state

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>Home</Text>
      <Button title="Go to MPV Controls" onPress={() => navigation.navigate("MPV Controls")} />
      <Button title="Go to Movies List" onPress={() => navigation.navigate("Movies List")} />
      <Button title="Run Command" onPress={() => navigation.navigate("Run Command")} />

      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: darkMode ? "#fff" : "#000" }]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode} // Toggle dark mode
          thumbColor={darkMode ? "#fff" : "#121212"}
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  switchContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default HomeScreen;
