import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import Style from "../Style";
import { useFocusEffect } from "@react-navigation/native";
import { HomeAPI } from "./HomeAPI";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Home({ navigation }) {
  const [artist, setArtist] = useState(null);
  const [artistfw, setArtistfw] = useState(null);
  const [event, setEvent] = useState(null);
  const [eventfw, setEventfw] = useState(null);
  const [token, setToken] = useState("");
  const [userID, setUserId] = useState(0);
  const fetchdata = () => {
    HomeAPI.getArtist()
      .then((resp) => resp.json())
      .then((resp) => setArtist(resp))
      .catch((error) => {
        console.error(error);
      });
    HomeAPI.getArtistFW(userID)
      .then((resp) => resp.json())
      .then((resp) => setArtistfw(resp))
      .catch((error) => {
        console.error(error);
      });
    HomeAPI.getEvent()
      .then((resp) => resp.json())
      .then((resp) => setEvent(resp))
      .catch((error) => {
        console.error(error);
      });
    HomeAPI.getEventFW(userID)
      .then((resp) => resp.json())
      .then((resp) => setEventfw(resp))
      .catch((error) => {
        console.error(error);
      });
  };
  const bootstrapAsync = async () => {
    try {
      setToken(await AsyncStorage.getItem("userToken"));
    } catch (e) {
      console.error(e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        bootstrapAsync();
        if (userID) {
          fetchdata();
        }
      }
      return () => {
        isMounted = false;
      };
    }, [userID])
  );

  useEffect(() => {
    let isMounted = true;

    if (isMounted && token) {
      setUserId(jwt_decode(token, { payload: true }).user_id);
    }
    return () => {
      isMounted = false;
    };
  }, [token]);
  useEffect(() => {
    let isMounted = true;
    if (isMounted && userID !== 0) {
      fetchdata();
      //fetchdataFollow();
      //fetchdataFollowCheck();
    }
    return () => {
      isMounted = false;
    };
  }, [userID]);

  const ArtistAvatar = ({ size, uri, id }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Artist", {
            id: id,
            initial: false,
            screen: "รายละเอียดศิลปิน",
            params: {
              id: id,
              screen: "ศิลปิน",
            },
          })
        }
      >
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
      </TouchableOpacity>
    );
  };
  const FeedEventCard = ({ bg, name, id, show_day, detail_update }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Events", {
            id: id,
            initial: false,
            screen: "รายละเอียดอีเว้นท์",
            params: {
              id: id,
              screen: "อีเว้นท์",
            },
          })
        }
      >
        <Card style={styles_event(bg).event}>
          <Card.Content style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1 }}>
              <Text style={Style.text_light}>
                วันที่เริ่มอีเว้นท์ : {show_day}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={Style.text_event}>{name}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text style={Style.text_light}>อัพเดต : {detail_update}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {artist && event ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={Style.text_header}>ศิลปินที่ติดตาม</Text>
          </View>
          <View style={{ flex: 2, alignContent: "center" }}>
            {artistfw ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  paddingStart: 14,
                }}
              >
                {artistfw.map((item) =>
                  artist
                    .filter((itemfilter) => itemfilter.id == item.artist)
                    .map((filteritem2) => (
                      <ArtistAvatar
                        size={60}
                        id={filteritem2.id}
                        uri={filteritem2.artist_picture}
                        key={filteritem2.id}
                      ></ArtistAvatar>
                    ))
                )}
              </ScrollView>
            ) : null}
          </View>
          <View style={{ flex: 1, marginBottom: 7 }}>
            <Text style={Style.text_header}>อีเว้นท์ที่ติดตาม</Text>
          </View>
          <View style={{ flex: 12 }}>
            {eventfw ? (
              <ScrollView>
                {eventfw.map((item) =>
                  event
                    .filter((itemfilter) => itemfilter.id == item.event)
                    .map((filteritem2) => (
                      <FeedEventCard
                        key={filteritem2.id}
                        bg="#FFF"
                        name={filteritem2.event_name}
                        show_day={filteritem2.show_day}
                        detail_update={filteritem2.detail_update}
                        id={filteritem2.id}
                      ></FeedEventCard>
                    ))
                )}
              </ScrollView>
            ) : (
              console.log("test")
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles_event = (bg) =>
  StyleSheet.create({
    event: {
      backgroundColor: bg,
      marginBottom: 7,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      width: "92%",
      height: 125,
      justifyContent: "center",
      alignSelf: "center",
    },
  });

export default Home;
