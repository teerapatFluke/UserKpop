import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ArtistAvatar } from "../Home/Home";
import { Button } from "react-native-paper";
import Style from "../Style";
import { EventCard } from "../Events/Events";
const ArtistDetail = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ marginTop: 14, marginLeft: 14, flex: 1 }}>
          <ArtistAvatar size={72}></ArtistAvatar>
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text style={Style.text_artist_detail}>Artsit</Text>
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
            <Text style={Style.text_300}>ติดตาม</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Button
              mode="contained"
              onPress={() => console.log("Pressed")}
              style={Style.follow_btn}
            >
              <Text style={Style.text_event}>ติดตาม</Text>
            </Button>
          </View>
        </View>
      </View>
      <View style={{ flex: 6 }}>
        <View style={{ marginLeft: 14, marginTop: 7 }}>
          <Text style={Style.text_event}>อีเว้นท์</Text>
        </View>
        <ScrollView>
          <EventCard></EventCard>
        </ScrollView>
      </View>
    </View>
  );
};

export default ArtistDetail;
