import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Artist from "./Artist";
import ArtistDetail from "./ArtistDetail";
const Stack = createStackNavigator();

const StackArtist = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Kanit_400Regular",
          fontSize: 24,
        },
        cardStyle: { backgroundColor: "#fff" },
        headerStyle: {
          backgroundColor: "#90CAF9",
        },
        headerBackTitleStyle: { fontFamily: "Kanit_400Regular" },
      }}
    >
      <Stack.Screen name="ศิลปิน" component={Artist} />
      <Stack.Screen
        name="รายละเอียดศิลปิน"
        component={ArtistDetail}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackArtist;
