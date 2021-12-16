import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import Style from "../Style";
import { useFocusEffect } from "@react-navigation/native";
import { HomeAPI } from "./HomeAPI";
import jwt_decode from "jwt-decode";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import moment from "moment";
import "moment/locale/th";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Test from "./Test";
function Home({ navigation }) {
  const [artist, setArtist] = useState(null);
  const [artistfw, setArtistfw] = useState([]);
  const [event, setEvent] = useState(null);
  const [eventfw, setEventfw] = useState([]);
  const [token, setToken] = useState("");
  const [userID, setUserId] = useState(0);
  const [venue, setVenue] = useState(null);

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
      .then((resp) => setEvent(resp.reverse()))
      .catch((error) => {
        console.error(error);
      });
    HomeAPI.getEventFW(userID)
      .then((resp) => resp.json())
      .then((resp) => setEventfw(resp))
      .catch((error) => {
        console.error(error);
      });
    HomeAPI.getVenue()
      .then((resp) => resp.json())
      .then((resp) => setVenue(resp))
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
  const FeedEventCard = ({
    name,
    id,
    show_day,
    detail_update,
    ticket_open,
    venueshow,
  }) => {
    const date_ticket_1wk = moment(ticket_open).subtract(7, "days");
    const date_show_1wk = moment(show_day).subtract(7, "days");
    const today = moment();

    let bg = "#FFFF";
    let color = "#000";
    if (date_show_1wk <= today) {
      bg = "#2c2c2c";
      color = "#FFFF";
    } else if (date_ticket_1wk <= today) {
      bg = "#E5E5E5";
    }

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
              {date_show_1wk <= today ? (
                <Text style={[Style.text_light, { color: color }]}>
                  วันที่เริ่มการแสดง : {moment(show_day).format("ll")}
                </Text>
              ) : (
                <View>
                  {date_ticket_1wk <= today ? (
                    <Text style={Style.text_light}>
                      วันจำหน่ายบัตร : {moment(ticket_open).format("ll")}
                    </Text>
                  ) : (
                    <View>
                      {show_day ? (
                        <Text style={[Style.text_light, { color: color }]}>
                          วันที่เริ่มการแสดง : {moment(show_day).format("ll")}
                        </Text>
                      ) : (
                        <View>
                          {ticket_open ? (
                            <Text style={Style.text_light}>
                              วันจำหน่ายบัตร :{moment(ticket_open).format("ll")}
                            </Text>
                          ) : (
                            <Text style={[Style.text_light, { color: color }]}>
                              วันที่เริ่มการแสดง : ยังไม่ประกาศ
                            </Text>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={[Style.text_event, { color: color }]}>{name}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <View style={{ flex1: 1 }}>
                  <EvilIcons name="location" size={20} color={color} />
                </View>
                <View style={{ flex: 1 }}>
                  {venueshow && venue ? (
                    <Text style={[Style.text_light, { color: color }]}>
                      {venue
                        .filter((item) => item.id === venueshow)
                        .map((filteritem) => (
                          <Text key={filteritem.id.toString()}>
                            {filteritem.name}
                          </Text>
                        ))}
                    </Text>
                  ) : (
                    <Text style={[Style.text_light, { color: color }]}>
                      ยังไม่ประกาศ
                    </Text>
                  )}
                </View>
              </View>
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
            {artistfw.length !== 0 ? (
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
            ) : (
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <Text style={Style.text_event}>
                  คุณยังไม่ได้ติดตามศิลปินใด ๆ
                </Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1, marginBottom: 7 }}>
            <Text style={Style.text_header}>อีเว้นท์ที่ติดตาม</Text>
          </View>
          <View style={{ flex: 12 }}>
            {eventfw.length !== 0 ? (
              <ScrollView>
                {event.map((item) =>
                  eventfw
                    .filter((itemfilter) => itemfilter.event == item.id)
                    .map((filteritem2) => (
                      <FeedEventCard
                        key={item.id}
                        ticket_open={item.ticket_open}
                        venueshow={item.venue}
                        name={item.event_name}
                        show_day={item.show_day}
                        detail_update={item.detail_update}
                        id={item.id}
                      ></FeedEventCard>
                    ))
                )}
              </ScrollView>
            ) : (
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <Text style={Style.text_event}>
                  คุณยังไม่ได้สนใจเข้าร่วมอีเว้นท์ใด ๆ
                </Text>
              </View>
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
