import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext"; // Import the hook
import { LOCAL_IP } from '@env';  // Import the environment variable



const RunCommandScreen = ({ navigation }) => {
  const { darkMode, setDarkMode } = useDarkMode(); // Access darkMode state
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("");

  const runCommand = async () => {
    try {
      const response = await axios.post(`http://${LOCAL_IP}:8080/ssh`, {
        host: "", //????
        port: 22,
        username: "",
        password: "",
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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: darkMode ? "#333" : "#007BFF" }]}
        onPress={runCommand}
      >
        <Text style={[styles.buttonText, { color: "#fff" }]}>Execute</Text>
      </TouchableOpacity>

      {status && (
        <Text style={[styles.status, { color: darkMode ? "#fff" : "#000" }]}>
          {status}
        </Text>
      )}
      
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
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Arial, sans-serif", // Modern font
  },
  input: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
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

export default RunCommandScreen;
