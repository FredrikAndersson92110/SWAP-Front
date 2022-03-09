import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import Request from "../components/HelpScreen/Request";

import getDistance from "../components/helpers";

function HelpScreen({
  onMatchCategories,
  categoryMatches,
  userLocation,
  user,
}) {
  const [message, setMessage] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      async function getRequests() {
        let request = await fetch(
          `http://192.168.10.154:3000/match-categories/${user.token}`
        );
        // CyfMgR7UvrILzTVS5keCCY2gPaqy9njx
        let response = await request.json();
        if (response.status) {
          try {
            let promise = await Promise.all(
              response.matchingRequests.map(async (req) => {
                let coords = await fetch(
                  `https://koumoul.com/s/geocoder/api/v1/coord?city=${req.asker.userAddresses[0].address_city}`
                );
                let resp = await coords.json();

                let distance = Math.round(
                  getDistance(
                    userLocation.coords.latitude,
                    userLocation.coords.longitude,
                    resp.lat,
                    resp.lon
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
          console.log(response.message);
          setMessage(response.message);
        }
      }
      getRequests();
    }
  }, [isFocused]);

  let requestList = categoryMatches.map((request, i) => {
    let path = `https://theoduvivier.com/swap/${
      request.category.category.sub_category
        ? request.category.category.sub_category
            .replace(/\s/g, "_")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : request.category.category
            .replace(/\s/g, "_")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
    }.png`;
    console.log("PATH", path);
    //res.cloudinary.com/dz6vuz9mf/image/upload/v1646663953/montage_de_meubles.png
    //res.cloudinary.com/dz6vuz9mf/image/upload/v1646663954/montage_de_meubles.png
    if (request.distance < 200) {
      return (
        <Request
          key={i}
          isAsker={false}
          distance={request.distance}
          useravatar={request.asker.user_img}
          currentRequest={request}
          requestId={request._id}
          askerName={request.asker.firstName}
          location={
            request.asker.userAddresses[0]
              ? request.asker.userAddresses[0].address_city
              : ""
          }
          category={
            request.category.category.sub_category
              ? request.category.category.sub_category
              : request.category.category
          }
          categoryImage={{ uri: path }}
        />
      );
    } else {
      return null;
    }
  });

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
          {message !== "" ? (
            <Text style={styles.bodyText}>{message}</Text>
          ) : null}
          {requestList}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen);

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
    marginHorizontal: 15,
  },
});
