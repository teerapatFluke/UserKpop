import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Style from "../Style";
import { TextInput, Button } from "react-native-paper";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { MenuAPI } from "./MenuAPI";
const Request = () => {
  const [request_type, setSelectedValue] = useState("1");
  const [request_detail, setDetail] = useState("");
  const [request_header, setHeader] = useState("");
  const [token, setToken] = useState("");
  const [newuser, setUserId] = useState(0);
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
    }, [newuser])
  );
  useEffect(() => {
    let isMounted = true;

    if (isMounted && token) {
      setUserId(jwt_decode(token, { payload: true }).user_id);
    }
    return () => {
      isMounted = false;
    };
  }, [token]);
  const addRequest = () => {
    MenuAPI.addRequest({
      newuser,
      request_header,
      request_type,
      request_detail,
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .then(() => setDetail(""))
      .then(() => setHeader(""))
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginLeft: 14, marginTop: 7 }}>
        <Text style={Style.text_400}>เลือกประเภทคำร้องขอ</Text>
      </View>
      <View style={Style.picker}>
        <Picker
          selectedValue={request_type}
          style={Style.text_400}
          itemStyle={Style.text_400}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="ศิลปิน" value="1" />
          <Picker.Item label="อีเว้นท์" value="2" />
        </Picker>
      </View>
      <View style={{ marginLeft: 14, marginTop: 7 }}>
        <Text style={Style.text_400}>หัวข้อ</Text>
      </View>
      <View style={{ marginHorizontal: 14, marginTop: 7 }}>
        <TextInput
          style={Style.text_input}
          onChangeText={(text) => setHeader(text)}
          value={request_header}
          theme={{
            fonts: {
              regular: {
                fontFamily: "Kanit_400Regular",
              },
            },
          }}
        />
      </View>
      <View style={{ marginLeft: 14, marginTop: 7 }}>
        <Text style={Style.text_400}>รายละเอียดคำร้องขอ</Text>
      </View>
      <View style={{ marginHorizontal: 14, marginTop: 7 }}>
        <TextInput
          numberOfLines={5}
          style={Style.text_input}
          multiline={true}
          value={request_detail}
          onChangeText={(text) => setDetail(text)}
          theme={{
            fonts: {
              regular: {
                fontFamily: "Kanit_400Regular",
              },
            },
          }}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 14 }}>
        <Button mode="contained" style={Style.Add_Button} onPress={addRequest}>
          <Text style={Style.text_400}>ส่งข้อมูล</Text>
        </Button>
      </View>
    </View>
  );
};

export default Request;
