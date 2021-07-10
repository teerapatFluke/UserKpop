import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Style from "../Style";
import { Avatar, Divider, Card } from "react-native-paper";
import { Kanit_700Bold } from "@expo-google-fonts/kanit";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ArtistAvatar } from "../Home/Home";
const UserAvatar = ({ size }) => {
  return (
    <Avatar.Image
      style={{
        backgroundColor: "none",
      }}
      size={size}
      source={require("../../a.jpg")}
    />
  );
};

const ArtsitCard = () => {
  return (
    <View>
      <Card style={styles.event}>
        <Card.Content style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ alignSelf: "center", flex: 1 }}>
            <Text style={Style.text_300}>Menu</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
            <AntDesign name="right" size={20}></AntDesign>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
const Menu = () => {
  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 7 }}>
        <View>
          <UserAvatar size={72}></UserAvatar>
        </View>
        <View style={{ marginTop: 7 }}>
          <Text style={Style.text_event}>ชื่อ</Text>
        </View>
      </View>
      <ArtsitCard></ArtsitCard>
      <ArtsitCard></ArtsitCard>
    </View>
  );
};

const styles_menu = StyleSheet.create({
  box: {
    backgroundColor: "#FFF",
    width: "100%",
    height: 72,
    justifyContent: "center",
    flexDirection: "row",
  },
});

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
    marginTop: 7,
  },
});
export default Menu;
