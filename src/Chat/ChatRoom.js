import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SendBird from "sendbird";
import { appId } from "@env";
import Style from "../Style";
import { Searchbar, Card, Avatar, TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ChatRoom = ({ route }) => {
  const { userID, chat_url, userName, artistId, userPic } = route.params;

  const blue = "black";
  const sb = new SendBird({ appId: appId });
  const grey = "lightgrey";
  const [messageArr, setMessageArr] = useState([]);
  const [message, setMessage] = useState("");
  const [GroupChannel, setGroupChannel] = useState(null);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 78 : 0;

  useEffect(() => {
    sb.connect(userID.toString(), function (user, error) {
      if (error) {
      } else {
        sb.updateCurrentUserInfo(userName, "", function (response, error) {
          if (error) {
            // Handle error.
          }

          // A new profile images is successfully uploaded to Sendbird server.
          // You could redraw the profile in a view in response to this operation.
        });

        AsyncStorage.setItem("chat_url", chat_url);
        AsyncStorage.setItem("artistId", artistId.toString());
        sb.GroupChannel.getChannel(chat_url, function (groupChannel, error) {
          if (error) {
            // Handle error.
          } else {
            setGroupChannel(groupChannel);
            var listQuery = groupChannel.createPreviousMessageListQuery();
            listQuery.limit = 20;
            listQuery.includeMetaArray = false; // Retrieve a list of messages along with their metaarrays.
            listQuery.includeReaction = false; // Retrieve a list of messages along with their reactions.

            // Retrieving previous messages.
            listQuery.load(function (messages, error) {
              if (error) {
                // Handle error.
              } else {
                messages.map((item) => {
                  const user = item._sender;

                  if (user !== undefined) {
                    setMessageArr((messageArr) => [
                      ...messageArr,
                      {
                        id: Math.random(),
                        userName: user.nickname,
                        userPic: user.plainProfileUrl
                          ? user.plainProfileUrl
                          : "https://freesvg.org/img/abstract-user-flat-1.png",
                        message: item.message,
                      },
                    ]);
                  }
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
    return () => {
      setMessageArr([]);
    };
  }, []);

  const SendMesssage = () => {
    if (message != "") {
      const params = new sb.UserMessageParams();

      params.message = message;

      GroupChannel.sendUserMessage(params, function (userMessage, error) {
        if (error) {
          // Handle error.
        } else {
          setMessageArr((messageArr) => [
            ...messageArr,
            {
              userName: userName,
              message: message,
              userPic: userPic,
            },
          ]);
        }

        // A text message with detailed configuration is successfully sent to the channel.
        // By using userMessage.messageId, userMessage.message, userMessage.customType, and so on,
        // you can access the result object from Sendbird server to check your UserMessageParams configuration.
        // The current user can receive messages from other users through the onMessageReceived() method of an event handler.
        const messageId = userMessage.messageId;
      });
    }
  };

  var channelHandler = new sb.ChannelHandler();

  channelHandler.onMessageReceived = function (channel, message) {
    const user = message._sender;
    const lenght = messageArr.length + 1;
    if (user !== undefined) {
      setMessageArr((messageArr) => [
        ...messageArr,
        {
          id: lenght,
          userName: user.nickname,
          message: message.message,
          userPic: user.plainProfileUrl,
        },
      ]);
    }
  };

  sb.addChannelHandler("UNIQUE_HANDLER_ID", channelHandler);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={messageArr}
          contentContainerStyle={{ flexDirection: "column-reverse" }}
          inverted
          renderItem={({ item }) => (
            <View>
              <View style={{ justifyContent: "center", flexDirection: "row" }}>
                {item.userName !== userName ? (
                  <View style={{ alignSelf: "center" }}>
                    <Avatar.Image
                      style={{
                        marginLeft: 15,
                        backgroundColor: "none",
                      }}
                      size={35}
                      source={{
                        uri: item.userPic
                          ? item.userPic
                          : "https://freesvg.org/img/abstract-user-flat-1.png",
                      }}
                    />
                  </View>
                ) : null}

                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      marginLeft: item.userName == userName ? "auto" : 10,
                      marginRight: item.userName !== userName ? "auto" : 10,
                    }}
                  >
                    <Text
                      style={[style.text, { color: "black", fontSize: 14 }]}
                    >
                      {item.userName}
                    </Text>
                  </View>
                  <View
                    style={[
                      style.container,
                      {
                        backgroundColor:
                          item.userName == userName ? grey : blue,
                        marginLeft: item.userName == userName ? "auto" : 10,
                        marginRight: item.userName !== userName ? "auto" : 10,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        style.text,
                        {
                          color: item.userName == userName ? "black" : "white",
                        },
                      ]}
                    >
                      {item.message}
                    </Text>
                  </View>
                </View>
                {item.userName == userName ? (
                  <View style={{ alignSelf: "center" }}>
                    <Avatar.Image
                      style={{
                        marginRight: 15,
                        backgroundColor: "none",
                      }}
                      size={35}
                      source={{
                        uri: item.userPic
                          ? item.userPic
                          : "https://freesvg.org/img/abstract-user-flat-1.png",
                      }}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          )}
        ></FlatList>
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <View style={{ flexDirection: "row", marginHorizontal: 7 }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={[
                    Style.text_input,
                    {
                      height: 50,
                      width: "100%",
                      borderRadius: 20,
                      marginRight: 7,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      marginBottom: 14,

                      borderWidth: 1,
                    },
                  ]}
                  underlineColor="transparent"
                  onChangeText={(text) => setMessage(text)}
                  value={message}
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: "Kanit_400Regular",
                      },
                    },
                  }}
                />
              </View>
              <View style={{ marginLeft: 7 }}>
                <Button
                  mode="contained"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 150,
                    backgroundColor: "black",
                  }}
                  onPress={() => {
                    SendMesssage();

                    setMessage("");
                  }}
                >
                  <MaterialIcons name="send" size={30} color="white" />
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <View style={{ flexDirection: "row", marginHorizontal: 7 }}>
            <View style={{ flex: 1 }}>
              <TextInput
                style={[
                  Style.text_input,
                  {
                    height: 50,
                    width: "100%",
                    borderRadius: 20,
                    marginRight: 7,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    marginBottom: 14,

                    borderWidth: 1,
                  },
                ]}
                underlineColor="transparent"
                onChangeText={(text) => setMessage(text)}
                value={message}
                theme={{
                  fonts: {
                    regular: {
                      fontFamily: "Kanit_400Regular",
                    },
                  },
                }}
              />
            </View>
            <View style={{ marginLeft: 7 }}>
              <Button
                mode="contained"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 150,
                  backgroundColor: "black",
                }}
                onPress={() => {
                  SendMesssage();
                  setMessage("");
                }}
              >
                <MaterialIcons name="send" size={30} color="white" />
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "#3777f0",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  text: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
  },
});
export default ChatRoom;
