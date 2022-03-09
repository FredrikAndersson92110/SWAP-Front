import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Onboarding from "../components/DemoScreen/Onboarding";

import { connect } from "react-redux";

const DemoScreen = (props) => {

  const [visible, setVisible] = useState(true);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const navigation = useNavigation();

  let loadPage = false;

  useEffect(async () => {
    // SI un token est présent en local storage ==> rredirection vers la page HOME + recupération des données USER que l'on stock dans le store
    AsyncStorage.getItem("token", async function (error, data) {
      console.log("token sent to back ==>", data);
      if (data) {
        let response = await fetch(
          `https://swapapp-backend.herokuapp.com/users/get-user/${data}`
        );
        response = await response.json();

        // console.log("recuparation user grace TOKEN : ", response.user);
        props.saveUser(response.user);
        // console.log("user Store", props.userStore);
        return props.navigation.navigate("MyTabs");
      } else {
        loadPage = true;
      }
    });
  }, []);


    return (
      <View style={styles.container}>
        <Text
          style={styles.skip}
          onPress={() => {
            props.navigation.navigate("SignUpScreen");
          }}
        >
          Passer
        </Text>
        <Onboarding />
        <StatusBar style="auto" />
      </View>
    );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  skip: {
    position: "absolute",
    top: 30,
    right: 30,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "lightgrey",
    paddingVertical: 20,
    zIndex: 10,
  },
  overlay: {
    backgroundColor: "#F7CE46",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  overlayText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 50,
  },
  image: {
    width: "100%"
  }
});

function mapStateToProps(state) {
  return { userStore: state.userReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    saveUser: function (user) {
      dispatch({ type: "saveUser", user });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DemoScreen);
