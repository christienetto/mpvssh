import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoviesListScreen = ({ navigation }) => {
  const [folders, setFolders] = useState([]);
  const [status, setStatus] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from AsyncStorage
  useEffect(() => {
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
      style={[styles.folder, { backgroundColor: darkMode ? "#333" : "#eee" }]}
      onPress={() => navigation.navigate("Videos List", { folder: item })}
    >
      <Text style={[styles.folderText, { color: darkMode ? "#fff" : "#000" }]}>{item}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>Movies/Series List</Text>
      <Button title="Fetch Movies/Series" onPress={fetchFolders} />
      <FlatList
        data={folders}
        renderItem={renderFolder}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
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
  folder: {
    padding: 10,
    marginVertical: 5,
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

export default MoviesListScreen;
