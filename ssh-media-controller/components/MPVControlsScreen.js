import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MPVControlsScreen = ({ navigation }) => {
  const [status, setStatus] = useState("");
  const [isPlaying, setIsPlaying] = useState(true); // Track if it's playing or paused
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from AsyncStorage
    const loadDarkModePreference = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
          setDarkMode(JSON.parse(savedDarkMode)); // Parse string to boolean
        }
      } catch (error) {
        console.error("Failed to load dark mode preference:", error);
      }
    };
    loadDarkModePreference();
  }, []);

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
          setIsPlaying(false); // Set the state to paused
        } else {
          await sendCommand(`kill -CONT ${pid}`);
          setIsPlaying(true); // Set the state to playing
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
          name={isPlaying ? "pause-circle" : "play-circle"}
          backgroundColor={darkMode ? "#3e8e41" : "#4CAF50"}
          onPress={handlePlayPause}
          style={[styles.button, styles.playPauseButton]}
        >
          {isPlaying ? "Pause" : "Play"}
        </Icon.Button>
        <Icon.Button
          name="volume-up"
          backgroundColor={darkMode ? "#2d4373" : "#3b5998"}
          onPress={() =>
            sendCommand("pactl set-sink-volume @DEFAULT_SINK@ +5%")
          }
          style={[styles.button, styles.volumeButton]}
        >
          Volume Up
        </Icon.Button>
        <Icon.Button
          name="volume-down"
          backgroundColor={darkMode ? "#2d4373" : "#3b5998"}
          onPress={() =>
            sendCommand("pactl set-sink-volume @DEFAULT_SINK@ -5%")
          }
          style={[styles.button, styles.volumeButton]}
        >
          Volume Down
        </Icon.Button>
        <Icon.Button
          name="stop"
          backgroundColor={darkMode ? "#b71c1c" : "#f44336"}
          onPress={() => sendCommand("pkill -2 mpv")}
          style={[styles.button, styles.stopButton]}
        >
          Stop Playback
        </Icon.Button>
        <Icon.Button
          name="fast-backward"
          backgroundColor={darkMode ? "#d84915" : "#FF5722"}
          onPress={handleSeekBackward}
          style={[styles.button, styles.seekButton]}
        >
          Seek Backward
        </Icon.Button>
        <Icon.Button
          name="fast-forward"
          backgroundColor={darkMode ? "#d84915" : "#FF5722"}
          onPress={handleSeekForward}
          style={[styles.button, styles.seekButton]}
        >
          Seek Forward
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
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
  switchContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    fontSize: 18,
    marginRight: 10,
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MPVControlsScreen;
