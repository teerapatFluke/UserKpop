import React from "react";
import { View, Text } from "react-native";
import Menu from "./Menu";
import { createStackNavigator } from "@react-navigation/stack";
import Request from "./Request";
import Problem from "./Problem";
const Stack = createStackNavigator();

const StackMenu = () => {
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
      }}
    >
      <Stack.Screen name="เมนู" component={Menu} />
      <Stack.Screen name="ร้องขอศิลปิน/อีเว้นท์" component={Request} />
      <Stack.Screen name="รายงานปัญหาแอพพลิเคชั่น" component={Problem} />
    </Stack.Navigator>
  );
};

export default StackMenu;
