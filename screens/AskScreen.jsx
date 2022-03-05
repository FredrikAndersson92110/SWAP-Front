import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

import { useIsFocused } from "@react-navigation/native";

import Request from "../components/AskScreen/Request";
import { connect } from "react-redux";

function AskScreen({
  onAddRequestWillingUsers,
  navigation,
  willingUserRequests,
}) {
  const isFocused = useIsFocused();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isFocused) {
      async function getRequests() {
        let request = await fetch(
          "https://swapapp-backend.herokuapp.com/get-willing-users/CyfMgR7UvrILzTVS5keCCY2gPaqy9njx"
        );
        let response = await request.json();
        if (response.status) {
          onAddRequestWillingUsers(response.requests);
        } else {
          setMessage(response.message);
        }
      }
      getRequests();
    }
  }, [isFocused]);

  let requests = [];
  willingUserRequests.forEach((req) => {
    let tempUsers = req.willing_users.map((user) => {
      return {
        ...user,
        category: req.category,
        requestId: req._id,
        request: req,
      };
    });
    requests = requests.concat(tempUsers);
  });
  let requestList = requests.map((req, i) => {
    return (
      <Request
        key={i}
        isAsker={true}
        requestId={req.requestId}
        currentRequest={req.request}
        request={req}
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
  });

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
              navigation.navigate("ComposeRequestScreen", {
                screen: "ComposeRequestScreen",
              });
            }}
          >
            <Text style={styles.newRequest}>Créer une nouvelle demande</Text>
          </TouchableWithoutFeedback>

          <Input
            onPressIn={() => {
              navigation.navigate("ComposeRequestScreen", {
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
              navigation.navigate("ComposeRequestScreen");
            }}
          />
        </View>
        <ScrollView
          style={{
            flex: 1,
            marginTop: 0,
          }}
          contentContainerStyle={{ width: "100%" }}
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
      <View style={{ marginBottom: 70 }}></View>
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
  return { willingUserRequests: state.willingReducer };
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
