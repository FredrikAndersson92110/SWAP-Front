import React, { useState, useRef, useEffect } from "react";
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
import { Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SwipeCards from "react-native-swipe-cards-deck";

function Card({ data }) {
  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
      <Text>{data.text}</Text>
      <Text>{data.title}</Text>
      <Image
        source={require("../assets/images/categories/bricolage.png")}
        style={{ width: 150, height: 150, marginLeft: 60, marginBottom: 70 }}
      ></Image>
    </View>
  );
}

function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

export default function TinderScreen(props) {
  const [cards, setCards] = useState();

  useEffect(() => {
    setTimeout(() => {
      setCards([
        {
          text: "Ready for SWAP ? ",
          backgroundColor: "#F7CE46",
          title: "YEAHHH",
        },
        { text: "Un plombier Hot ?", backgroundColor: "#F7CE46" },
        { text: "Escort with a hot body ? ", backgroundColor: "#F7CE46" },
        { text: "You wanna live fancy?", backgroundColor: "#F7CE46" },
        { text: "Party in France?", backgroundColor: "#F7CE46" },
        {
          text: "You better work, bitch, you better work, bitch",
          backgroundColor: "#F7CE46",
        },
      ]);
    }, 3000);
  }, []);

  function handleYup(card) {
    console.log(`OMG YEAH for ${card.text}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Hell No! for ${card.text}`);
    return true;
  }
  function handleMaybe(card) {
    console.log(`PUTINE for ${card.text}`);
    return true;
  }

  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={require("../assets/images/background-1.png")}
      resizeMode="cover"
    >
      {/* PAGE TITLE */}

      <View style={styles.container}>
        <View style={{ paddingHorizontal: 20, marginTop: 50, marginLeft: 50 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("Home", {
                screen: "HomeScreen",
              });
              
            }}
          >
            <View style={styles.container3}>
              <AntDesign name="close" size={35} color="black" />
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.pageTitle}>Demandes à proximité</Text>
        </View>

        <View
          style={{
            flex: 1,
            padding: 15,
            marginTop: 20,
            marginLeft: 50,
            marginRight: 50,
          }}
        >
          <View style={styles.container}>
            {cards ? (
              <SwipeCards
                cards={cards}
                renderCard={(cardData) => <Card data={cardData} />}
                keyExtractor={(cardData) => String(cardData.text)}
                renderNoMoreCards={() => <StatusCard text="Bon vent ! " />}
                actions={{
                  nope: { onAction: handleNope },
                  OMG: { onAction: handleYup },
                  maybe: { onAction: handleMaybe },
                }}
                hasMaybeAction={true}
                stack={true}
                stackDepth={3}
              />
            ) : (
              <StatusCard text="Nous recherchons les services correspondant à vos critères..." />
            )}
          </View>
          {/* CARD
          <View style={styles.card}>
            <View>
              <View
                style={{
                  flexDirection: "column",
                  // alignSelf: "left",
                }}
              >
                <Text style={styles.bodyText}>{" "}</Text>
                <Text style={styles.bodyText}>{" "}</Text>
                <Image
                  source={require("../assets/images/categories/bricolage.png")}
                  style={{ width: 150, height: 150, marginLeft: 60, marginBottom: 70}}
                ></Image>
                
                <Text style={styles.cardTitle}>Montage de meubles</Text>
              </View>
                
              
              <View
                style={{
                  flexDirection: "row",
                  // alignSelf: "left",
                  marginTop: 8,
                }}
              >
                <Feather
                name="user"
                size={16}
                color="#F7CE46"
                style={{ marginRight: 10 }}
                
              />
                <Text style={styles.bodyText}>Julie</Text>
              </View>


              <View
                style={{
                  flexDirection: "row",
                  // alignSelf: "left",
                  marginTop: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={16}
                  color="#F7CE46"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.bodyText}>5Km (Paris 11eme)</Text>
              </View>


              <View
                style={{
                  flexDirection: "row",
                  // alignSelf: "left",
                  marginTop: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={16}
                  color="#F7CE46"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.bodyText}>Lundi, jeudi et vendredi soir.</Text>
                
              </View>

              <View
                style={{
                  flexDirection: "column",
                  // alignSelf: "left",
                  marginBottom: 100,
                }}
              >
                
               
                
                
              </View> */}

          {/* </View> */}

          {/* </View> */}

          <View style={styles.container2}>
            <Entypo name="circle-with-cross" size={80} color="black" />
            <TouchableWithoutFeedback onPress={(card) => handleYup(card)}>
              <AntDesign name="checkcircle" size={75} color="#F7CE46" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  container2: {
    flex: 1,

    // borderRadius: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  container3: {
    marginLeft: 250,
  },
  button: {
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
  card2: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    // elevation: 10,
    borderRadius: 15,
    marginBottom: 30,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 270,
    height: 370,
    borderRadius: 15,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  cardsText: {
    fontSize: 22,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },
  bodyText: {
    color: "#717171",
    fontSize: 14,
    fontWeight: "400",
  },
});
