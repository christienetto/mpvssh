// src/components/MPVControlsScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const MPVControlsScreen = () => {
  const [status, setStatus] = useState("");

  const sendCommand = async (command) => {
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
    <View style={styles.container}>
      <Text style={styles.title}>MPV Controls</Text>

      <View style={styles.buttonContainer}>
        <Icon.Button
          name="play-circle"
          backgroundColor="#3b5998"
          onPress={() => sendCommand("mpv --toggle-pause")}
          style={styles.button}
        >
          Play/Pause
        </Icon.Button>
      </View>

      <View style={styles.buttonContainer}>
        <Icon.Button
          name="volume-up"
          backgroundColor="#3b5998"
          onPress={() =>
            sendCommand("pactl set-sink-volume @DEFAULT_SINK@ +5%")
          }
          style={styles.button}
        >
          Volume Up
        </Icon.Button>
      </View>

      <View style={styles.buttonContainer}>
        <Icon.Button
          name="volume-down"
          backgroundColor="#3b5998"
          onPress={() =>
            sendCommand("pactl set-sink-volume @DEFAULT_SINK@ -5%")
          }
          style={styles.button}
        >
          Volume Down
        </Icon.Button>
      </View>

      <View style={styles.buttonContainer}>
        <Icon.Button
          name="stop"
          backgroundColor="#f44336"
          onPress={() => sendCommand("pkill -2 mpv")}
          style={styles.button}
        >
          Stop Playback
        </Icon.Button>
      </View>

      <Text style={styles.status}>{status}</Text>
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
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    margin: 5,
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
  },
});

export default MPVControlsScreen;
