import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Searchbar, Card } from "react-native-paper";
import Style from "../Style";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { EvAPI } from "./EventAPI";
import { useFocusEffect } from "@react-navigation/native";

const Events = ({ navigation }) => {
  const [event, setEvent] = useState(null);
  const [venue, setVenue] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [updatePlace, setupdatePlace] = useState(false);
  const EventCard = ({ showdate, eventname, venueshow }) => {
    return (
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
              style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}
            >
              <View style={{ flex1: 1 }}>
                <EvilIcons name="location" size={20} color="#000" />
              </View>
              <View style={{ flex: 1 }}>
                {venueshow ? (
                  <Text style={Style.text_light}>
                    {venue
                      .filter((item) => item.id === venueshow)
                      .map((filteritem) => (
                        <Text key={filteritem.id.toString()}>
                          {filteritem.name};
                        </Text>
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
    );
  };
  const onChangeSearch = (query) => setSearchQuery(query);
  const fetchdata = () => {
    EvAPI.getEvent()
      .then((resp) => resp.json())
      .then((resp) => setEvent(resp))
      .catch((error) => {
        console.error(error);
      });
    EvAPI.getVenue()
      .then((resp) => resp.json())
      .then((resp) => setVenue(resp))
      .catch((error) => {
        console.error(error);
      });
  };
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        fetchdata();
      }
      return () => {
        isMounted = false;
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="ค้นหาอีเว้นท์"
        onChangeText={onChangeSearch}
        value={searchQuery}
        inputStyle={{ fontFamily: "Kanit_400Regular" }}
        style={{ marginBottom: 7 }}
      />
      {event && venue ? (
        <FlatList
          data={event}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ScrollView>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("รายละเอียดอีเว้นท์", {
                    id: item.id,
                  })
                }
              >
                <EventCard
                  showdate={item.show_day}
                  eventname={item.event_name}
                  venueshow={item.venue}
                ></EventCard>
              </TouchableOpacity>
            </ScrollView>
          )}
        />
      ) : null}
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
export default Events;
