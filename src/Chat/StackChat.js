import React, { useEffect, useState, useContext, createContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import ChatList from "./ChatList";
import { View, Text, TouchableOpacity } from "react-native";
import ChatRoom from "./ChatRoom";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import SendBird from "sendbird";
import Style from "../Style";
import { ChatAPI } from "./ChatAPI";
import { appId } from "@env";
import {
  Searchbar,
  Card,
  Avatar,
  TextInput,
  FAB,
  Dialog,
  Portal,
  Provider,
  Button,
} from "react-native-paper";
const StackChat = ({ route, navigation }) => {
  const sb = new SendBird({ appId: appId });
  const showDialog = () => setVisible(true);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const [token, setToken] = useState("");
  const [userID, setUserId] = useState("");
  const [userPic, setUserPic] = useState("");
  const [userName, setUserName] = useState("");
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
  const ActionBarImage = () => {
    return (
      <TouchableOpacity onPress={showDialog}>
        <View style={{ marginRight: 14 }}>
          <Ionicons name="exit-outline" size={30} color="white" />
        </View>
      </TouchableOpacity>
    );
  };
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
  const url = async () => {
    let chaturl;
    let artistId;
    try {
      chaturl = await AsyncStorage.getItem("chat_url");

      artistId = await AsyncStorage.getItem("artistId");
    } catch (err) {}
    sb.connect(userID.toString(), function (user, error) {
      if (error) {
      } else {
        sb.GroupChannel.getChannel(chaturl, function (groupChannel, error) {
          if (error) {
            // Handle error.
          } else {
            groupChannel.leave(function (response, error) {
              if (error) {
                // Handle error.
              } else {
                ChatAPI.getChatRoom(userID, artistId)
                  .then((resp) => resp.json())
                  .then((resp) => {
                    ChatAPI.RemoveChatRoom(resp[0].id).then(
                      navigation.navigate("ห้องแชท"),
                      hideDialog()
                    );
                  });
              }
            });
          }

          // Through the "groupChannel" parameter of the callback function,
          // the group channel object identified with the CHANNEL_URL is returned by Sendbird server,
          // and you can get the group channel's data from the result object.
          const channelName = groupChannel.name;
        });
      }

      // The user is connected to Sendbird server.
    });
  };

  return (
    <Provider>
      <Portal>
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
          <Stack.Screen name="ห้องแชท" component={ChatList} />
          <Stack.Screen
            name="ห้องแชทศิลปิน"
            component={ChatRoom}
            options={{
              headerRight: () => <ActionBarImage />,
            }}
          />
        </Stack.Navigator>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text style={Style.text_300}>ออกจากแชท</Text>
          </Dialog.Title>
          <Dialog.Content>
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  marginTop: 7,
                  fontSize: 18,
                  fontFamily: "Kanit_300Light",
                }}
              >
                คุณต้องการออกจากห้องแชทใช่ไหม​ ?
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={() => {
                url();
              }}
            >
              <Text style={[Style.text_300, { color: "white" }]}>
                ออกห้องแชท
              </Text>
            </Button>
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={() => {
                hideDialog();
              }}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default StackChat;
