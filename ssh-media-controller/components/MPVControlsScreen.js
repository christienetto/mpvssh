import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native"; // Import Button here
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const MPVControlsScreen = ({ navigation }) => {
  // Destructure navigation prop
  const [status, setStatus] = useState("");
  const [isPlaying, setIsPlaying] = useState(true); // Track if it's playing or paused

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
      // Step 1: Get the PID of mpv
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
          // Step 2: Pause the process (mpv)
          await sendCommand(`kill -STOP ${pid}`);
          setIsPlaying(false); // Set the state to paused
        } else {
          // Step 3: Resume the process (mpv)
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
      // Use the IPC command to seek forward 10 seconds
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
      // Use the IPC command to seek backward 10 seconds
      await sendCommand(
        'echo \'{"command": ["seek", -10]}\' | socat - /tmp/mpvsocket'
      );
      setStatus("Seeked backward by 10 seconds");
    } catch (error) {
      setStatus(`Failed to seek backward: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MPV Controls</Text>

      {/* 3x2 Grid Layout */}
      <View style={styles.gridContainer}>
        <Icon.Button
          name={isPlaying ? "pause-circle" : "play-circle"} // Toggle between play and pause icons
          backgroundColor="#4CAF50"
          onPress={handlePlayPause}
          style={[styles.button, styles.playPauseButton]}
        >
          {isPlaying ? "Pause" : "Play"}
        </Icon.Button>

        <Icon.Button
          name="volume-up"
          backgroundColor="#3b5998"
          onPress={() =>
            sendCommand("pactl set-sink-volume @DEFAULT_SINK@ +5%")
          }
          style={[styles.button, styles.volumeButton]}
        >
          Volume Up
        </Icon.Button>

        <Icon.Button
          name="volume-down"
          backgroundColor="#3b5998"
          onPress={() =>
            sendCommand("pactl set-sink-volume @DEFAULT_SINK@ -5%")
          }
          style={[styles.button, styles.volumeButton]}
        >
          Volume Down
        </Icon.Button>

        <Icon.Button
          name="stop"
          backgroundColor="#f44336"
          onPress={() => sendCommand("pkill -2 mpv")}
          style={[styles.button, styles.stopButton]}
        >
          Stop Playback
        </Icon.Button>

        <Icon.Button
          name="fast-backward"
          backgroundColor="#FF5722"
          onPress={handleSeekBackward}
          style={[styles.button, styles.seekButton]}
        >
          Seek Backward
        </Icon.Button>

        <Icon.Button
          name="fast-forward"
          backgroundColor="#FF5722"
          onPress={handleSeekForward}
          style={[styles.button, styles.seekButton]}
        >
          Seek Forward
        </Icon.Button>
      </View>

      {/* New Button to navigate to "Run Command" screen */}
      <View style={styles.buttonContainer}>
        <Button
          title="Run Custom Command"
          onPress={() => navigation.navigate("Run Command")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Movie/Series list"
          onPress={() => navigation.navigate("Movies List")}
        />
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
  gridContainer: {
    flexDirection: "row", // Align items in a row
    flexWrap: "wrap", // Wrap items into new rows
    justifyContent: "center", // Center the buttons
    width: "100%", // Full width of the screen
  },
  button: {
    width: 120, // Width of each button
    height: 120, // Height of each button
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60, // Make the buttons circular
    fontSize: 24, // Larger text/icon size
    margin: 10, // Spacing between buttons
  },
  playPauseButton: {
    backgroundColor: "#4CAF50", // Green for play/pause
  },
  volumeButton: {
    backgroundColor: "#3b5998", // Default blue for volume buttons
  },
  stopButton: {
    backgroundColor: "#f44336", // Red for stop button
  },
  seekButton: {
    backgroundColor: "#FF5722", // Orange for seek buttons
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 50,
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
  },
});

export default MPVControlsScreen;
