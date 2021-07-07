import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Searchbar, Card } from "react-native-paper";
import { ArtistAvatar } from "../Home/Home";
const Artist = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const ArtsitCard = () => {
    return (
      <View>
        <Card style={styles_event().event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <ArtistAvatar></ArtistAvatar>
            </View>
            <View style={{ flex: 4, justifyContent: "center" }}>
              <Text>Artist</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="ค้นหาศิลปิน"
        onChangeText={onChangeSearch}
        value={searchQuery}
        inputStyle={{ fontFamily: "Kanit_400Regular" }}
      />

      <ArtsitCard></ArtsitCard>
    </View>
  );
};

const styles_event = () =>
  StyleSheet.create({
    event: {
      backgroundColor: "#fff",
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
      alignSelf: "center",
    },
    container: {
      flex: 1,
      padding: 20,
    },
  });

export default Artist;
