import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Style from "../Style";
import {
  Avatar,
  Divider,
  Card,
  Button,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ArtistAvatar } from "../Home/Home";
import { AuthContext } from "../Auth/AuthProvider";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { appId } from "@env";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

const Menu = ({ navigation, route }) => {
  const [token, setToken] = useState("");
  const [userID, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const [userPic, setUserPic] = useState("");
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const bootstrapAsync = async () => {
    try {
      setToken(await AsyncStorage.getItem("userToken"));
    } catch (e) {
      console.error(e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        bootstrapAsync();
      }
      return () => {
        isMounted = false;
      };
    }, [])
  );

  useEffect(() => {
    let isMounted = true;

    if (isMounted && token) {
      setUserId(jwt_decode(token, { payload: true }).user_id);
      setUserName(jwt_decode(token, { payload: true }).user_name);
      setUserPic(jwt_decode(token, { payload: true }).user_picture);
    }
    return () => {
      isMounted = false;
    };
  }, [token]);

  const MenuCard = ({ name, screen }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(screen, {
            userID: userID,
            userName: userName,
            userPic: userPic,
          })
        }
      >
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
      <View>
        {userPic ? (
          <Avatar.Image
            style={{
              backgroundColor: "none",
            }}
            size={size}
            source={{
              uri: userPic,
            }}
          />
        ) : (
          <Avatar.Image
            style={{
              backgroundColor: "none",
            }}
            size={size}
            source={require("../../user.jpeg")}
          />
        )}
      </View>
    );
  };
  const { signOut } = useContext(AuthContext);
  return (
    <Provider>
      <Portal>
        <View>
          <View style={{ alignItems: "center", marginTop: 14 }}>
            <View>
              <UserAvatar size={72}></UserAvatar>
            </View>
            <View style={{ marginTop: 7, marginBottom: 14 }}>
              <Text style={Style.text_event}>{userName}</Text>
            </View>
          </View>
          <MenuCard
            name="จัดการข้อมูลผู้ใช้"
            screen="จัดการข้อมูลผู้ใช้"
          ></MenuCard>
          <MenuCard
            name="ร้องขอศิลปิน/อีเว้นท์"
            screen="ร้องขอศิลปิน/อีเว้นท์"
          ></MenuCard>
          <MenuCard
            name="รายงานปัญหาแอพพลิเคชั่น"
            screen="รายงานปัญหา"
          ></MenuCard>
          <Button style={{ marginTop: 14 }} onPress={() => showDialog()}>
            <Text style={[Style.text_400, { color: "red" }]}>ออกจากระบบ</Text>
          </Button>
        </View>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text style={Style.text_300}>ยืนยันการออกจากระบบ</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={Style.text_300}>คุณยืนยันการออกจากระบบใช่ไหม ?</Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={() => {
                signOut();
                hideDialog();
              }}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
            </Button>

            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={hideDialog}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
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
