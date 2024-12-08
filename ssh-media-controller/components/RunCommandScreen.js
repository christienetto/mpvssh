import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Switch } from "react-native";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext"; // Import the hook

const RunCommandScreen = ({ navigation }) => {
  const { darkMode, setDarkMode } = useDarkMode(); // Access darkMode state
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("");

  const runCommand = async () => {
    try {
      const response = await axios.post("http://192.168.1.138:8080/ssh", {
        host: "192.168.1.138",
        port: 22,
        username: "chris",
        password: "1436",
        command: command,
      });
      setStatus(`Command executed successfully: ${response.data.output}`);
    } catch (error) {
      setStatus(`Failed to execute command: ${error.message}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>Run Command</Text>

      <TextInput
        style={[styles.input, { backgroundColor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000" }]}
        placeholder="Enter your command"
        placeholderTextColor={darkMode ? "#aaa" : "#888"}
        value={command}
        onChangeText={setCommand}
      />
      <Button title="Run Command" onPress={runCommand} />

      <Text style={[styles.status, { color: darkMode ? "#fff" : "#000" }]}>
        {status}
      </Text>

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
  input: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
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

export default RunCommandScreen;
