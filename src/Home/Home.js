import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";

const FeedEventCard = ({ bg }) => {
  return (
    <Card style={styles_event(bg).event}>
      <Card.Content style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.text_light}>วันที่ </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.text_event}>คอน</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={styles.text_light}>อัพเดต</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export const ArtistAvatar = () => {
  return (
    <Avatar.Image
      style={{
        marginRight: 15,
        backgroundColor: "none",
      }}
      size={60}
      source={require("../../a.jpg")}
    />
  );
};
function Home() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text_header}>ศิลปินที่ติดตาม</Text>
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
          <ArtistAvatar></ArtistAvatar>
          <ArtistAvatar></ArtistAvatar>
          <ArtistAvatar></ArtistAvatar>
        </ScrollView>
      </View>
      <View style={{ flex: 1, marginBottom: 7 }}>
        <Text style={styles.text_header}>อีเว้นท์ที่ติดตาม</Text>
      </View>
      <View style={{ flex: 12 }}>
        <ScrollView>
          <FeedEventCard bg="#FCF7F7"></FeedEventCard>
          <FeedEventCard bg="#FCF7F7"></FeedEventCard>
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
      width: 382,
      height: 125,
      justifyContent: "center",
      alignSelf: "center",
    },
  });

const styles = StyleSheet.create({
  text_header: {
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    marginTop: 7,
    marginLeft: 14,
    marginBottom: 7,
  },
  RectangleShapeView: {
    width: 120 * 2,
    height: 120,
    backgroundColor: "#FFC107",

    marginTop: 7,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    justifyContent: "center",
    alignSelf: "center",
  },
  text_light: {
    fontSize: 14,
    fontFamily: "Kanit_200ExtraLight",
  },
  text_event: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
  },
});

export default Home;
