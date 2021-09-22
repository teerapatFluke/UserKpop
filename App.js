import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useMemo, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackHome from "./src/Home/StackHome";
import StackArtist from "./src/Artist/StackArtist";
import StackEvents from "./src/Events/StackEvents";
import StackMenu from "./src/Menu/StackMenu";
import Auth from "./src/Auth/Auth";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./src/Auth/AuthProvider";
import {
  useFonts,
  Kanit_400Regular,
  Kanit_200ExtraLight,
  Kanit_300Light,
} from "@expo-google-fonts/kanit";
import AppLoading from "expo-app-loading";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_200ExtraLight,
    Kanit_300Light,
  });
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
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await AsyncStorage.getItem("userToken");
        console.log(userToken);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        fetch("http://192.168.1.13:80/api/get_token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((resp) => dispatch({ type: "SIGN_IN", token: resp.access }))
          .catch((error) => {
            console.error(error);
          });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        {state.userToken ? (
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
                      <MaterialIcons
                        name={iconName}
                        size={size}
                        color={color}
                      />
                    );
                  } else if (route.name === "Menu") {
                    iconName = "menu";
                    return (
                      <MaterialIcons
                        name={iconName}
                        size={size}
                        color={color}
                      />
                    );
                  }

                  // You can return any component that you like here!
                  return (
                    <AntDesign name={iconName} size={size} color={color} />
                  );
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
              <Tab.Screen name="Home" component={StackHome} />
              {/* <Tab.Screen name="Home" component={StackMenu} /> */}
              <Tab.Screen name="Artist" component={StackArtist} />
              <Tab.Screen name="Events" component={StackEvents} />

              <Tab.Screen name="Menu" component={StackMenu} />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 24,
                },
                cardStyle: { backgroundColor: "#fff" },
                headerStyle: {
                  backgroundColor: "#90CAF9",
                },
              }}
            >
              <Stack.Screen name="เข้าสู่ระบบ" component={Auth} />
              {/* <Stack.Screen name="FeedDetail" component={FeedDetail}></Stack.Screen> */}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </AuthContext.Provider>
    );
  }
};
export default App;
