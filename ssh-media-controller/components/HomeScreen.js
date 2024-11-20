// src/components/HomeScreen.js (update to include a button for Run Command screen)
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to MPV Remote</Text>
    <View style={styles.buttonContainer}>
      <Button
        title="Go to MPV Controls"
        onPress={() => navigation.navigate("MPV Controls")}
      />
    </View>
    <View style={styles.buttonContainer}>
      <Button
        title="Browse Movies/Series"
        onPress={() => navigation.navigate("Movies List")}
      />
    </View>
    <View style={styles.buttonContainer}>
      <Button
        title="Run Custom Command"
        onPress={() => navigation.navigate("Run Command")}
      />
    </View>
  </View>
);

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
  buttonContainer: {
    marginBottom: 20,
  },
});

export default HomeScreen;
