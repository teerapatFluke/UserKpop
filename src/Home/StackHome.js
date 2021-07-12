import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import { Avatar } from "react-native-paper";
import StackEvents from "../Events/EventDetail";
const ActionBarImage = () => {
  return (
    <Avatar.Image
      style={{
        marginRight: 14,
        backgroundColor: "none",
        justifyContent: "center",
        marginBottom: 7,
      }}
      size={42}
      source={require("../../2.png")}
    />
  );
};

const Stack = createStackNavigator();

function StackHome() {
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
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="หน้าแรก"
        component={Home}
        options={{
          headerRight: () => <ActionBarImage />,
        }}
      />
      <Stack.Screen
        name="รายละเอียดอีเว้นท์"
        component={StackEvents}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default StackHome;
