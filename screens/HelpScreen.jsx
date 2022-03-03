import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { useFonts } from "expo-font";

export default function HelpScreen(props) {
  const [loaded] = useFonts({
    Poppins_700Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Poppins_400Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Poppins_500Medium: require("../assets/fonts/Poppins-Medium.ttf"),
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
      {/* PAGE TITLE */}

      <View style={styles.container}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.pageTitle}>Aider ces swapers</Text>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 10,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Accepte des missions pour ajouter du temps à ton compteur
          </Text>
        </View>

        <ScrollView
          style={{
            flex: 1,
            padding: 15,
            marginTop: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* CARD */}
          <View style={styles.card}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("../assets/images/categories/bricolage.png")}
                  style={{ width: 21, height: 21, marginRight: 10 }}
                ></Image>
                <Text style={styles.cardTitle}>Bricolage</Text>
              </View>

              <Text style={styles.bodyText}>
                Célia à besoin d'aide pour fixer une étagère
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                }}
              >
                <FontAwesome
                  name="map-marker"
                  style={{ marginRight: 10 }}
                  size={16}
                  color="#F7CE46"
                />
                <Text style={styles.bodyText}>5Km (Paris 11eme)</Text>
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
              <Text style={styles.buttonTitle}>Détails</Text>
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
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    color: "black",
    backgroundColor: "#F7CE46",
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "90%",
    margin: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
  },
  buttonContainer: {
    // padding: 20,
    width: 310,
  },
  buttonTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Poppins_500Medium",
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
    borderRadius: 15,
    marginBottom: 30,
  },
  pageTitle: {
    fontSize: 24,
    marginLeft: 20,
    fontFamily: "Poppins_700Bold",
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "Poppins_700Bold",
  },
  bodyText: {
    color: "#717171",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Poppins_400Regular",
  },
});
