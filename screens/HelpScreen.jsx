import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView, StyleSheet, Text, View
} from "react-native";
import { connect } from "react-redux";
import Request from "../components/HelpScreen/Request";




function HelpScreen({ onMatchCategories, categoryMatches, navigation }) {
  const [message, setMessage] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      async function getRequests() {
        let request = await fetch(
          "https://swapapp-backend.herokuapp.com/match-categories/CyfMgR7UvrILzTVS5keCCY2gPaqy9njx"
        );
        let response = await request.json();
        if (response.status) {
          onMatchCategories(response.matchingRequests);
        } else {
          setMessage(response.message);
        }
      }
      getRequests();
    }
  }, [isFocused]);

  let requestList = categoryMatches.map((request, i) => {
    return (
      <Request
        key={i}
        isAsker={false}
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
      />
    );
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
  return { categoryMatches: state.categoriesReducer };
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
  },
});
