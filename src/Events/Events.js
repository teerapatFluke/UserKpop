import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Searchbar, Card } from "react-native-paper";
import Style from '../Style';
import EvilIcons from "react-native-vector-icons/EvilIcons";

const EventCard = () => {

    const LocationIcon = <EvilIcons name="location-on" size={16} color="#000" />
    return (
        <Card style={styles_event.event}>
            <Card.Content style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1 }}>
                    <Text style={Style.text_light}>วันที่ </Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={Style.text_event}>คอน</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end", }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: "flex-end" }}>
                        <View style={{ flex1: 1, }}><EvilIcons name="location" size={20} color="#000" /></View>
                        <View style={{ flex: 1, }}><Text style={Style.text_light}>สถานที่</Text></View>
                    </View>

                </View>
            </Card.Content>
        </Card>
    );
};
const Events = () => {

    const [searchQuery, setSearchQuery] = React.useState("");

    const onChangeSearch = (query) => setSearchQuery(query);

    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                placeholder="ค้นหาอีเว้นท์"
                onChangeText={onChangeSearch}
                value={searchQuery}
                inputStyle={{ fontFamily: "Kanit_400Regular" }}
                style={{ marginBottom: 7 }}
            />
            <ScrollView>
                <EventCard></EventCard>
            </ScrollView>
        </View>
    )
}
const styles_event =
    StyleSheet.create({
        event: {
            backgroundColor: "#FFF",
            marginTop: 7,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            width: "92%",
            height: 125,
            justifyContent: "center",
            alignSelf: "center",

        },
    });
export default Events
