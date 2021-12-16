import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Searchbar, Card, Avatar } from "react-native-paper";
import { ArAPI } from "./ArtistAPI";
import { useFocusEffect } from "@react-navigation/native";

const Artist = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artist, setArtist] = useState(null);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    fetch(`http://128.199.116.6/api/artist/?search=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setArtist(resp))
      .catch((err) => console.log(err));
  };
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
    ArAPI.getArtist()
      .then((resp) => resp.json())
      .then((resp) => setArtist(resp))
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

  const ArtsitCard = ({ uri, name, id }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("รายละเอียดศิลปิน", {
            id: id,
          })
        }
      >
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ alignSelf: "center" }}>
              <ArtistAvatar size={60} uri={uri}></ArtistAvatar>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.artist_name}>{name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  console;
  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="ค้นหาศิลปิน"
        onChangeText={onChangeSearch}
        value={searchQuery}
        inputStyle={{ fontFamily: "Kanit_400Regular" }}
        style={{ marginBottom: 7 }}
      />

      <FlatList
        data={artist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView>
            <ArtsitCard
              uri={item.artist_picture}
              name={item.artist_name_EN}
              id={item.id}
            ></ArtsitCard>
          </ScrollView>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 7,
  },
  artist_name: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
  },
});

export default Artist;
