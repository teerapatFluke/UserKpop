import React, { useState, createContext, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthProvider";
import Style from "../Style";
import jwt_decode from "jwt-decode";

const Auth = ({ navigation }) => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [user_nameError, setUserNameError] = useState(false);
  const [user_nameErrText, setUsernameErrText] = useState("");
  const [PasswordErrText, setPasswordErrText] = useState("");

  const { signIn } = useContext(AuthContext);
  const login = async (data) => {
    if (user_name === "") {
      setUserNameError(true);
      setUsernameErrText("กรุณากรอกข้อมูล Username");
    } else if (password === "") {
      setPasswordError(true);
      setPasswordErrText("กรุณากรอกข้อมูล Password");
    } else
      fetch("http://128.199.116.6/api/get_token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.access) {
            AsyncStorage.setItem("userToken", resp.access);
            signIn({
              access: resp.access,
              userID: jwt_decode(resp.access, { payload: true }).user_id,
              userName: jwt_decode(resp.access, { payload: true }).user_name,
            });
          } else {
            setUserNameError(true);
            setUsernameErrText("ไม่พบข้อมูล Username หรือ Passwordในระบบ");
          }
        });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            color: "#000",
            alignSelf: "center",
            fontSize: 50,
            marginBottom: 20,
            fontFamily: "Kanit_400Regular",
          }}
        >
          เข้าสู่ระบบ
        </Text>
        <TextInput
          placeholder="Username"
          returnKeyType="next"
          value={user_name}
          style={{ backgroundColor: "#FFF", marginHorizontal: 14 }}
          mode="flat"
          onChangeText={(text) => {
            setUsername(text);
            setUserNameError(false);
          }}
          autoCapitalize="none"
        />
        <HelperText type="error" visible={user_nameError}>
          {user_nameErrText}
        </HelperText>
        <TextInput
          placeholder="Password"
          returnKeyType="next"
          secureTextEntry={true}
          value={password}
          mode="flat"
          style={{ backgroundColor: "#FFF", marginHorizontal: 14 }}
          onChangeText={(text) => {
            setPassword(text);

            setPasswordError(false);
          }}
          autoCapitalize="none"
        />
        <HelperText type="error" visible={passwordError}>
          {PasswordErrText}
        </HelperText>
        <View style={{ marginTop: 20 }}>
          <Button
            style={Style.Submit_Button}
            onPress={() => login({ user_name, password })}
          >
            <Text
              style={{
                fontFamily: "Kanit_400Regular",
                fontSize: 18,
                color: "white",
              }}
            >
              เข้าสู่ระบบ
            </Text>
          </Button>
        </View>
        <TouchableOpacity
          style={{ marginTop: 14, marginLeft: 14 }}
          onPress={() => navigation.navigate("ลงทะเบียน")}
        >
          <Text
            style={{
              fontFamily: "Kanit_400Regular",
              fontSize: 18,
              color: "#000",
            }}
          >
            ลงทะเบียน
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Auth;

// Create a context
