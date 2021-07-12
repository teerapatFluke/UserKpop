import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import Style from "../Style";
const EventDetail = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 3, justifyContent: "center", marginLeft: 14 }}>
          <Text style={Style.text_event}>Artsit</Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={Style.text_300}>ติดตาม</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Button
              mode="contained"
              onPress={() => console.log("Pressed")}
              style={Style.follow_btn}
            >
              <Text style={Style.text_event}>ติดตาม</Text>
            </Button>
          </View>
        </View>
      </View>
      <View style={{ flex: 6, flexDirection: "row" }}>
        <View style={{ marginLeft: 14, marginTop: 7, flex: 1, marginTop: 14 }}>
          <Text style={Style.text_event_deatil_header}>ศิลปิน</Text>
          <Text style={Style.text_event_deatil_header}>
            วันที่เริ่มอีเว้นท์
          </Text>
          <Text style={Style.text_event_deatil_header}>วันที่ขายบัตร</Text>
          <Text style={Style.text_event_deatil_header}>ราคาบัตร</Text>
          <Text style={Style.text_event_deatil_header}>ช่องทางการสั่งซื้อ</Text>
          <Text style={Style.text_event_deatil_header}>สถานที่จัด</Text>
          <Text style={Style.text_event_deatil_header}>ตัวแทนผู้จัด</Text>
        </View>
        <View
          style={{
            marginRight: 14,
            flex: 1,
            alignItems: "flex-end",
            marginTop: 7,
          }}
        >
          <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
          <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
          <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
          <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
          <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
          <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
          <Text style={Style.text_event_deatil}>ยังไม่ประกาศ</Text>
        </View>
      </View>
    </View>
  );
};

export default EventDetail;
