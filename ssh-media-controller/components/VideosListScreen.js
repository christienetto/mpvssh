import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView, // SafeAreaView for handling the notch
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideosListScreen = ({ route, navigation }) => {
  const { folder } = route.params;
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState("");
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

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

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.138:8080/movies/${folder}`
      );
      setVideos(response.data.videos);
    } catch (error) {
      setStatus(`Failed to fetch videos: ${error.message}`);
    }
  };

  const playVideo = async (video) => {
    const command = `DISPLAY=:0 mpv --fullscreen --input-ipc-server=/tmp/mpvsocket "/home/chris/med/movies/${folder}/${video}"`;
    try {
      const response = await axios.post("http://192.168.1.138:8080/ssh", {
        host: "192.168.1.138",
        port: 22,
        username: "chris",
        password: "1436",
        command: command,
      });
      setStatus(`Playing video: ${response.data.output}`);
    } catch (error) {
      setStatus(`Failed to play video: ${error.message}`);
    }
  };

  const renderVideo = ({ item }) => (
    <TouchableOpacity style={styles.folder} onPress={() => playVideo(item)}>
      <Text style={styles.folderText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>{folder}</Text>
      <Button title="Fetch Videos" onPress={fetchVideos} />
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Go to MPV Controls"
          onPress={() => navigation.navigate("MPV Controls")}
        />
      </View>

      <Text style={[styles.status, { color: darkMode ? "#fff" : "#000" }]}>{status}</Text>
    </SafeAreaView>
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
    marginTop: 40, // Adjust marginTop to move the title down
    marginBottom: 20,
  },
  folder: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#eee",
    width: "100%",
    borderRadius: 5,
  },
  folderText: {
    fontSize: 18,
  },
  list: {
    width: "100%",
    marginTop: 10,
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 50,
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

export default VideosListScreen;
