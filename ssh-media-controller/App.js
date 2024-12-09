import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DarkModeProvider } from "./contexts/DarkModeContext"; // Import the provider
import HomeScreen from "./components/HomeScreen";
import MPVControlsScreen from "./components/MPVControlsScreen";
import MoviesListScreen from "./components/MoviesListScreen";
import VideosListScreen from "./components/VideosListScreen";
import RunCommandScreen from "./components/RunCommandScreen"; // Import new screen
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DarkModeProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: true, // Allow gestures anywhere on the screen
              gestureDirection: "horizontal", // Ensure that gesture direction is horizontal
              cardStyle: {
                backgroundColor: "transparent", // Optional: Makes transitions smoother
              },
              cardStyleInterpolator: ({ current, next, layouts }) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                        }),
                      },
                    ],
                  },
                };
              },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MPV Controls" component={MPVControlsScreen} />
            <Stack.Screen name="Movies List" component={MoviesListScreen} />
            <Stack.Screen name="Videos List" component={VideosListScreen} />
            <Stack.Screen name="Run Command" component={RunCommandScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DarkModeProvider>
    </GestureHandlerRootView>
  );
}
