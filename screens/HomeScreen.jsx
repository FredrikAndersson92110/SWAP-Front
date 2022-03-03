import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { Feather, Entypo } from "@expo/vector-icons";
import Suggestions from "../components/HomeScreen/Suggestions";

import { useFonts } from "expo-font";

//REDUX
import { connect } from "react-redux";

const HomeScreen = (props) => {
  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-1.png")}
      resizeMode="cover"
    >
      <View style={(styles.container, { marginTop: 50 })}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={
            (styles.container,
            {
              width: "100%",
            })
          }
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* UserName */}
          <View style={styles.box}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 30,
              }}
            >
              <Feather
                name="user"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text
                style={styles.userName}
                onPress={() => {
                  props.navigation.navigate("UserScreen");
                }}
              >
                {props.user.firstName}
              </Text>
            </View>
          </View>

          {/* Credit Temps */}
          <View style={styles.container}>
            <Image
              style={styles.timeCounter}
              source={require("../assets/images/HomeScreen/timeCounter.png")}
            />
            <Text
              style={
                (styles.boxTitle,
                { fontSize: 25, fontFamily: "Poppins_600SemiBold" })
              }
            >
              {props.user.user_credit}h
            </Text>
            <Text
              style={
                (styles.boxTitle,
                {
                  fontWeight: "700",
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                })
              }
            >
              Crédit temps
            </Text>
          </View>
          {/* //
          // EN COURS
          // */}
          {/* Ma recherche */}
          <View style={styles.searchBox}>
            <Text style={styles.boxTitle}>Ma recherche</Text>
            <Input
              placeholder="Trouver un service"
              inputContainerStyle={styles.input}
              containerStyle={{ paddingHorizontal: 0, marginTop: 0 }}
              leftIcon={
                <Entypo name="magnifying-glass" size={24} color="#F7CE46" />
              }
              placeholderTextColor={{ color: "blue" }}
              onPressIn={() => {
                props.navigation.navigate("ComposeRequestScreen", {
                  screen: "ComposeRequestScreen",
                });
              }}
            />
          </View>
          {/* MAP */}
          <View style={styles.mapBox}>
            <Text style={styles.boxTitle}>Mes missions à proximité</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate("TinderScreen", {
                  screen: "TinderScreen",
                });
              }}
            >
              <Image
                style={styles.imageMap}
                source={require("../assets/images/HomeScreen/map.png")}
              />
            </TouchableWithoutFeedback>
            <Image
              source={require("../assets/avatar.png")}
              style={{
                borderRadius: 50,
                height: 55,
                width: 55,
                position: "relative",
                left: "42.5%",
                bottom: "70%",
              }}
            />
          </View>

          {/* Mes envies */}
          <View style={styles.suggestionsBox}>
            <Text style={styles.suggestionsTitle}>Mes envies</Text>
          </View>
          <Suggestions />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  box: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 15,
  },
  searchBox: {
    width: "100%",
    height: 100,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    marginTop: 40,
  },
  mapBox: {
    width: "100%",
    height: 240,
    justifyContent: "flex-start",
    padding: 15,

    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
  },
  suggestionsBox: {
    width: "100%",
    justifyContent: "flex-start",
    padding: 15,
    paddingBottom: 0,
    elevation: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  boxTitle: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  userName: {
    fontWeight: "700",
    fontSize: 22,
    textAlign: "left",
    fontFamily: "Poppins_600SemiBold",
  },
  suggestionsTitle: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "left",
    marginTop: 20,
    marginLeft: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  image: {
    width: "100%",
    borderRadius: 15,
    resizeMode: "contain",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
  },
  imageMap: {
    width: "100%",
    height: 160,
    borderRadius: 20,
    resizeMode: "contain",
  },
  suggestionsImage: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    resizeMode: "contain",
  },
  input: {
    paddingLeft: 13,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 50,
    height: 40,
    color: "lightgrey",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    borderBottomWidth: 0,
  },
  timeCounter: {
    width: "40%",
    height: 120,
    resizeMode: "contain",
    position: "absolute",
  },
});

function mapStateToProps(state) {
  return { user: state.userReducer };
}

export default connect(mapStateToProps, null)(HomeScreen);
