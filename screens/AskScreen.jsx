import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { useFonts } from "expo-font";

export default function AskScreen(props) {
  const [loaded] = useFonts({
    Poppins_400Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Poppins_500Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Poppins_600SemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-1.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View styles={{ marginTop: 50 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("ComposeRequestScreen", {
                screen: "ComposeRequestScreen",
              });
            }}
          >
            <Text style={styles.newRequest}>Créer une nouvelle demande</Text>
          </TouchableWithoutFeedback>

          <Input
            onPressIn={() => {
              props.navigation.navigate("ComposeRequestScreen", {
                screen: "ComposeRequestScreen",
              });
            }}
            placeholder="Trouver un service"
            inputContainerStyle={styles.input}
            containerStyle={{
              paddingHorizontal: 0,
              marginTop: 0,
              width: "95%",
            }}
            leftIcon={
              <Entypo name="magnifying-glass" size={24} color="#F7CE46" />
            }
            onPressIn={() => {
              props.navigation.navigate("ComposeRequestScreen");
            }}
          />
        </View>
        <ScrollView
          style={{
            flex: 1,
            padding: 15,
            marginTop: 0,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* PAGE TITLE */}
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={styles.pageTitle}>Mes demandes</Text>
            <Text
              style={{
                paddingRight: 30,
                marginBottom: 20,
                fontFamily: "Poppins_400Regular",
                fontSize: 12,
              }}
            >
              Accepte des missions pour ajouter du temps à ton compteur
            </Text>
          </View>

          <Text
            style={{
              paddingLeft: 10,
              marginBottom: 10,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Demande de cours de Chinois
          </Text>

          {/* CARD */}
          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/avatar.png")}
                style={styles.avatar}
              ></Image>
              <View>
                <Text style={styles.cardTitle}>Théo</Text>
                <Text style={styles.bodyText}>
                  Propose des cours de chinois
                </Text>

                {/* CITY */}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="map-marker-radius"
                    size={16}
                    color="#F7CE46"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.bodyText}>Courbevoie (6 km)</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate("DetailScreen", {
                  screen: "DetailScreen",
                });
              }}
            >
              <Text style={styles.text}>Détails</Text>
            </TouchableOpacity>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/avatar.png")}
                style={styles.avatar}
              ></Image>
              <View>
                <Text style={styles.cardTitle}>Théo</Text>
                <Text style={styles.bodyText}>
                  Propose des cours de chinois
                </Text>

                {/* CITY */}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="map-marker-radius"
                    size={16}
                    color="#F7CE46"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.bodyText}>Courbevoie (6 km)</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate("DetailScreen", {
                  screen: "DetailScreen",
                });
              }}
            >
              <Text style={styles.text}>Détails</Text>
            </TouchableOpacity>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/avatar.png")}
                style={styles.avatar}
              ></Image>
              <View>
                <Text style={styles.cardTitle}>Théo</Text>
                <Text style={styles.bodyText}>
                  Propose des cours de chinois
                </Text>

                {/* CITY */}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="map-marker-radius"
                    size={16}
                    color="#F7CE46"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.bodyText}>Courbevoie (6 km)</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate("DetailScreen", {
                  screen: "DetailScreen",
                });
              }}
            >
              <Text style={styles.text}>Détails</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#F7CE46",
    alignItems: "center",
    width: "85%",
    height: 35,
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 8,

    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 10,
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    letterSpacing: 0.6,
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 15,
    paddingBottom: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderRadius: 15,
    marginBottom: 30,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginLeft: 0,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Poppins_500Medium",
  },
  bodyText: {
    color: "#717171",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: 20,
    marginLeft: 20,
  },
  input: {
    paddingLeft: 13,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 15,
    color: "lightgrey",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    borderBottomWidth: 0,
    width: "95%",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },
  newRequest: {
    fontSize: 16,
    marginLeft: 20,
    fontFamily: "Poppins_600SemiBold",
  },
});
