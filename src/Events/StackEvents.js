import React from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import Events from "./Events";
import EventDetail from "./EventDetail";
import AntDesign from "react-native-vector-icons/AntDesign";

const Stack = createStackNavigator();

const StackEvents = () => {
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
      <Stack.Screen name="อีเว้นท์" component={Events} />
      <Stack.Screen
        name="รายละเอียดอีเว้นท์"
        component={EventDetail}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackEvents;
