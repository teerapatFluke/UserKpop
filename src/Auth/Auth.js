import React, { useState } from "react";
import { View, Text, Style } from "react-native";
import { TextInput } from "react-native-paper";

const Auth = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  console.log(process.env.REACT_APP_S3_API_KEY);
  return (
    <View>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={userName}
        style={{ backgroundColor: "#FFF", marginHorizontal: 14 }}
        mode="outlined"
        onChangeText={(text) => setUserName(text)}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password}
        style={{ backgroundColor: "#FFF", marginHorizontal: 14 }}
        mode="outlined"
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
      />
    </View>
  );
};

export default Auth;
