import React, { useEffect, useState, useContext, createContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Menu from "./Menu";
import { createStackNavigator } from "@react-navigation/stack";
import Request from "./Request";
import Problem from "./Problem";
import UserDetail from "./UserDetail";
import Style from "../Style";
import { appId } from "@env";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
const Stack = createStackNavigator();

const StackMenu = () => {
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
      <Stack.Screen name="เมนู" component={Menu} />
      <Stack.Screen name="ร้องขอศิลปิน/อีเว้นท์" component={Request} />
      <Stack.Screen name="รายงานปัญหา" component={Problem} />
      <Stack.Screen name="จัดการข้อมูลผู้ใช้" component={UserDetail} />
    </Stack.Navigator>
  );
};

export default StackMenu;
