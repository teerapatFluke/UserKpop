import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Provider,
  TextInput,
  Button,
  HelperText,
  Dialog,
  Portal,
} from "react-native-paper";

import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RNS3 } from "react-native-aws3";
import { Access, Secret, appId } from "@env";
import { MenuAPI } from "./MenuAPI";
import Style from "../Style";
import { AuthContext } from "../Auth/AuthProvider";

import { useFocusEffect } from "@react-navigation/native";
import SendBird from "sendbird";

const UserDetail = ({ route }) => {
  const [buttonhide, setbuttonhide] = useState(true);

  const { userPic, userName, userID } = route.params;
  const sb = new SendBird({ appId: appId });
  const [user_name, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [imgName, setImageName] = useState("");
  const [user_id, setUserID] = useState("");
  const [user_pic, setUserPic] = useState("");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordError2, setPasswordError2] = useState(false);

  const [user_nameError, setUserNameError] = useState(false);
  const [user_nameErrText, setUsernameErrText] = useState("");
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
    setbuttonhide(false);
  };

  const hideDialog = () => {
    setVisible(false);
    setbuttonhide(true);
  };
  const { signOut } = useContext(AuthContext);
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        setUserID(userID);
        setUserPic(userPic);
        setUserName(userName);
        setImage(userPic);
      }
      return () => {
        setUserID("");
        setImageName("");
        setImage("");
        setUserName("");
      };
    }, [userPic, userName, userID])
  );

  const pickImage = async () => {
    let name = user_name + moment().format("MMMMDoYYYYhmmssa");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageName(name);
      setUserPic("https://kpop1.s3.ap-southeast-1.amazonaws.com/" + name);
    }
  };

  const uploadFile = () => {
    if (Object.keys(image).length == 0) {
      alert("Please select image first");
      return;
    }
    RNS3.put(
      {
        uri: image,
        name: imgName,
        type: "image/jpeg",
      },
      {
        keyPrefix: "",
        bucket: "kpop1",
        region: "ap-southeast-1",
        accessKey: Access,
        secretKey: Secret,
        successActionStatus: 201,
      }
    ).then((response) => {
      if (response.status !== 201) alert("Failed to upload image to S3");
      console.log(response.body);
    });
  };
  const updateUser = () => {
    if (user_name == "") {
      setUserNameError(true);
      setUsernameErrText("กรุณากรอกข้อมูล Username");
    } else if (password2 != password) {
      setPasswordError(true);
      setPasswordError2(true);
    } else if (userName != user_name || imgName !== "" || password !== "") {
      if (imgName !== "") {
        uploadFile();
      }
      MenuAPI.update_user(user_id, {
        picture: user_pic,
        password: password,
        user_name: user_name,
        old_user: userName,
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp == true) {
            setUserNameError(true);
            setUsernameErrText("Username นี้มีผู้อื่นใช้แล้ว");
          } else {
            sb.connect(user_id.toString(), function (user, error) {
              if (error) {
                // Handle error.
              } else {
                sb.updateCurrentUserInfo(
                  user_name,
                  user_pic,
                  function (response, error) {
                    if (error) {
                      // Handle error.
                    } else {
                      signOut();
                    }

                    // A new profile images is successfully uploaded to Sendbird server.
                    // You could redraw the profile in a view in response to this operation.
                  }
                );
              }

              // The user is connected to Sendbird server.
            });
          }
        })
        .catch((err) => console.log(err));
    }
    // if (imgName !== "") {
    //   uploadFile();
    //   MenuAPI.updatePic(user_id, { picture: user_pic })
    //     .then((resp) => resp.json())
    //     .then((resp) => console.log(resp))
    //     .catch((err) => console.log(err));
    // }
  };

  return (
    <Provider>
      {user_name ? (
        <Portal>
          <View>
            <View
              style={{ alignSelf: "center", marginTop: 7, marginBottom: 7 }}
            >
              {image ? (
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    style={style.addphoto_button}
                    source={{
                      uri: image,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.addphoto_button}
                  onPress={pickImage}
                >
                  <MaterialIcons name="add-a-photo" size={40} />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ marginLeft: 21, marginTop: 7 }}>
              <Text style={Style.text_400}>เปลี่ยน Username</Text>
            </View>
            <TextInput
              placeholder="Username"
              returnKeyType="next"
              value={user_name}
              mode="flat"
              style={{ backgroundColor: "#FFF", marginHorizontal: 14 }}
              onChangeText={(text) => {
                setUserName(text);
                setUserNameError(false);
              }}
              autoCapitalize="none"
            />
            <HelperText type="error" visible={user_nameError}>
              {user_nameErrText}
            </HelperText>
            <View style={{ marginLeft: 21, marginTop: 7 }}>
              <Text style={Style.text_400}>เปลี่ยน Password</Text>
            </View>
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
              ข้อมูล Password ใหม่ไม่ตรงกัน
            </HelperText>
            <TextInput
              placeholder="ยืนยัน Password ใหม่"
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
              ข้อมูล Password ใหม่ไม่ตรงกัน
            </HelperText>
            {buttonhide ? (
              <View style={{ alignSelf: "center", marginTop: 14 }}>
                <Button
                  mode="contained"
                  onPress={showDialog}
                  style={Style.Edit_Button}
                >
                  <Text style={[Style.text_300, { color: "white" }]}>
                    แก้ไขข้อมูล
                  </Text>
                </Button>
              </View>
            ) : null}
          </View>

          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>
              <Text style={Style.text_300}>ยืนยันการแก้ไข</Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text style={Style.text_300}>
                หลังจากแก้ไขข้อมูลเสร็จแล้วจะกลับไปหน้าเข้าสู่ระบบ
              </Text>
            </Dialog.Content>
            <Dialog.Actions
              style={{
                justifyContent: "center",
              }}
            >
              <Button
                style={{ flex: 1, backgroundColor: "black" }}
                onPress={() => {
                  updateUser();
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
      ) : null}
    </Provider>
  );
};
const style = StyleSheet.create({
  addphoto_button: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text_input: {
    width: "93%",
    marginTop: 7,
    alignSelf: "center",
    fontFamily: "Kanit_400Regular",
  },
});
export default UserDetail;
