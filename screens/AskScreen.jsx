import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { connect } from "react-redux";
import Request from "../components/AskScreen/Request";
import InputButton from "../components/InputButton";

import getDistance from "../components/helpers";

function AskScreen({
  onAddRequestWillingUsers,
  willingUserRequests,
  userLocation,
  user,
}) {
  const isFocused = useIsFocused();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isFocused) {
      async function getRequests() {
        let request = await fetch(
          `https://swapapp-backend.herokuapp.com/get-willing-users/${user.token}`
        );
        let response = await request.json();
        if (response.status) {
          try {
            let promise = await Promise.all(
              response.requests.slice(0, 1).map(async (req) => {
                let tempUsers = await Promise.all(
                  req.willing_users.map(async (user) => {
                    let coords = await fetch(
                      `https://koumoul.com/s/geocoder/api/v1/coord?city=${user.userAddresses[0].address_city}`
                    );
                    let resp = await coords.json();
                    console.log("COORDS", resp);
                    let distance = Math.round(
                      getDistance(
                        userLocation.coords.latitude,
                        userLocation.coords.longitude,
                        resp.lat,
                        resp.lon
                      )
                    );
                    return {
                      ...user,
                      category: req.category,
                      requestId: req._id,
                      request: req,
                      distance,
                    };
                  })
                );
                return tempUsers;
              })
            );
            onAddRequestWillingUsers(promise.flat(1));
          } catch (error) {
            console.error(error);
          }
        } else {
          setMessage(response.message);
        }
      }
      getRequests();
    }
  }, [isFocused]);

  let requestList = willingUserRequests.map((req, i) => {
    if (req.distance < 200) {
      return (
        <Request
          key={i}
          isAsker={true}
          requestId={req.requestId}
          currentRequest={req.request}
          request={req}
          distance={req.distance}
          location={req.userAddresses[0].address_city}
          willingUserToken={req.token}
          name={req.firstName}
          useravatar={req.user_img}
          category={
            req.category.sub_category
              ? req.category.sub_category
              : req.category.category
          }
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
      <View style={styles.container}>
        <View styles={{ marginTop: 50, width: "10%" }}>
          <Text style={styles.newRequest}>Créer une nouvelle demande</Text>

          <InputButton
            style={{
              width: 350,
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
              marginBottom: 20,
              marginTop: 7,
            }}
            placeHolder={"Trouver un service"}
          />
        </View>
        <ScrollView
          style={{
            flex: 1,
            marginTop: 0,
            width: "100%",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* PAGE TITLE */}
          <View>
            <Text style={styles.pageTitle}>Mes demandes</Text>
          </View>
          {message !== "" ? <Text>{message}</Text> : null}
          {/* Request */}
          {requestList}
          {/* end */}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onAddRequestWillingUsers(data) {
      dispatch({ type: "user::willingusers", requests: data });
    },
  };
}

function mapStatetoProps(state) {
  return {
    willingUserRequests: state.willingReducer,
    userLocation: state.locationReducer,
    user: state.userReducer,
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(AskScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
    width: "100%",
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
    elevation: 6,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginLeft: 20,
    marginBottom: 20,
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
    borderRadius: 50,
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
    marginLeft: 15,
    fontFamily: "Poppins_600SemiBold",
  },
});
