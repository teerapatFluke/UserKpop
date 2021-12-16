import React, { useState, createContext, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  TextInput,
  Button,
  HelperText,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthProvider";
import Style from "../Style";
import { appId } from "@env";
import SendBird from "sendbird";

const Register = ({ navigation }) => {
  const sb = new SendBird({ appId: appId });

  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordError2, setPasswordError2] = useState(false);
  const [passwordErrText, setPasswordErrText] = useState("");
  const [passwordErr2Text, setPasswordError2Text] = useState("");
  const [user_nameError, setUserNameError] = useState(false);
  const [user_nameErrText, setUsernameErrText] = useState("");
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [visible2, setVisible2] = useState(false);
  const showDialog2 = () => setVisible2(true);

  const hideDialog2 = () => setVisible2(false);
  const signUp = async (data) => {
    if (user_name === "") {
      setUserNameError(true);
      setUsernameErrText("กรุณากรอกข้อมูล Username");
    } else if (password === "") {
      setPasswordError(true);

      setPasswordErrText("กรุณากรอกข้อมูลรหัสผ่าน");
    } else if (password2 === "") {
      setPasswordError2Text("กรุณากรอกข้อมูลยืนยันรหัสผ่าน");
      setPasswordError2(true);
    } else if (password !== password2) {
      setPasswordError(true);

      setPasswordErrText("รหัสผ่านไมตรงกัน");
      setPasswordError2Text("รหัสผ่านไมตรงกัน");
      setPasswordError2(true);
    } else {
      fetch("http://128.199.116.6/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (
            resp.user_name[0] != "new user with this user name already exists."
          ) {
            sb.connect(resp.id.toString(), function (user, error) {
              if (error) {
                // Handle error.
              } else {
                sb.updateCurrentUserInfo(
                  resp.user_name,
                  "",
                  function (response, error) {
                    if (error) {
                      // Handle error.
                    } else {
                      showDialog(true);
                    }

                    // A new profile images is successfully uploaded to Sendbird server.
                    // You could redraw the profile in a view in response to this operation.
                  }
                );
              }

              // The user is connected to Sendbird server.
            });
          } else {
            setUserNameError(true);
            setUsernameErrText("Username นี้มีผู้ใช้อื่นใช้แล้ว");
          }
        });
    }
  };
  //const { signUp } = useContext(AuthContext);

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", marginHorizontal: 7 }}
        >
          <Text
            style={{
              color: "#000",
              alignSelf: "center",
              fontSize: 50,
              marginBottom: 20,
              fontFamily: "Kanit_400Regular",
            }}
          >
            ลงทะเบียน
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
            {passwordErrText}
          </HelperText>
          <TextInput
            placeholder="Confirm Passwordc"
            returnKeyType="next"
            secureTextEntry={true}
            value={password2}
            mode="flat"
            style={{ backgroundColor: "#FFF", marginHorizontal: 14 }}
            onChangeText={(text) => {
              setPassword2(text);
              setPasswordError2(false);
            }}
            autoCapitalize="none"
          />
          <HelperText type="error" visible={passwordError2}>
            {passwordErr2Text}
          </HelperText>

          <View style={{ marginTop: 20 }}>
            <Button style={Style.Submit_Button} onPress={() => showDialog2()}>
              <Text
                style={{
                  fontFamily: "Kanit_400Regular",
                  fontSize: 18,
                  color: "white",
                }}
              >
                ลงทะเบียน
              </Text>
            </Button>
          </View>
          <TouchableOpacity
            style={{ marginTop: 14, marginLeft: 14 }}
            onPress={() => navigation.navigate("เข้าสู่ระบบ")}
          >
            <Text
              style={{
                fontFamily: "Kanit_400Regular",
                fontSize: 18,
                color: "#000",
              }}
            >
              เข้าสู่ระบบ
            </Text>
          </TouchableOpacity>
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>
              <Text style={Style.text_300}>ผลการลงทะเบียน</Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text style={Style.text_300}>ลงทะเบียนสำเร็จ</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  hideDialog;
                  navigation.navigate("เข้าสู่ระบบ");
                }}
              >
                <Text style={[Style.text_300, { color: "#5d99c6" }]}>ตกลง</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog visible={visible2} onDismiss={hideDialog2}>
            <Dialog.Title>
              <Text style={Style.text_300}>ยืนยันการลงทะเบียน</Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text style={Style.text_300}>คุณยืนยันการลงทะเบียนใช่ไหม ?</Text>
            </Dialog.Content>
            <Dialog.Actions
              style={{
                justifyContent: "center",
              }}
            >
              <Button
                style={{ flex: 1, backgroundColor: "black" }}
                onPress={() => {
                  signUp({ user_name, password });
                  hideDialog2();
                }}
              >
                <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
              </Button>

              <Button
                style={{ flex: 1, backgroundColor: "black" }}
                onPress={hideDialog2}
              >
                <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default Register;
