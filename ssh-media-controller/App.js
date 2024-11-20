import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import MPVControlsScreen from "./components/MPVControlsScreen";
import MoviesListScreen from "./components/MoviesListScreen";
import VideosListScreen from "./components/VideosListScreen";
import RunCommandScreen from "./components/RunCommandScreen"; // Import new screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MPV Controls" component={MPVControlsScreen} />
        <Stack.Screen name="Movies List" component={MoviesListScreen} />
        <Stack.Screen name="Videos List" component={VideosListScreen} />
        <Stack.Screen name="Run Command" component={RunCommandScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
