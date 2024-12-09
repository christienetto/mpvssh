import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext"; // Import the context

const MPVControlsScreen = ({ navigation }) => {
  const [status, setStatus] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const { darkMode } = useDarkMode(); // Get darkMode value from context

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

  const handlePlayPause = async () => {
    try {
      const pidResponse = await axios.post("http://192.168.1.138:8080/ssh", {
        host: "192.168.1.138",
        port: 22,
        username: "chris",
        password: "1436",
        command: "pidof mpv",
      });

      const pid = pidResponse.data.output.trim();

      if (pid) {
        if (isPlaying) {
          await sendCommand(`kill -STOP ${pid}`);
          setIsPlaying(false);
        } else {
          await sendCommand(`kill -CONT ${pid}`);
          setIsPlaying(true);
        }
        setStatus(isPlaying ? "Paused" : "Resumed");
      } else {
        setStatus("mpv process not found");
      }
    } catch (error) {
      setStatus(`Failed to execute play/pause command: ${error.message}`);
    }
  };

  const handleSeekForward = async () => {
    try {
      await sendCommand(
        'echo \'{"command": ["seek", 10]}\' | socat - /tmp/mpvsocket'
      );
      setStatus("Seeked forward by 10 seconds");
    } catch (error) {
      setStatus(`Failed to seek forward: ${error.message}`);
    }
  };

  const handleSeekBackward = async () => {
    try {
      await sendCommand(
        'echo \'{"command": ["seek", -10]}\' | socat - /tmp/mpvsocket'
      );
      setStatus("Seeked backward by 10 seconds");
    } catch (error) {
      setStatus(`Failed to seek backward: ${error.message}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>MPV Controls</Text>

      <View style={styles.gridContainer}>
        <Icon.Button
          backgroundColor={darkMode ? "#3e8e41" : "#4CAF50"}
          onPress={handlePlayPause}
          style={[styles.button, styles.playPauseButton]}
        >
        </Icon.Button>
        <Icon.Button
          backgroundColor={darkMode ? "#2d4373" : "#3b5998"}
          onPress={() =>
            sendCommand("pactl set-sink-volume @DEFAULT_SINK@ +5%")
          }
          style={[styles.button, styles.volumeButton]}
        >
        </Icon.Button>
        <Icon.Button
          backgroundColor={darkMode ? "#b71c1c" : "#f44336"}
          onPress={() => sendCommand("pkill -2 mpv")}
          style={[styles.button, styles.stopButton]}
        >
        </Icon.Button>
        <Icon.Button
          backgroundColor={darkMode ? "#2d4373" : "#3b5998"}
          onPress={() =>
            sendCommand("pactl set-sink-volume @DEFAULT_SINK@ -5%")
          }
          style={[styles.button, styles.volumeButton]}
        >
        </Icon.Button>

        <Icon.Button
          backgroundColor={darkMode ? "#d84915" : "#FF5722"}
          onPress={handleSeekBackward}
          style={[styles.button, styles.seekButton]}
        >
        </Icon.Button>

        <Icon.Button
          backgroundColor={darkMode ? "#d84915" : "#FF5722"}
          onPress={handleSeekForward}
          style={[styles.button, styles.seekButton]}
        >
        </Icon.Button>
      </View>

      <Text style={[styles.status, { color: darkMode ? "#fff" : "#000" }]}>{status}</Text>

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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    width: 120,
    height: 120,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5, // Shadow effect for better depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  playPauseButton: {
    backgroundColor: "#4CAF50",
  },
  volumeButton: {
    backgroundColor: "#3b5998",
  },
  stopButton: {
    backgroundColor: "#f44336",
  },
  seekButton: {
    backgroundColor: "#FF5722",
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MPVControlsScreen;
