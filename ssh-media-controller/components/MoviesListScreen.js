import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_IP } from '@env';  // Import the environment variable


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

  // Fetch movies automatically when the page loads
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(`http://${LOCAL_IP}:8080/movies`);
        setFolders(response.data.folders);
      } catch (error) {
        setStatus(`Failed to fetch folders: ${error.message}`);
      }
    };

    fetchFolders();
  }, []); // Empty dependency array to run only once when the component is mounted

  const renderFolder = ({ item }) => (
    <TouchableOpacity
      style={[styles.folder, { backgroundColor: darkMode ? "#333" : "#eee" }]}
      onPress={() => navigation.navigate("Videos List", { folder: item })}
    >
      <Text style={[styles.folderText, { color: darkMode ? "#fff" : "#000" }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>Movies/Series List</Text>

      <FlatList
        data={folders}
        renderItem={renderFolder}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
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
    paddingTop: 40, // Add paddingTop to avoid notch
  },
  title: {
    fontSize: 24,
    marginBottom: 40, // Increased marginBottom to move the title down
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
