import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import Style from "../Style";
const FeedEventCard = ({ bg }) => {
  return (
    <Card style={styles_event(bg).event}>
      <Card.Content style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1 }}>
          <Text style={Style.text_light}>วันที่ </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={Style.text_event}>คอน</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={Style.text_light}>อัพเดต</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export const ArtistAvatar = ({ size }) => {
  return (
    <Avatar.Image
      style={{
        marginRight: 15,
        backgroundColor: "none",
      }}
      size={size}
      source={require("../../a.jpg")}
    />
  );
};
function Home() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={Style.text_header}>ศิลปินที่ติดตาม</Text>
      </View>
      <View style={{ flex: 2 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingStart: 14,
          }}
        >
          <ArtistAvatar size={60}></ArtistAvatar>
          <ArtistAvatar size={60}></ArtistAvatar>
          <ArtistAvatar size={60}></ArtistAvatar>
        </ScrollView>
      </View>
      <View style={{ flex: 1, marginBottom: 7 }}>
        <Text style={Style.text_header}>อีเว้นท์ที่ติดตาม</Text>
      </View>
      <View style={{ flex: 12 }}>
        <ScrollView>
          <FeedEventCard bg="#FFF"></FeedEventCard>

        </ScrollView>
      </View>
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
