import React, { useState, createContext, useContext } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthProvider";
import Style from "../Style";
const Auth = () => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  return (
    <View>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={user_name}
        style={{ backgroundColor: "#FFF", marginHorizontal: 14 }}
        mode="outlined"
        onChangeText={(text) => setUsername(text)}
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
      <Button
        style={Style.Edit_Button}
        onPress={() => signIn({ user_name, password })}
      >
        <Text>Login</Text>
      </Button>
    </View>
  );
};

export default Auth;

// Create a context
