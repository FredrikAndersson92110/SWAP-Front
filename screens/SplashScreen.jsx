import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { connect } from "react-redux";


const SplashScreen = (props) => {
  AsyncStorage.clear();
  let token;

  useEffect(async () => {
    // SI un token est présent en local storage ==> rredirection vers la page HOME + recupération des données USER que l'on stock dans le store
    AsyncStorage.getItem("token", async function (error, data) {
      console.log("token sent to back ==>", data);
      if (data) {
        let response = await fetch(
          `https://swapapp-backend.herokuapp.com/users/get-user/${data}`
        );
        response = await response.json();

        props.saveUser(response.user);
        console.log("user Store", props.userStore);
        return props.navigation.navigate("MyTabs");
      } else if (data == null) {
        return props.navigation.navigate("DemoScreen");
      }
    });
  }, []);

  return (
    <View style={styles.overlay}>
      <Image
        style={styles.image}
        resizeMode={"contain"}
        source={require("../assets/splash.png")}
      ></Image>
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
    width: "100%",
  },
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
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
