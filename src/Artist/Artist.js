import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Searchbar, Card } from "react-native-paper";
import { ArtistAvatar } from "../Home/Home";
const Artist = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const ArtsitCard = () => {
    return (
      <View>
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ alignSelf: "center" }}>
              <ArtistAvatar size={60}></ArtistAvatar>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.artist_name}>Artist</Text>
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
        style={{ marginBottom: 7 }}
      />
      <ScrollView>
        <ArtsitCard></ArtsitCard>
      </ScrollView>
    </View>
  );
};

const styles =
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
      width: "92%",
      height: 77,
      alignSelf: "center",
      marginTop: 7
    },
    artist_name: {
      fontSize: 18,
      fontFamily: "Kanit_400Regular",
    }

  });

export default Artist;
