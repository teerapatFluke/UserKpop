import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackHome from "./src/Home/StackHome";
import StackArtist from "./src/Artist/StackArtist";
import StackEvents from "./src/Events/StackEvents";
import StackMenu from "./src/Menu/StackMenu";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {
  useFonts,
  Kanit_400Regular,
  Kanit_200ExtraLight,
  Kanit_300Light
} from "@expo-google-fonts/kanit";
import AppLoading from "expo-app-loading";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_200ExtraLight, Kanit_300Light
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Artist") {
              iconName = "modern-mic";
              return <Entypo name={iconName} size={size} color={color} />;
            } else if (route.name === "Events") {
              iconName = "event";
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            } else if (route.name === "Menu") {
              iconName = "menu";
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            }

            // You can return any component that you like here!
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#000",
          inactiveTintColor: "#000",
          showLabel: false,
          pressOpacity: "gray",
          activeBackgroundColor: "#C3FDFF",
          inactiveBackgroundColor: "#5D99C6",
        }}
      >
        {/* <Tab.Screen name="Home" component={StackHome} /> */}
        <Tab.Screen name="Home" component={StackMenu} />
        <Tab.Screen name="Artist" component={StackArtist} />
        <Tab.Screen name="Events" component={StackEvents} />

        <Tab.Screen name="Menu" component={StackMenu} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
