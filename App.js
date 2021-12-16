import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useMemo, useReducer, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackHome from "./src/Home/StackHome";
import StackArtist from "./src/Artist/StackArtist";
import StackEvents from "./src/Events/StackEvents";
import StackChat from "./src/Chat/StackChat";
import Register from "./src/Auth/Register";
import StackMenu from "./src/Menu/StackMenu";
import Auth from "./src/Auth/Auth";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./src/Auth/AuthProvider";
import jwt_decode from "jwt-decode";

import {
  useFonts,
  Kanit_400Regular,
  Kanit_200ExtraLight,
  Kanit_300Light,
} from "@expo-google-fonts/kanit";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform, Image } from "react-native";
import AppLoading from "expo-app-loading";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const App = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_200ExtraLight,
    Kanit_300Light,
  });
  const [userID, setuserID] = useState(0);
  const [userName, setUserName] = useState("");

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const ref = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync(userID).then((token) => {
      fetch(`http://128.199.116.6/api/user/${userID}/expo_token/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expo_noti: token }),
      });
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [userID]);

  useEffect(() => {
    ref.current?.setAddressText("Some Text");
  }, []);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          if (action.token) {
            AsyncStorage.setItem("userToken", action.token);
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          AsyncStorage.removeItem("userToken");
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {}
      setuserID(jwt_decode(userToken, { payload: true }).user_id);
      setUserName(jwt_decode(userToken, { payload: true }).user_name);
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, [userID]);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", token: data.access });
        setuserID(data.userID);
        setUserName(data.userName);
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {},
    }),
    []
  );
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        {state.userToken && userID && userName ? (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  size = 30;

                  if (route.name === "Home") {
                    iconName = "home";
                    return <Entypo name={iconName} size={size} color={color} />;
                  } else if (route.name === "Artist") {
                    iconName = "modern-mic";
                    return <Entypo name={iconName} size={size} color={color} />;
                  } else if (route.name === "Events") {
                    iconName = "event";
                    return (
                      <Image
                        source={require("./stage.png")}
                        fadeDuration={0}
                        style={{ width: 30, height: 30, tintColor: color }}
                      />
                    );
                  } else if (route.name === "Menu") {
                    iconName = "settings";
                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
                  } else if (route.name === "Chat") {
                    iconName = "chat";
                    return <Entypo name={iconName} size={size} color={color} />;
                  }

                  // You can return any component that you like here!
                  return (
                    <AntDesign name={iconName} size={size} color={color} />
                  );
                },
              })}
              tabBarOptions={{
                activeTintColor: "#555555",
                inactiveTintColor: "white",
                showLabel: false,
                pressOpacity: "gray",
                activeBackgroundColor: "white",
                inactiveBackgroundColor: "#555555",
              }}
            >
              <Tab.Screen name="Home" component={StackHome} />
              <Tab.Screen
                name="Chat"
                component={StackChat}
                initialParams={{ userID: userID, userName: userName }}
              />
              {/* <Tab.Screen name="Home" component={StackMenu} /> */}
              <Tab.Screen
                name="Artist"
                component={StackArtist}
                initialParams={{ userID: userID, userName: userName }}
              />
              <Tab.Screen name="Events" component={StackEvents} />

              <Tab.Screen name="Menu" component={StackMenu} />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 24,
                  fontFamily: "Kanit_400Regular",
                },
                cardStyle: { backgroundColor: "#fff" },
                headerStyle: {
                  backgroundColor: "#90CAF9",
                },
              }}
            >
              <Stack.Screen name="เข้าสู่ระบบ" component={Auth} />
              <Stack.Screen name="ลงทะเบียน" component={Register} />
              {/* <Stack.Screen name="FeedDetail" component={FeedDetail}></Stack.Screen> */}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </AuthContext.Provider>
    );
  }
};

export default App;
const registerForPushNotificationsAsync = async (userID) => {
  try {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  } catch (e) {}
};
