import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Style from "../Style";
import {
  TextInput,
  Button,
  HelperText,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
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
  const [buttonhide, setbuttonhide] = useState(true);
  const [detailErr, setdetailErr] = useState(false);
  const [headErr, setheadErr] = useState(false);

  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
    setbuttonhide(false);
  };

  const hideDialog = () => {
    setVisible(false);
    setbuttonhide(true);
  };
  const [visible2, setVisible2] = useState(false);
  const showDialog2 = () => {
    setVisible2(true);
    setbuttonhide(false);
  };

  const hideDialog2 = () => {
    setVisible2(false);
    setbuttonhide(true);
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
      .then((resp) => {
        if (
          "request_head" in resp &&
          resp.request_head[0] == "This field may not be blank."
        ) {
          setheadErr(true);
        } else if (
          "request_detail" in resp &&
          resp.request_detail[0] == "This field may not be blank."
        ) {
          setdetailErr(true);
        } else {
          setDetail("");
          setHeader("");
          showDialog2();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Provider>
      <Portal>
        <View style={{ flex: 1 }}>
          <View style={{ marginLeft: 14, marginTop: 7 }}>
            <Text style={Style.text_400}>?????????????????????????????????????????????????????????</Text>
          </View>
          <View style={Style.picker}>
            <Picker
              selectedValue={request_type}
              style={Style.text_400}
              itemStyle={Style.text_400}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="??????????????????" value="1" />
              <Picker.Item label="????????????????????????" value="2" />
            </Picker>
          </View>
          <View style={{ marginLeft: 14, marginTop: 7 }}>
            <Text style={Style.text_400}>??????????????????</Text>
          </View>
          <View style={{ marginHorizontal: 14, marginTop: 7 }}>
            <TextInput
              style={[Style.text_input, { height: 50 }]}
              placeholder="??????????????????"
              onChangeText={(text) => {
                setHeader(text);
                setheadErr(false);
              }}
              value={request_header}
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit_400Regular",
                  },
                },
              }}
            />
            <HelperText type="error" visible={headErr}>
              ???????????????????????????????????????????????????????????????
            </HelperText>
          </View>
          <View style={{ marginLeft: 14, marginTop: 7 }}>
            <Text style={Style.text_400}>??????????????????????????????????????????????????????</Text>
          </View>
          <View style={{ marginHorizontal: 14, marginTop: 7 }}>
            <TextInput
              numberOfLines={5}
              style={Style.text_input}
              placeholder="??????????????????????????????"
              multiline={true}
              mode="flat"
              value={request_detail}
              onChangeText={(text) => {
                setDetail(text);
                setdetailErr(false);
              }}
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit_400Regular",
                  },
                },
              }}
            />
            <HelperText type="error" visible={detailErr}>
              ???????????????????????????????????????????????????????????????????????????
            </HelperText>
          </View>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>
              <Text style={Style.text_300}>?????????????????????????????????????????????</Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text style={Style.text_300}>???????????????????????????????????????????????????????????????????????? ?</Text>
            </Dialog.Content>
            <Dialog.Actions
              style={{
                justifyContent: "center",
              }}
            >
              <Button
                style={{ flex: 1, backgroundColor: "black" }}
                onPress={() => {
                  addRequest();
                  hideDialog();
                }}
              >
                <Text style={[Style.text_300, { color: "white" }]}>????????????</Text>
              </Button>

              <Button
                style={{ flex: 1, backgroundColor: "black" }}
                onPress={hideDialog}
              >
                <Text style={[Style.text_300, { color: "white" }]}>??????????????????</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog visible={visible2} onDismiss={hideDialog2}>
            <Dialog.Title>
              <Text style={Style.text_300}>??????????????????????????????????????????</Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text style={Style.text_300}>?????????????????????????????????????????????</Text>
            </Dialog.Content>
            <Dialog.Actions
              style={{
                justifyContent: "center",
              }}
            >
              <Button
                style={{ flex: 1, backgroundColor: "black" }}
                onPress={hideDialog2}
              >
                <Text style={[Style.text_300, { color: "white" }]}>????????????</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
          {buttonhide ? (
            <View style={{ alignItems: "center", marginTop: 14 }}>
              <Button
                mode="contained"
                style={Style.Add_Button}
                onPress={showDialog}
              >
                <Text style={[Style.text_300, { color: "white" }]}>
                  ???????????????????????????
                </Text>
              </Button>
            </View>
          ) : null}
        </View>
      </Portal>
    </Provider>
  );
};

export default Request;
