import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { Button, Card, Dialog, Portal, Provider } from "react-native-paper";
import Style from "../Style";
import { EvAPI } from "./EventAPI";
import { useFocusEffect } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import "moment/locale/th";
import { googole_key } from "@env";
import AppLoading from "expo-app-loading";
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
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };
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
      .then(() => fetchdataFollow())
      .then(() => fetchdataFollowCheck())
      .catch((error) => {
        console.error(error);
      });
  };
  const Follow = () => {
    EvAPI.addEventFollow({ user: userID, event: id })
      .then((resp) => resp.json())
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
      .then(() => fetchdataFollow())
      .then(() => fetchdataFollowCheck())
      .catch((error) => {
        console.error(error);
      });
  };
  const unFollow = () => {
    EvAPI.DeleteEventFollow(checkFollow[0].id)
      .then((resp) => resp.text())
      .then(() => {
        minusEventFollow();
      })

      .catch((error) => {
        console.error(error);
      });
  };
  const [place, setPlace] = useState("");
  const handleTicket = (type, detail) => {
    setPlace(detail);
    if (type == 2) {
      let phoneNumber = "";
      if (Platform.OS === "android") {
        phoneNumber = `tel:${detail}`;
      } else {
        phoneNumber = `telprompt:${detail}`;
      }
      Linking.openURL(phoneNumber);
    } else if (type == 1) {
      fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${googole_key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${resp.location.lat},${resp.location.lng}&key=${googole_key}&keyword=${detail}&rankby=distance`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((resp) => resp.json())
            .then((resp) => {
              if (resp.status != "ZERO_RESULTS") {
                var result = resp.results;
                var place = result.find((x) => x.name.includes(detail));

                fetch(
                  `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${googole_key}&fields=url`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                  .then((resp) => resp.json())
                  .then((resp) => Linking.openURL(resp.result.url));
              } else {
                showDialog();
              }
            });
        });
    } else {
      Linking.openURL(detail);
    }
  };
  const openLink = (url) => {
    Linking.openURL(url);
  };

  const MenuCard = ({ name, type, detail }) => {
    return (
      <TouchableOpacity onPress={() => handleTicket(type, detail)}>
        <View>
          <Card style={styles.event}>
            <Card.Content style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ alignSelf: "center", flex: 1 }}>
                <Text style={Style.text_300}>{name}</Text>
              </View>
              <View
                style={{ justifyContent: "center", alignItems: "flex-end" }}
              >
                <AntDesign name="right" size={20}></AntDesign>
              </View>
            </Card.Content>
          </Card>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Provider>
      <Portal>
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
                <View
                  style={{ flex: 3, justifyContent: "center", marginLeft: 14 }}
                >
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
                  <View
                    style={{ flex: 1, justifyContent: "center", marginTop: 7 }}
                  >
                    <Text style={Style.text_300}>{event_follow}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={Style.text_300_14}>ผู้สนใจเข้าร่วม</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    {checkFollow.length !== 0 ? (
                      <Button
                        mode="contained"
                        onPress={() => {
                          unFollow();
                        }}
                        style={Style.unfollow_btn}
                      >
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={[Style.text_300_14]}
                        >
                          สนใจเข้าร่วมแล้ว
                        </Text>
                      </Button>
                    ) : (
                      <Button
                        mode="contained"
                        onPress={() => {
                          Follow();
                        }}
                        style={Style.follow_btn}
                      >
                        <Text style={[Style.text_300_14, { color: "white" }]}>
                          สนใจเข้าร่วม
                        </Text>
                      </Button>
                    )}
                  </View>
                </View>
              </View>
              <View style={{ flex: 5, flexDirection: "row" }}>
                <View style={{ marginLeft: 14, flex: 1, marginTop: 14 }}>
                  <Text style={Style.text_event_deatil_header}>ศิลปิน</Text>
                  <Text style={Style.text_event_deatil_header}>
                    วันที่เริ่มการแสดง
                  </Text>
                  <Text style={Style.text_event_deatil_header}>
                    วันที่จำหน่ายบัตร
                  </Text>
                  <Text style={Style.text_event_deatil_header}>ราคาบัตร</Text>

                  <Text style={Style.text_event_deatil_header}>สถานที่จัด</Text>
                  <Text style={Style.text_event_deatil_header}>
                    ตัวแทนผู้จัด
                  </Text>
                  <Text style={Style.text_event_deatil_header}>
                    ช่องทางการสั่งซื้อ
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: 14,
                    flex: 1,
                    alignItems: "flex-end",
                    marginTop: 14,
                  }}
                >
                  <Text style={Style.text_event_deatil}>
                    {artistpost.map((item, i) =>
                      artist
                        .filter((item2) => item2.id === item)
                        .map((filteritem) => (
                          <Text key={filteritem.id}>
                            {filteritem.artist_name_EN}
                            {artistpost.length !== i + 1 ? (
                              <Text key={filteritem.id}>, </Text>
                            ) : null}
                          </Text>
                        ))
                    )}
                  </Text>
                  {event.show_day ? (
                    <Text style={Style.text_event_deatil}>
                      {moment(event.show_day).format("ll")}
                    </Text>
                  ) : (
                    <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
                  )}
                  {event.ticket_open ? (
                    <Text style={Style.text_event_deatil}>
                      {moment(event.ticket_open).format("ll")}
                    </Text>
                  ) : (
                    <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
                  )}
                  {event.ticket_price ? (
                    <View>
                      <Text style={Style.text_event_deatil}>
                        {event.ticket_price}
                        {event.ticket_price_end
                          ? "-" + event.ticket_price_end + " "
                          : null}
                        บาท
                      </Text>
                    </View>
                  ) : (
                    <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
                  )}

                  {event.venue ? (
                    <View>
                      {venue
                        .filter((item) => item.id == event.venue)
                        .map((filteritem) => (
                          <TouchableOpacity
                            key={filteritem.id}
                            onPress={() => {
                              openLink(filteritem.mapurl);
                            }}
                          >
                            <Text style={Style.text_event_deatil}>
                              {filteritem.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  ) : (
                    <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
                  )}
                  {event.promoter ? (
                    <Text style={Style.text_event_deatil}>
                      {promoter
                        .filter((item) => item.id == event.promoter)
                        .map((filteritem) => (
                          <Text
                            style={Style.text_event_deatil}
                            key={filteritem.id}
                          >
                            {filteritem.name}
                          </Text>
                        ))}
                    </Text>
                  ) : (
                    <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  flex: 5,
                }}
              >
                {ticketpost.length !== 0 ? (
                  <ScrollView>
                    {ticketpost.map((item, i) =>
                      ticket
                        .filter((item2) => item2.id === item)
                        .map((filteritem) => (
                          <MenuCard
                            detail={filteritem.detail}
                            type={filteritem.type}
                            key={filteritem.id}
                            name={filteritem.name}
                          ></MenuCard>
                        ))
                    )}
                  </ScrollView>
                ) : (
                  <View style={{ marginLeft: 14 }}>
                    <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <AppLoading />
          )}
        </View>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text style={Style.text_300}>ผลการดำเนินการ</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={Style.text_300}>ไม่พบ{place}ใกล้เคียง</Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              style={{ flex: 1 }}
              onPress={() => {
                hideDialog();
              }}
            ></Button>

            <Button style={{ flex: 1 }} onPress={hideDialog}>
              <Text style={[Style.text_300, { color: "#5d99c6" }]}>ตกลง</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};
const styles = StyleSheet.create({
  event: {
    backgroundColor: "#fff",

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
    height: 72,
    alignSelf: "center",
    marginBottom: 7,
  },
});
export default EventDetail;
