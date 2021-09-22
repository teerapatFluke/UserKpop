import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  text_header: {
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    marginTop: 7,
    marginLeft: 14,
    marginBottom: 7,
  },

  text_light: {
    fontSize: 14,
    fontFamily: "Kanit_200ExtraLight",
  },
  text_event: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
    color: "#000",
    flexWrap: "wrap",
  },
  text_300: {
    fontSize: 18,
    fontFamily: "Kanit_300Light",
    marginLeft: 14,
  },
  text_artist_detail: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
    marginLeft: 14,
  },
  follow_btn: {
    width: 150,
    height: 42,
    justifyContent: "center",
    backgroundColor: "#8EDA5F",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  unfollow_btn: {
    width: 150,
    height: 42,
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderColor: "#8EDA5F",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text_event_deatil_header: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
    color: "#000",
    marginTop: 7,
  },
  text_event_deatil: {
    fontSize: 18,
    fontFamily: "Kanit_300Light",
    color: "#000",
    marginTop: 8,
  },
  Edit_Button: {
    width: 144,
    height: 60,
    justifyContent: "center",
    backgroundColor: "#FFE57F",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignSelf: "center",
  },
  text_400: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
    color: "#000",
  },
  picker: {
    marginHorizontal: 14,
    height: 45,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    marginTop: 7,
  },
  text_input: {
    justifyContent: "center",
    fontFamily: "Kanit_400Regular",
    fontSize: 18,
  },
  Add_Button: {
    width: 144,
    height: 60,
    justifyContent: "center",
    backgroundColor: "#8EDA5F",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
