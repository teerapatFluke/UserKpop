import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Artist from "./Artist";
import ArtistDetail from "./ArtistDetail";
const Stack = createStackNavigator();

const StackArtist = ({ route }) => {
  const { userID, userName } = route.params;
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Kanit_400Regular",
          fontSize: 24,
          color: "white",
        },
        cardStyle: { backgroundColor: "#fff" },
        headerStyle: {
          backgroundColor: "#2c2c2c",
        },
        headerBackTitleStyle: { fontFamily: "Kanit_400Regular" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="ศิลปิน" component={Artist} />
      <Stack.Screen
        name="รายละเอียดศิลปิน"
        component={ArtistDetail}
        initialParams={{ userID: userID, userName: userName }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackArtist;
