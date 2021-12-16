import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
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
import { ChatAPI } from "./ChatAPI";
import { useFocusEffect } from "@react-navigation/native";
import SendBird from "sendbird";
import { appId } from "@env";
import Style from "../Style";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const ChatList = ({ navigation, route }) => {
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

    if (isMounted && token) {
      ChatAPI.getChatRoom(jwt_decode(token, { payload: true }).user_id, "")
        .then((resp) => resp.json())
        .then((resp) => setChatRoom(resp))
        .catch((error) => {
          console.error(error);
        });
      setUserId(jwt_decode(token, { payload: true }).user_id);
      setUserName(jwt_decode(token, { payload: true }).user_name);
      setUserPic(jwt_decode(token, { payload: true }).user_picture);
    }
    return () => {
      isMounted = false;
    };
  }, [token]);
  const [artist, setArtist] = useState(null);
  const showDialog = () => setVisible(true);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  const showDialogChat = () => setVisibleChat(true);
  const [visibleChat, setVisibleChat] = useState(false);

  const hideDialogChat = () => setVisibleChat(false);
  const [chatRoom, setChatRoom] = useState(null);
  const fetchdata = () => {
    ChatAPI.getArtist()
      .then((resp) => resp.json())
      .then((resp) => setArtist(resp))
      .catch((error) => {
        console.error(error);
      });
  };
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        bootstrapAsync();
        fetchdata();
      }
      return () => {
        isMounted = false;
        setToken("");
      };
    }, [])
  );
  const ArtistAvatar = ({ size, uri }) => {
    return (
      <Avatar.Image
        style={{
          marginRight: 15,
          backgroundColor: "none",
        }}
        size={size}
        source={{
          uri: uri,
        }}
      />
    );
  };
  const ChatCard = ({ uri, name, chat_url, artistid }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ห้องแชทศิลปิน", {
            chat_url: chat_url,
            artistId: artistid,
            userName: userName,
            userID: userID,
            userPic: userPic,
          })
        }
      >
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ alignSelf: "center" }}>
              <ArtistAvatar size={60} uri={uri}></ArtistAvatar>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.artist_name}>ห้องแชทแฟนคลับ {name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  const [joinChatName, setJoinChatName] = useState("");
  const [joinChatUrl, setJoinChatUrl] = useState("");
  const [joinChatChatUrl, setJoinChatChatUrl] = useState("");
  const [artistId, setArtistId] = useState("");
  const ChatCardSelect = ({ uri, name, chat_url, artistid }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          showDialogChat();
          setJoinChatChatUrl(chat_url);
          setJoinChatUrl(uri);
          setJoinChatName(name);
          setArtistId(artistid);
        }}
      >
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ alignSelf: "center" }}>
              <ArtistAvatar size={60} uri={uri}></ArtistAvatar>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.artist_name}>แฟนคลับ {name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  const sb = new SendBird({ appId: appId });

  const joinChat = () => {
    sb.connect(userID.toString(), function (user, error) {
      if (error) {
      } else {
        sb.GroupChannel.getChannel(
          joinChatChatUrl,
          function (groupChannel, error) {
            if (error) {
              // Handle error
            } else {
              if (groupChannel.isPublic) {
                groupChannel.join(function (response, error) {
                  if (error) {
                    // Handle error.
                  } else {
                    ChatAPI.addChatRoom({
                      artist: parseInt(artistId),
                      user: userID,
                    })
                      .then((resp) => resp.json())
                      .catch((error) => {
                        console.error(error);
                      });
                    hideDialogChat();
                    hideDialog();
                    navigation.navigate("ห้องแชทศิลปิน", {
                      chat_url: joinChatChatUrl,
                      artistId: artistId,
                      userName: userName,
                      userID: userID,
                    });
                  }
                });
              }
            }

            // Through the "groupChannel" parameter of the callback function,
            // the group channel object identified with the CHANNEL_URL is returned by Sendbird server,
            // and you can get the group channel's data from the result object.
            const channelName = groupChannel.name;
          }
        );
      }

      // The user is connected to Sendbird server.
    });
  };

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        {chatRoom != null && artist ? (
          <View>
            {chatRoom != null && artist ? (
              <View>
                {chatRoom.map((item) =>
                  artist
                    .filter((filteritem) => item.artist === filteritem.id)
                    .map((filteritem) => (
                      <ChatCard
                        key={item.id.toString()}
                        chat_url={filteritem.chat_url}
                        name={filteritem.artist_name_EN}
                        uri={filteritem.artist_picture}
                        artistid={filteritem.id}
                      ></ChatCard>
                    ))
                )}
              </View>
            ) : null}
          </View>
        ) : null}
        <FAB
          style={styles.fab}
          icon={() => {
            return (
              <View style={{ alignSelf: "center" }}>
                <MaterialCommunityIcons
                  name="chat-plus"
                  size={25}
                  color="white"
                />
              </View>
            );
          }}
          onPress={() => {
            showDialog();
          }}
          theme={{ colors: { accent: "black" } }}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>
              <Text style={Style.text_300}>เข้าร่วมห้องแชท</Text>
            </Dialog.Title>
            <Dialog.Content style={{ marginBottom: 70 }}>
              <FlatList
                data={artist}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => (
                  <ChatCardSelect
                    chat_url={item.chat_url}
                    name={item.artist_name_EN}
                    uri={item.artist_picture}
                    artistid={item.id}
                  ></ChatCardSelect>
                )}
              ></FlatList>
            </Dialog.Content>
            <Dialog.Actions>
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
          <Dialog visible={visibleChat} onDismiss={hideDialogChat}>
            <Dialog.Title>
              <Text style={Style.text_300}>ห้องแชทศิลปิน</Text>
            </Dialog.Title>
            <Dialog.Content>
              <View style={{ alignSelf: "center" }}>
                <View style={{ alignSelf: "center", marginLeft: 15 }}>
                  <ArtistAvatar size={60} uri={joinChatUrl}></ArtistAvatar>
                </View>
                <View style={{ alignSelf: "center" }}>
                  <Text
                    style={{
                      marginTop: 7,
                      fontSize: 18,
                      fontFamily: "Kanit_300Light",
                    }}
                  >
                    {joinChatName}
                  </Text>
                </View>
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
                  joinChat();
                }}
              >
                <Text style={[Style.text_300, { color: "white" }]}>
                  เข้าร่วมห้องแชท
                </Text>
              </Button>

              <Button
                style={{ flex: 1, backgroundColor: "black" }}
                onPress={hideDialogChat}
              >
                <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};
const styles = StyleSheet.create({
  event: {
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: "100%",
    height: 77,
    alignSelf: "center",
    marginBottom: 1,
  },
  artist_name: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ChatList;
