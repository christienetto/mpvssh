// src/components/VideosListScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const VideosListScreen = ({ route }) => {
  const { folder } = route.params;
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState("");

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
    const command = `DISPLAY=:0 mpv /home/chris/movies/${folder}/${video}`;
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
    <View style={styles.container}>
      <Text style={styles.title}>{folder}</Text>
      <Button title="Fetch Videos" onPress={fetchVideos} />
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
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
});

export default VideosListScreen;
