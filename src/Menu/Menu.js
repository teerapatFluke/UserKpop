import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Picker } from "react-native";
import Style from "../Style";
import { Avatar, Divider, Card, Button } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ArtistAvatar } from "../Home/Home";
import { AuthContext } from "../Auth/AuthProvider";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const Menu = ({ navigation }) => {
  const MenuCard = ({ name, screen }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(screen)}>
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
  const { signOut } = useContext(AuthContext);
  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 14 }}>
        <View>
          <UserAvatar size={72}></UserAvatar>
        </View>
        <View style={{ marginTop: 7, marginBottom: 14 }}>
          <Text style={Style.text_event}>เอ</Text>
        </View>
      </View>
      <MenuCard name="จัดการข้อมูลผู้ใช้"></MenuCard>
      <MenuCard name="จัดการการติดตาม"></MenuCard>
      <MenuCard
        name="ร้องขอศิลปิน/อีเว้นท์"
        screen="ร้องขอศิลปิน/อีเว้นท์"
      ></MenuCard>
      <MenuCard
        name="รายงานปัญหาแอพพลิเคชั่น"
        screen="รายงานปัญหาแอพพลิเคชั่น"
      ></MenuCard>
      <Button style={{ marginTop: 14 }} onPress={() => signOut()}>
        <Text style={{ color: "red" }}>signOut</Text>
      </Button>
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
