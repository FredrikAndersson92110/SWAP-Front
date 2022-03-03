import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Avatar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useFonts } from "expo-font";

export default HomeScreen = (props) => {
  const [loaded] = useFonts({
    Poppins_600SemiBold: require("../assets/fonts/Poppins-Bold.ttf"),
    Poppins_400Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Poppins_500Medium: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/background-1.png")}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* UserName and Avatar*/}
          <View style={styles.container3}>
            <Avatar
              size={64}
              rounded
              source={{
                uri: "https://www.brain-magazine.fr/m/posts/51944/originals/dragisbeautiful.jpg",
              }}
              title="KIM CHI"
              containerStyle={{ backgroundColor: "grey" }}
            >
              <Avatar.Accessory size={23} />
            </Avatar>
            <Text style={styles.boxTitle}>Atman</Text>
          </View>

          {/* Credit Temps */}
          <View style={styles.container2}>
            <Image
              style={styles.timeCounter}
              source={require("../assets/images/HomeScreen/timeCounter.png")}
            />
            <View style={styles.absolute}>
              <Text style={styles.title3}>3h</Text>
              <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>
                {" "}
                crédit temps
              </Text>
            </View>
          </View>

          {/* Informations User */}
          <View style={styles.container4}>
            <View style={styles.container4}>
              <Text style={styles.title}>
                Mes infos <FontAwesome name="gear" size={20} color="black" />
              </Text>
            </View>

            <View style={styles.container4}>
              <Text style={styles.title2}>Kim Chi , 25 ans</Text>
            </View>

            <View style={styles.container4}>
              <Text style={styles.title2}>Adresse 1 </Text>
              <Text style={styles.text}>114 Avenue des Champs Elysées</Text>
              <Text style={styles.text}>75008</Text>
            </View>

            <View style={styles.container4}>
              <Text style={styles.title2}>Adresse 2 </Text>
              <Text style={styles.text}>
                17 Avenue du style chiant à mourir
              </Text>
              <Text style={styles.text}>75004</Text>
            </View>

            <View style={styles.container4}>
              <Text style={styles.title}>
                Mes compétences{" "}
                <FontAwesome name="gear" size={20} color="black" />
              </Text>

              <Text style={styles.text}>Bricolage </Text>
              <Text style={styles.text}>Cours de piano</Text>
              <Text style={styles.text}>Soutien scolaire</Text>
              <Text style={styles.text}>Cours de piano</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
  },

  container2: {
    width: "100%",
    height: "100%",
    flex: 1,
    marginBottom: 30,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  container3: {
    width: "100%",
    height: "100%",
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    marginLeft: 25,
  },
  container4: {
    width: "90%",
    height: "100%",
    flex: 1,

    borderWidth: 0,
    borderRadius: 15,
    flexDirection: "column",
    backgroundColor: "white",
    marginBottom: 20,
    paddingVertical: 15,
  },
  boxTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    textAlign: "left",
    marginLeft: 20,
  },
  box: {
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    padding: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    marginBottom: 40,
  },
  image: {
    width: "90%",
    borderRadius: 15,
    resizeMode: "contain",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },

  input: {
    padding: 10,
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  fonts: {
    marginBottom: 8,
  },

  timeCounter: {
    width: "40%",
    height: 120,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 4,
    fontSize: 18,
    marginLeft: 30,
  },
  title2: {
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 4,
    fontSize: 16,
    marginLeft: 30,
  },
  text: {
    fontFamily: "Poppins_400Regular",
    marginVertical: 4,
    fontSize: 16,
    marginLeft: 30,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title3: {
    marginVertical: 4,
    fontSize: 25,
    fontFamily: "Poppins_600SemiBold",
  },
});
