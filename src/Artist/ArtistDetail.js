import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ArtistAvatar } from "../Home/Home";
import { Button, Card, Avatar } from "react-native-paper";
import Style from "../Style";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { ArAPI } from "./ArtistAPI";
import { useFocusEffect } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ArtistDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [artist, setArtist] = useState({});
  const [artistEvent, setArtistEvent] = useState(null);
  const [venue, setVenue] = useState(null);
  const [token, setToken] = useState("");
  const [userID, setUserId] = useState(0);
  const [artist_follow, serArtistFollow] = useState(0);
  const [checkFollow, setCheckFollow] = useState(null);
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
  const fetchdata = () => {
    ArAPI.getArtistId(id)
      .then((resp) => resp.json())
      .then((resp) => setArtist(resp))
      .catch((error) => {
        console.error(error);
      });
    ArAPI.getArtistEvent(id)
      .then((resp) => resp.json())
      .then((resp) => setArtistEvent(resp))
      .catch((error) => {
        console.error(error);
      });
    ArAPI.getVenue()
      .then((resp) => resp.json())
      .then((resp) => setVenue(resp))
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchdataFollow = () => {
    ArAPI.getArtistId(id)
      .then((resp) => resp.json())
      .then((resp) => serArtistFollow(resp.artist_follow))
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchdataFollowCheck = () => {
    ArAPI.CheckArtistFollow(userID, id)
      .then((resp) => resp.json())
      .then((resp) => setCheckFollow(resp))
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
      if (isMounted && id) {
        bootstrapAsync();
        if (userID) {
          fetchdata();
          fetchdataFollow();
          fetchdataFollowCheck();
        }
      }
      return () => {
        isMounted = false;
      };
    }, [id])
  );
  useEffect(() => {
    let isMounted = true;
    if (isMounted && userID !== 0) {
      fetchdata();
      fetchdataFollow();
      fetchdataFollowCheck();
    }
    return () => {
      isMounted = false;
    };
  }, [userID]);
  useEffect(() => {
    let isMounted = true;

    if (isMounted && token) {
      setUserId(jwt_decode(token, { payload: true }).user_id);
    }
    return () => {
      isMounted = false;
    };
  }, [token]);

  const EventCard = ({ showdate, eventname, venueshow, id }) => {
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
        <Card style={styles_event.event}>
          <Card.Content style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1 }}>
              <Text style={Style.text_light}>วันเริ่มอีเว้นท์ {showdate} </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={Style.text_event}>{eventname}</Text>
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
                  <EvilIcons name="location" size={20} color="#000" />
                </View>
                <View style={{ flex: 1 }}>
                  {venueshow && venue ? (
                    <Text style={Style.text_light}>
                      {venue
                        .filter((item) => item.id === venueshow)
                        .map((filteritem) => (
                          <Text key={filteritem.id}>{filteritem.name};</Text>
                        ))}
                    </Text>
                  ) : (
                    <Text style={Style.text_light}>ยังไม่ประกาศ</Text>
                  )}
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  const addArtistFollow = () => {
    ArAPI.addfollower(id)
      .then((resp) => resp.json())
      .then(() => fetchdataFollow())
      .then(() => fetchdataFollowCheck())
      .catch((error) => {
        console.error(error);
      });
  };
  const Follow = () => {
    ArAPI.addArtistFollow({ newuser: userID, artist: id })
      .then((resp) => resp.json())
      .then(() => {
        addArtistFollow();
      })

      .catch((error) => {
        console.error(error);
      });
  };
  const minusArtistFollow = () => {
    ArAPI.minusfollower(id)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp.id))
      .then(() => fetchdataFollow())
      .then(() => fetchdataFollowCheck())
      .catch((error) => {
        console.error(error);
      });
  };
  const unFollow = () => {
    ArAPI.DeleteArtistFollow(checkFollow[0].id)
      .then((resp) => resp.text())
      .then((resp) => console.log(resp.id))
      .then(() => {
        minusArtistFollow();
      })

      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      {artist && checkFollow ? (
        <View style={{ flex: 2, flexDirection: "row", marginBottom: 14 }}>
          <View style={{ marginTop: 14, marginLeft: 14, flex: 1 }}>
            <ArtistAvatar size={72} uri={artist.artist_picture}></ArtistAvatar>
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text style={Style.text_artist_detail}>
              {artist.artist_name_EN}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 14,
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={Style.text_300}>{artist_follow}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              {Object.keys(checkFollow).length !== 0 ? (
                <Button
                  mode="contained"
                  onPress={() => {
                    unFollow();
                  }}
                  style={Style.unfollow_btn}
                >
                  <Text style={Style.text_event}>ยกเลิกติดตาม</Text>
                </Button>
              ) : (
                <Button
                  mode="contained"
                  onPress={() => {
                    Follow();
                  }}
                  style={Style.follow_btn}
                >
                  <Text style={Style.text_event}>ติดตาม</Text>
                </Button>
              )}
            </View>
          </View>
        </View>
      ) : null}
      <View style={{ flex: 8.7 }}>
        <View style={{ marginLeft: 14, marginTop: 7 }}>
          <Text style={Style.text_event}>อีเว้นท์</Text>
        </View>
        {artistEvent ? (
          <ScrollView>
            {artistEvent.map((item) => (
              <EventCard
                key={item.id}
                eventname={item.event_name}
                showdate={item.show_day}
                venueshow={item.venue}
                id={item.id}
              ></EventCard>
            ))}
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
};
const styles_event = StyleSheet.create({
  event: {
    backgroundColor: "#FFF",
    marginTop: 7,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 7,

    elevation: 5,
    width: "92%",
    height: 125,
    justifyContent: "center",
    alignSelf: "center",
  },
});
export default ArtistDetail;
