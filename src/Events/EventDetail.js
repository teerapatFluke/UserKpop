import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import Style from "../Style";
import { EvAPI } from "./EventAPI";
import { useFocusEffect } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
const EventDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [event, setEvent] = useState({});
  const [artist, setArtist] = useState(null);
  const [venue, setVenue] = useState(null);
  const [promoter, setPromoter] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [artistpost, setArtistpost] = useState([]);
  const [ticketpost, setTicketpost] = useState([]);
  const [token, setToken] = useState("");
  const [userID, setUserId] = useState(0);
  const [event_follow, setEventFollow] = useState(0);
  const [checkFollow, setCheckFollow] = useState(null);
  const fetchdata = () => {
    EvAPI.getEventId(id)
      .then((resp) => resp.json())
      .then((resp) => setEvent(resp))
      .catch((error) => {
        console.error(error);
      });
    EvAPI.getArtist()
      .then((resp) => resp.json())
      .then((resp) => setArtist(resp))
      .catch((error) => {
        console.error(error);
      });
    EvAPI.getPromoter()
      .then((resp) => resp.json())
      .then((resp) => setPromoter(resp))
      .catch((error) => {
        console.error(error);
      });
    EvAPI.getVenue()
      .then((resp) => resp.json())
      .then((resp) => setVenue(resp))
      .catch((error) => {
        console.error(error);
      });
    EvAPI.getTicket()
      .then((resp) => resp.json())
      .then((resp) => setTicket(resp))
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
  const fetchdataFollow = () => {
    EvAPI.getEventId(id)
      .then((resp) => resp.json())
      .then((resp) => setEventFollow(resp.event_follower))
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchdataFollowCheck = () => {
    EvAPI.CheckEventFollow(userID, id)
      .then((resp) => resp.json())
      .then((resp) => setCheckFollow(resp))
      .catch((error) => {
        console.error(error);
      });
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
      fetchdataFollow();
      fetchdataFollowCheck();
    }
    return () => {
      isMounted = false;
    };
  }, [userID]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && artist) {
      setArtistpost(event.artistpost);
    }
    return () => {
      isMounted = false;
    };
  }, [event, artist]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && artist) {
      setTicketpost(event.ticketpost);
    }
    return () => {
      isMounted = false;
    };
  }, [event, ticket]);
  const addEventFollow = () => {
    EvAPI.addfollower(id)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp.id))
      .then(() => fetchdataFollow())
      .then(() => fetchdataFollowCheck())
      .catch((error) => {
        console.error(error);
      });
  };
  const Follow = () => {
    EvAPI.addEventFollow({ user: userID, event: id })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp.id))
      .then(() => {
        addEventFollow();
      })

      .catch((error) => {
        console.error(error);
      });
  };
  const minusEventFollow = () => {
    EvAPI.minusfollower(id)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp.id))
      .then(() => fetchdataFollow())
      .then(() => fetchdataFollowCheck())
      .catch((error) => {
        console.error(error);
      });
  };
  const unFollow = () => {
    EvAPI.DeleteEventFollow(checkFollow[0].id)
      .then((resp) => resp.text())
      .then((resp) => console.log(resp.id))
      .then(() => {
        minusEventFollow();
      })

      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      {event &&
      artist &&
      artistpost &&
      ticketpost &&
      venue &&
      ticket &&
      promoter &&
      checkFollow ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 2, flexDirection: "row" }}>
            <View style={{ flex: 3, justifyContent: "center", marginLeft: 14 }}>
              <Text style={Style.text_event}>{event.event_name}</Text>
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
                <Text style={Style.text_300}>{event_follow}</Text>
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
          <View style={{ flex: 5, flexDirection: "row" }}>
            <View
              style={{ marginLeft: 14, marginTop: 7, flex: 1, marginTop: 14 }}
            >
              <Text style={Style.text_event_deatil_header}>ศิลปิน</Text>
              <Text style={Style.text_event_deatil_header}>
                วันที่เริ่มอีเว้นท์
              </Text>
              <Text style={Style.text_event_deatil_header}>วันที่ขายบัตร</Text>
              <Text style={Style.text_event_deatil_header}>ราคาบัตร</Text>

              <Text style={Style.text_event_deatil_header}>สถานที่จัด</Text>
              <Text style={Style.text_event_deatil_header}>ตัวแทนผู้จัด</Text>
              <Text style={Style.text_event_deatil_header}>
                ช่องทางการสั่งซื้อ
              </Text>
            </View>
            <View
              style={{
                marginRight: 14,
                flex: 1,
                alignItems: "flex-end",
                marginTop: 7,
              }}
            >
              <Text style={Style.text_event_deatil}>
                {artistpost.map((item, i) =>
                  artist
                    .filter((item2) => item2.id === item)
                    .map((filteritem) => (
                      <Text key={filteritem.id}>
                        {filteritem.artist_name_EN}
                        {artistpost.length !== i + 1 ? <Text>, </Text> : null}
                      </Text>
                    ))
                )}
              </Text>
              {event.show_day ? (
                <Text style={Style.text_event_deatil}>{event.show_day}</Text>
              ) : (
                <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
              )}
              {event.ticket_open ? (
                <Text style={Style.text_event_deatil}>{event.ticket_open}</Text>
              ) : (
                <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
              )}
              {event.ticket_price ? (
                <Text style={Style.text_event_deatil}>
                  {event.ticket_price}
                </Text>
              ) : (
                <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
              )}

              {event.venue ? (
                <Text style={Style.text_event_deatil}>
                  {venue
                    .filter((item) => item.id == event.venue)
                    .map((filteritem) => (
                      <Text style={Style.text_event_deatil} key={filteritem.id}>
                        {filteritem.name}
                      </Text>
                    ))}
                </Text>
              ) : (
                <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
              )}
              {event.promoter ? (
                <Text style={Style.text_event_deatil}>
                  {promoter
                    .filter((item) => item.id == event.promoter)
                    .map((filteritem) => (
                      <Text style={Style.text_event_deatil} key={filteritem.id}>
                        {filteritem.name}
                      </Text>
                    ))}
                </Text>
              ) : (
                <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
              )}
            </View>
          </View>
          <View style={{ flex: 4, marginLeft: 14 }}>
            {ticketpost.length !== 0 ? (
              <Text style={Style.text_event_deatil}>
                {ticketpost.map((item, i) =>
                  ticket
                    .filter((item2) => item2.id === item)
                    .map((filteritem) => (
                      <Text key={filteritem.id}>
                        {filteritem.name}
                        {"\n"}
                        {artistpost.length !== i + 1 ? <Text>,</Text> : null}
                      </Text>
                    ))
                )}
              </Text>
            ) : (
              <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default EventDetail;
