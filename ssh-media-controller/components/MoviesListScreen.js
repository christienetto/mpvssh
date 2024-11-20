// src/components/MoviesListScreen.js
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

const MoviesListScreen = ({ navigation }) => {
  const [folders, setFolders] = useState([]);
  const [status, setStatus] = useState("");

  const fetchFolders = async () => {
    try {
      const response = await axios.get("http://192.168.1.138:8080/movies");
      setFolders(response.data.folders);
    } catch (error) {
      setStatus(`Failed to fetch folders: ${error.message}`);
    }
  };

  const renderFolder = ({ item }) => (
    <TouchableOpacity
      style={styles.folder}
      onPress={() => navigation.navigate("Videos List", { folder: item })}
    >
      <Text style={styles.folderText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies/Series List</Text>
      <Button title="Fetch Movies/Series" onPress={fetchFolders} />
      <FlatList
        data={folders}
        renderItem={renderFolder}
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

export default MoviesListScreen;
