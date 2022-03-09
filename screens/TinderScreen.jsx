import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SwipeCards from "react-native-swipe-cards-deck";
import { connect } from "react-redux";
import getDistance from "../components/helpers";

function Card({ data }) {
  console.log("data", data);
  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
      <Image
        source={{ uri: data.image }}
        style={{
          width: 140,
          height: 140,
          marginBottom: 20,
        }}
      ></Image>
      <Text
        style={{
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18,
          alignItems: "flex-start",
        }}
      >
        {data.title}
      </Text>
      <View style={{ width: "100%", marginLeft: 70, marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Feather name="user" size={18} color="#F7CE46" />
          <Text style={styles.cardsText}>{data.firstName}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <FontAwesome5 name="map-marker-alt" size={18} color="#F7CE46" />
          <Text style={styles.cardsText}>{data.distance}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <AntDesign name="calendar" size={18} color="#F7CE46" />
          <Text style={styles.cardsText}>{data.disponibility}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Text
            style={[styles.cardsText, { fontFamily: "Poppins_400Regular" }]}
          >
            {data.description}
          </Text>
        </View>
      </View>
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

function TinderScreen({
  userLocation,
  onMatchCategories,
  categoryMatches,
  user,
  navigation,
}) {
  const [cards, setCards] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      async function getRequests() {
        let request = await fetch(
          `https://swapapp-backend.herokuapp.com/match-categories/${user.token}`
        );
        // CyfMgR7UvrILzTVS5keCCY2gPaqy9njx
        let response = await request.json();
        // console.log(response)
        if (response.status) {
          try {
            let promise = await Promise.all(
              response.matchingRequests.map(async (req) => {
                let coords = await fetch(
                  // `https://koumoul.com/s/geocoder/api/v1/coord?city=${req.asker.userAddresses[0].address_city}`
                  `http://api.openweathermap.org/geo/1.0/direct?q=${req.asker.userAddresses[0].address_city},fr&appid=f2b23e6c8f32f28cdd181b47f5b3ba63`
                );

                let resp = await coords.json();
                console.log("LAT : ", resp[0]);
                let distance = Math.round(
                  getDistance(
                    userLocation.coords.latitude,
                    userLocation.coords.longitude,
                    resp[0].lat,
                    resp[0].lon
                  )
                );
                return {
                  ...req,
                  distance,
                };
              })
            );
            onMatchCategories(promise);
          } catch (error) {
            console.error(error);
          }
        } else {
          setMessage(response.message);
        }
      }
      getRequests();
    }
  }, []);

  // PART 2 DU USEEFFECT : DATA POUR LES CARDS
  console.log(" ------ MATCH ------", categoryMatches);
  let cardsArray = categoryMatches.map((request, i) => {
    console.log("request.category.sub_category", request.category.sub_category);
    return {
      key: i,
      title: request.category.sub_category
        ? request.category.sub_category
        : request.category,
      backgroundColor: "#FFF",
      image: `http://theoduvivier.com/swap/${
        request.category.sub_category
          ? request.category.sub_category
              .replace(/\s/g, "_")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          : request.category
              .replace(/\s/g, "_")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
      }.png`,
      firstName: request.asker.firstName,
      distance: `${request.asker.userAddresses[0].address_city} (${request.distance} km)`,
      disponibility: request.asker.disponibilty
        ? request.asker.disponibilty
        : "Non précisé",
      // description: request.asker.description,
    };
  });
  setTimeout(() => {
    console.log("hey");
    // setCards(cardsArray);
  }, 2000);

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
      {/* PAGE TOP */}

      <View style={styles.container}>
        {/* MAIN (CARTES) */}
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
            {cardsArray ? (
              <SwipeCards
                cards={cardsArray}
                renderCard={(cardData) => <Card data={cardData} />}
                keyExtractor={(cardData) => String(cardData.text)}
                renderNoMoreCards={() => (
                  <StatusCard
                    text="Vous avez épuisé tout nos Helpers ! "
                    style={{ fontFamily: "Poppins_600SemiBold" }}
                  />
                )}
                stackOffsetX={15}
                actions={{
                  nope: { onAction: handleNope, text: "Refuser", show: false },
                  yup: { onAction: handleYup, text: "Accepter", show: false },
                  maybe: {
                    onAction: handleMaybe,
                    text: "Peut-être plus tard",
                    show: false,
                  },
                }}
                hasMaybeAction={false}
                stack={true}
                showYup={false}
                smoothTransition={true}
                dragY={false}
              />
            ) : (
              <StatusCard text="Nous recherchons des missions..." />
            )}
          </View>

          {/* DEBUT TITRE PAGE + CROIX NAVIGATION */}
          <View
            style={{
              position: "absolute",
              paddingHorizontal: 20,
              marginTop: 0,
              flexDirection: "row",
              width: "140%",
              left: -20,
            }}
          >
            <Text style={styles.pageTitle}>Demandes à proximité</Text>
            <TouchableWithoutFeedback
              style={{ zIndex: 10, position: "absolute" }}
              onPress={() => {
                console.log("close");
                navigation.navigate("Home");
              }}
            >
              <View style={styles.container3}>
                <AntDesign name="close" size={35} color="black" />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* FIN TITRE PAGE + CROIX NAVIGATION */}

          {/* FOOTER PAGE */}
          <View style={styles.container2}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={require("../assets/images/swipeLeft.png")}
                style={{ width: 80, height: 80 }}
                resizeMode={"contain"}
              />
              <Text style={styles.handText}>Refuser</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={require("../assets/images/swipeRight.png")}
                style={{ width: 80, height: 80 }}
                resizeMode={"contain"}
              />
              <Text style={styles.handText}>Accepter</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onMatchCategories: function (data) {
      dispatch({ type: "user::categoryMatches", matches: data });
    },
  };
}

function mapStateToProps(state) {
  return {
    categoryMatches: state.categoriesReducer,
    userLocation: state.locationReducer,
    user: state.userReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TinderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  container2: {
    // borderRadius: 70,
    width: "110%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 150,
    marginBottom: 80,
    right: 10,
  },
  container3: {
    position: "absolute",
    top: 0,
    right: 20,
    zIndex: 20,
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
    width: 300,
    height: 400,
    borderRadius: 15,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    marginTop: 100,
    zIndex: 0,
  },
  cardsText: {
    fontSize: 22,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginRight: 70,
    width: "130%",
    left: -15
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
  cardsText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    height: 22,
    paddingTop: 4,
    marginLeft: 7,
    // width: "75%",
    // height: 30,
    flexWrap: "wrap"
  },
  handText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    marginTop: 10,
  },
});
