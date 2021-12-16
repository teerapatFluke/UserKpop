import React, { useEffect, useState, useContext, createContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import { Avatar } from "react-native-paper";
import StackEvents from "../Events/EventDetail";
import Style from "../Style";
import { appId } from "@env";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import Test from "./Test";
const Stack = createStackNavigator();

function StackHome() {
  const [token, setToken] = useState("");
  const [userID, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");
  const ActionBarImage = () => {
    return (
      <View>
        {userPic ? (
          <Avatar.Image
            style={{
              marginRight: 14,
              backgroundColor: "none",
              justifyContent: "center",
              marginBottom: 7,
            }}
            size={42}
            source={{
              uri: userPic,
            }}
          />
        ) : (
          <Avatar.Image
            style={{
              marginRight: 14,
              backgroundColor: "none",
              justifyContent: "center",
              marginBottom: 7,
            }}
            size={42}
            source={require("../../user.jpeg")}
          />
        )}
      </View>
    );
  };

  const bootstrapAsync = async () => {
    try {
      setToken(await AsyncStorage.getItem("userToken"));
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      bootstrapAsync();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && token) {
      setUserId(jwt_decode(token, { payload: true }).user_id);
      setUserName(jwt_decode(token, { payload: true }).user_name);
      setUserPic(jwt_decode(token, { payload: true }).user_picture);
    }
    return () => {
      isMounted = false;
    };
  }, [token]);
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
