// src/components/RunCommandScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const RunCommandScreen = () => {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const runCommand = async () => {
    try {
      const result = await axios.post("http://192.168.1.138:8080/ssh", {
        host: "192.168.1.138",
        port: 22,
        username: "chris",
        password: "1436",
        command: command,
      });
      setResponse(result.data.output);
      setError("");
    } catch (err) {
      setResponse("");
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run Custom SSH Command</Text>

      <TextInput
        style={styles.input}
        value={command}
        onChangeText={setCommand}
        placeholder="Enter command"
      />

      <Button title="Run Command" onPress={runCommand} />

      {response && <Text style={styles.response}>{response}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
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
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
  },
  error: {
    marginTop: 20,
    fontSize: 16,
    color: "red",
  },
});

export default RunCommandScreen;
