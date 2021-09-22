import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import Style from "../Style";
import { TextInput, Button } from "react-native-paper";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { MenuAPI } from "./MenuAPI";

const Problem = () => {
  const [problem_detail, setDetail] = useState("");
  const [problem_head, setHeader] = useState("");
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
  const addProblem = () => {
    MenuAPI.addProblem({
      newuser,
      problem_head,
      problem_detail,
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
        <Text style={Style.text_400}>หัวข้อ</Text>
      </View>
      <View style={{ marginHorizontal: 14, marginTop: 7 }}>
        <TextInput
          style={Style.text_input}
          onChangeText={(text) => setHeader(text)}
          value={problem_head}
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
        <Text style={Style.text_400}>รายละเอียดปัญหา</Text>
      </View>
      <View style={{ marginHorizontal: 14, marginTop: 7 }}>
        <TextInput
          numberOfLines={5}
          style={Style.text_input}
          multiline={true}
          value={problem_detail}
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
        <Button mode="contained" style={Style.Add_Button} onPress={addProblem}>
          <Text style={Style.text_400}>ส่งข้อมูล</Text>
        </Button>
      </View>
    </View>
  );
};

export default Problem;
